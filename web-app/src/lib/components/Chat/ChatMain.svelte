<script lang="ts">
  import { onMount } from "svelte";
  import { writable, derived } from "svelte/store";
  import type { Document } from "@langchain/core/documents";
  import Chat from "./Chat.svelte";
  import { toast } from "svelte-sonner";
  // import Home from "$lib/components/Home/Home.svelte";

  export let id: string | undefined = undefined;
  export let initialMessage: string | null = null;

  type Message = {
    messageId: string;
    chatId: string;
    createdAt: Date;
    content: string;
    role: "user" | "assistant";
    suggestions?: string[];
    sources?: Document[];
  };

  let chatId = writable<string | undefined>(id);
  let newChatCreated = writable(false);
  let hasError = writable(false);
  let isReady = writable(false);
  let loading = writable(false);
  let messageAppeared = writable(false);
  let chatHistory = writable<[string, string][]>([]);
  let messages = writable<Message[]>([]);
  let focusMode = writable("webSearch");
  let isMessagesLoaded = writable(false);
  let notFound = writable(false);

  const getSuggestions = async (chatHistory) => {
    const chatModel = localStorage.getItem("chatModel");
    const chatModelProvider = localStorage.getItem("chatModelProvider");

    const res = await fetch(`/suggestions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_history: chatHistory,
        chat_model: chatModel,
        chat_model_provider: chatModelProvider,
      }),
    });

    const data = (await res.json()) as { suggestions: string[] };

    return data.suggestions;
  };

  const isReadyDerived = derived(
    [isMessagesLoaded],
    ([$isMessagesLoaded]) => $isMessagesLoaded
  );

  $: {
    if ($isReadyDerived) {
      isReady.set(true);
    }
  }

  async function loadMessages() {
    try {
      const res = await fetch(
        `/chats/${$chatId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 404) {
        notFound.set(true);
        isMessagesLoaded.set(true);
        return;
      }

      const data = await res.json();

      const loadedMessages = data.messages.map((msg: any) => ({
        ...msg,
        ...JSON.parse(msg.metadata),
      })) as Message[];

      messages.set(loadedMessages);

      const history = loadedMessages.map((msg) => [msg.role, msg.content]) as [
        string,
        string
      ][];

      console.log("[DEBUG] messages loaded");

      document.title = loadedMessages[0].content;

      chatHistory.set(history);
      focusMode.set(data.chat.focusMode);
      isMessagesLoaded.set(true);
    } catch (error) {
      console.error("Error loading messages:", error);
      hasError.set(true);
      toast.error("Failed to load messages. Please try again later.");
    }
  }

  async function sendMessage(message: string) {
    if ($loading) return;
    loading.set(true);
    messageAppeared.set(false);

    const messageId = crypto.randomUUID();

    messages.update(($messages) => [
      ...$messages,
      {
        content: message,
        messageId,
        chatId: $chatId!,
        role: "user",
        createdAt: new Date(),
      },
    ]);

    try {
      const response = await fetch(`/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chatId: $chatId,
          message: message,
          focusMode: $focusMode,
          history: [...$chatHistory, ["human", message]],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      const data = await response.json();

      messages.update(($messages) => [
        ...$messages,
        {
          content: data.message,
          messageId: data.messageId,
          chatId: $chatId!,
          role: "assistant",
          sources: data.sources,
          createdAt: new Date(),
        },
      ]);

      chatHistory.update(($history) => [
        ...$history,
        ["human", message],
        ["assistant", data.message],
      ]);

      messageAppeared.set(true);

      if (data.sources && data.sources.length > 0) {
        const suggestions = await getSuggestions($chatHistory);
        messages.update(($messages) => {
          const lastMessage = $messages[$messages.length - 1];
          return $messages.map((msg) =>
            msg.messageId === lastMessage.messageId
              ? { ...msg, suggestions }
              : msg
          );
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      loading.set(false);
    }
  }

  function rewrite(messageId: string) {
    const index = $messages.findIndex((msg) => msg.messageId === messageId);

    if (index === -1) return;

    const message = $messages[index - 1];

    messages.update(($messages) => [
      ...$messages.slice(0, $messages.length > 2 ? index - 1 : 0),
    ]);
    chatHistory.update(($history) => [
      ...$history.slice(0, $messages.length > 2 ? index - 1 : 0),
    ]);

    sendMessage(message.content);
  }

  onMount(() => {
    if (
      $chatId &&
      !$newChatCreated &&
      !$isMessagesLoaded &&
      $messages.length === 0
    ) {
      loadMessages();
    } else if (!$chatId) {
      newChatCreated.set(true);
      isMessagesLoaded.set(true);
      chatId.set(crypto.randomUUID());
    }

    if ($isReady && initialMessage) {
      sendMessage(initialMessage);
    }
  });
</script>

<svelte:head>
  <title>Debate AI - Collaborative Research Agent</title>
</svelte:head>

{#if $hasError}
  <div class="flex flex-col items-center justify-center min-h-screen">
    <p class="dark:text-white/70 text-black/70 text-sm">
      Failed to connect to the server. Please try again later.
    </p>
  </div>
{:else}
  {#if $notFound}
    <div class="flex flex-col items-center justify-center min-h-screen">
      <p class="dark:text-white/70 text-black/70 text-sm">
        Chat not found. Please try a different chat or start a new one.
      </p>
    </div>
  {:else}
    <div>
      {#if $messages.length > 0}
        <Chat
          loading={$loading}
          messages={$messages}
          sendMessage={sendMessage}
          messageAppeared={$messageAppeared}
          rewrite={rewrite}
        />
      {:else}
        <!-- <Home 
          sendMessage={sendMessage}
          focusMode={$focusMode}
          setFocusMode={(mode) => focusMode.set(mode)}
        /> -->
      {/if}
    </div>
  {/if}
{/if}

<style>
  /* Add any component-specific styles here */
</style>
<script lang="ts">
    import { Trash } from 'lucide-svelte';
    import { fade, scale } from 'svelte/transition';
    // import { toast } from 'svelte-sonner';
  
    export let chatId: string;
    export let chats;
    export let setChats: (chats) => void;
  
    let confirmationDialogOpen = false;
    let loading = false;
  
    async function handleDelete() {
      loading = true;
      try {
        const res = await fetch(
          `${import.meta.env.VITE_PUBLIC_API_URL}/chats/${chatId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (res.status != 200) {
          throw new Error('Failed to delete chat');
        }
  
        const newChats = chats.filter((chat) => chat.id !== chatId);
        setChats(newChats);
      } catch (err: any) {
        // toast.error(err.message);
      } finally {
        confirmationDialogOpen = false;
        loading = false;
      }
    }
  </script>
  
  <button
    on:click={() => {
      confirmationDialogOpen = true;
    }}
    class="bg-transparent text-red-400 hover:scale-105 transition duration-200"
  >
    <Trash size={17} />
  </button>
  
  {#if confirmationDialogOpen}
    <div class="relative z-50" transition:fade>
      <div class="fixed inset-0 bg-black/30" on:click={() => { if (!loading) confirmationDialogOpen = false; }}></div>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <div
            class="w-full max-w-md transform rounded-2xl bg-light-secondary dark:bg-dark-secondary border border-light-200 dark:border-dark-200 p-6 text-left align-middle shadow-xl"
            transition:scale={{ duration: 200 }}
          >
            <h3 class="text-lg font-medium leading-6 dark:text-white">
              Delete Confirmation
            </h3>
            <p class="text-sm dark:text-white/70 text-black/70">
              Are you sure you want to delete this chat?
            </p>
            <div class="flex flex-row items-end justify-end space-x-4 mt-6">
              <button
                on:click={() => {
                  if (!loading) {
                    confirmationDialogOpen = false;
                  }
                }}
                class="text-black/50 dark:text-white/50 text-sm hover:text-black/70 hover:dark:text-white/70 transition duration-200"
              >
                Cancel
              </button>
              <button
                on:click={handleDelete}
                class="text-red-400 text-sm hover:text-red-500 transition duration200"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
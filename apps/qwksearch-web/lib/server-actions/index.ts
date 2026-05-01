import grab from "grab-url";
import { Message } from "../../components/ResearchAgent/ChatConversation/ChatWindow";

export const getSuggestions = async (chatHistory: Message[]) => {
  const chatModel = localStorage.getItem("chatModelKey");
  const chatModelProvider = localStorage.getItem("chatModelProviderId");

  try {
    const data = await grab<{ suggestions: string[] }>(
      `/api/agent/suggestions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          chatHistory: chatHistory,
          chatModel: {
            providerId: chatModelProvider,
            key: chatModel,
          },
        },
      },
    );

    return Array.isArray(data.suggestions) ? data.suggestions : [];
  } catch (e) {
    return [];
  }
};


import { useState } from "react";
import { ChatGeminiAI, ChatMessage } from "@/utils/geminiApi";
import { useToast } from "@/components/ui/use-toast";

// Initialize the Gemini AI client
const geminiAI = new ChatGeminiAI({
  temperature: 0.7,
  maxOutputTokens: 800
});

export function useChatWithElli() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm Elli, your conservation assistant. How can I help you learn about elephants today?"
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const { toast } = useToast();

  // Send message to Gemini API
  const sendMessage = async (input: string) => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);
    setIsLoadingResponse(true);

    try {
      // Call Gemini API using the new class approach
      const response = await geminiAI.invoke([
        ...messages.slice(1), // Skip the initial greeting
        userMessage
      ]);
      
      // Add assistant response
      setMessages(prev => [...prev, { role: "assistant", content: response }]);
      
      // Auto-play the response
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 6000);
    } catch (error) {
      console.error("Error getting response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
      setIsLoadingResponse(false);
    }
  };

  // Toggle audio playback
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return {
    messages,
    isTyping,
    isPlaying,
    isLoadingResponse,
    sendMessage,
    togglePlayback
  };
}

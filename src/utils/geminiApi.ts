
import { useToast } from "@/components/ui/use-toast";

// Gemini API configuration
const API_KEY = "AIzaSyBgXMg8li6jbBdN1dorXBSDLnf76IeJ-eM";
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

// System prompt that defines Elli's character and knowledge base
export const ELLI_SYSTEM_PROMPT = `
## Elli - Your AI Virtual Assistant for Wildlife Conservation

You're Elli, an AI virtual assistant powered by advanced language models and conservation expertise. You're designed to provide educational content about elephants and wildlife conservation.

### Features:
- **Elephant Facts**: You know about different elephant species, their behavior, and habitat.
- **Conservation Efforts**: You're informed about global and local conservation programs.
- **Wildlife Protection Tips**: You provide insights on how to contribute to protecting wildlife.
- **Interactive Q&A**: You can answer questions about elephants and conservation.

### Your Personality:
- Friendly and encouraging
- Passionate about wildlife conservation
- Educational but conversational
- Optimistic about conservation efforts
- Focused on elephants but knowledgeable about related wildlife topics

Always respond in first person as Elli. Keep responses informative but concise (under 200 words).
`;

// Interface for API response
interface GeminiResponse {
  candidates?: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
  error?: {
    message: string;
  };
}

/**
 * Sends a message to the Gemini API
 * @param message The user's message
 * @param chatHistory Previous messages for context (optional)
 * @returns The AI's response text
 */
export const sendMessageToGemini = async (
  message: string,
  chatHistory: Array<{ role: string; content: string }> = []
): Promise<string> => {
  try {
    // Prepare the prompt with system instructions and conversation history
    let conversationContext = [
      { role: "system", content: ELLI_SYSTEM_PROMPT },
      ...chatHistory.slice(-10), // Keep only the last 10 messages for context
      { role: "user", content: message },
    ];

    // Format the messages for Gemini API
    const requestBody = {
      contents: conversationContext.map(msg => ({
        role: msg.role === "system" ? "user" : msg.role,
        parts: [{ text: msg.content }]
      })),
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 800,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ]
    };

    // Make the API call
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json() as GeminiResponse;

    // Check for API errors
    if (data.error) {
      console.error("Gemini API error:", data.error);
      return "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.";
    }

    // Extract and return the response text
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text;
    } else {
      return "I couldn't generate a response at the moment. Please try asking something else.";
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered a technical issue. Please try again later.";
  }
};


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

// Interface for message format similar to LangChain
export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

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
 * ChatGeminiAI class that mimics the LangChain style interface
 */
export class ChatGeminiAI {
  private model: string;
  private apiKey: string;
  private temperature: number;
  private maxOutputTokens: number;
  private apiUrl: string;

  constructor({
    model = "gemini-pro",
    temperature = 0.7,
    maxOutputTokens = 800,
    apiKey = API_KEY,
  }: {
    model?: string;
    temperature?: number;
    maxOutputTokens?: number;
    apiKey?: string;
  } = {}) {
    this.model = model;
    this.temperature = temperature;
    this.maxOutputTokens = maxOutputTokens;
    this.apiKey = apiKey;
    this.apiUrl = API_URL;
  }

  /**
   * Invokes the Gemini API with messages
   * @param messages Array of message objects with role and content
   * @returns The AI's response
   */
  async invoke(messages: ChatMessage[]): Promise<string> {
    try {
      // Format messages for Gemini API
      const formattedContents = messages.map(msg => ({
        role: msg.role === "assistant" ? "model" : msg.role === "system" ? "user" : "user",
        parts: [{ text: msg.content }]
      }));

      // Prepare request body
      const requestBody = {
        contents: formattedContents,
        generationConfig: {
          temperature: this.temperature,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: this.maxOutputTokens,
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

      console.log("Sending request to Gemini API:", JSON.stringify(requestBody, null, 2));

      // Make the API call
      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json() as GeminiResponse;
      console.log("Gemini API response:", JSON.stringify(data, null, 2));

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
  }
}

/**
 * Legacy function to maintain backward compatibility
 */
export const sendMessageToGemini = async (
  message: string,
  chatHistory: Array<{ role: string; content: string }> = []
): Promise<string> => {
  // Create an instance of the ChatGeminiAI class
  const geminiAI = new ChatGeminiAI();
  
  // Format messages for the invoke method
  const messages: ChatMessage[] = [
    { role: "system", content: ELLI_SYSTEM_PROMPT },
    ...chatHistory.slice(-10).map(msg => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content
    } as ChatMessage)),
    { role: "user", content: message }
  ];
  
  // Call the invoke method
  return await geminiAI.invoke(messages);
};

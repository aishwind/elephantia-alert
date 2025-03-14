
import React, { useRef, useEffect } from "react";
import { ChatMessage } from "@/utils/geminiApi";
import { AlertTriangle } from "lucide-react";

interface ChatUIProps {
  messages: ChatMessage[];
  isTyping: boolean;
  isLoadingResponse: boolean;
}

const ChatUI: React.FC<ChatUIProps> = ({ messages, isTyping, isLoadingResponse }) => {
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect to scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 h-[calc(100%-70px)]">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`mb-4 ${
            message.role === "user" ? "flex justify-end" : "flex justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 break-words ${
              message.role === "user"
                ? "bg-elephant-600 text-white"
                : "bg-elephant-100 dark:bg-elephant-800 text-elephant-900 dark:text-white"
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
        </div>
      ))}
      
      {isTyping && (
        <div className="flex justify-start mb-4">
          <div className="bg-elephant-100 dark:bg-elephant-800 rounded-lg px-4 py-2 max-w-[80%]">
            <div className="flex space-x-2">
              <div className="w-2 h-2 rounded-full bg-elephant-400 animate-bounce"></div>
              <div className="w-2 h-2 rounded-full bg-elephant-400 animate-bounce delay-75"></div>
              <div className="w-2 h-2 rounded-full bg-elephant-400 animate-bounce delay-150"></div>
            </div>
          </div>
        </div>
      )}
      
      <div ref={messageEndRef} />
    </div>
  );
};

export default ChatUI;

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import ChatUI from "./ChatUI";
import ChatInput from "./ChatInput";
import { ChatMessage } from "@/utils/geminiApi";

interface ChatContainerProps {
  messages: ChatMessage[];
  isTyping: boolean;
  isLoadingResponse: boolean;
  onSendMessage: (message: string) => void;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isTyping,
  isLoadingResponse,
  onSendMessage
}) => {
  return (
    <Card className="h-[600px] flex flex-col overflow-hidden">
      <CardContent className="flex-1 flex flex-col p-0 h-full">
        <ChatUI 
          messages={messages} 
          isTyping={isTyping} 
          isLoadingResponse={isLoadingResponse} 
        />
        <ChatInput 
          onSendMessage={onSendMessage} 
          isLoadingResponse={isLoadingResponse} 
        />
      </CardContent>
    </Card>
  );
};

export default ChatContainer;

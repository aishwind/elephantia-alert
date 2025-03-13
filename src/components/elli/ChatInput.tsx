
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoadingResponse: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoadingResponse }) => {
  const [input, setInput] = useState("");
  const { toast } = useToast();

  // Handle voice input
  const handleVoiceInput = () => {
    toast({
      title: "Voice Recognition",
      description: "Voice input feature coming soon!",
      duration: 3000,
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    onSendMessage(input);
    setInput("");
  };

  return (
    <div className="p-4 border-t dark:border-elephant-800">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={handleVoiceInput}
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Elli something about elephants or conservation..."
          className="flex-1"
          disabled={isLoadingResponse}
        />
        <Button 
          type="submit" 
          size="icon"
          disabled={isLoadingResponse || !input.trim()}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default ChatInput;

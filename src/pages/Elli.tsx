import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Transition from "@/components/Transition";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Send, Pause, Play, Volume2, Bot } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { sendMessageToGemini } from "@/utils/geminiApi";

const Elli = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I'm Elli, your conservation assistant. How can I help you learn about elephants today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Effect to scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Send message to Gemini API
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    setIsLoadingResponse(true);

    try {
      // Convert messages to format needed for API
      const chatHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));

      // Call Gemini API
      const response = await sendMessageToGemini(input, chatHistory);
      
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  // Handle voice input
  const handleVoiceInput = () => {
    toast({
      title: "Voice Recognition",
      description: "Voice input feature coming soon!",
      duration: 3000,
    });
  };

  // Toggle audio playback
  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <Transition>
      <div className="min-h-screen">
        <Navigation />
        
        <main className="pt-24 pb-16">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 text-center"
            >
              <h1 className="text-3xl font-bold text-elephant-900 dark:text-white mb-2">
                Meet Elli the Conservationist
              </h1>
              <p className="text-elephant-600 dark:text-elephant-300 max-w-3xl mx-auto">
                Your AI virtual assistant dedicated to elephant conservation and education. 
                Ask Elli anything about elephants, conservation efforts, or wildlife protection.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-1 order-2 lg:order-1">
                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="mb-6 text-center">
                      <div className="w-24 h-24 bg-nature-100 dark:bg-nature-900 rounded-full mx-auto flex items-center justify-center mb-4">
                        <Bot className="h-12 w-12 text-nature-600 dark:text-nature-400" />
                      </div>
                      <h3 className="text-xl font-bold text-elephant-900 dark:text-white">Elli</h3>
                      <p className="text-sm text-elephant-600 dark:text-elephant-400">Conservation AI Assistant</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium text-elephant-900 dark:text-white">About Elli</h4>
                        <p className="text-sm text-elephant-600 dark:text-elephant-400">
                          Elli is an AI virtual assistant powered by advanced language models and conservation expertise. 
                          She's designed to provide educational content about elephants and wildlife conservation.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium text-elephant-900 dark:text-white">Capabilities</h4>
                        <ul className="text-sm text-elephant-600 dark:text-elephant-400 space-y-1">
                          <li>• Elephant facts and species information</li>
                          <li>• Conservation programs and efforts</li>
                          <li>• Wildlife protection tips</li>
                          <li>• Interactive Q&A on conservation</li>
                          <li>• Educational resources for all ages</li>
                        </ul>
                      </div>
                      
                      <div className="pt-4">
                        <h4 className="font-medium text-elephant-900 dark:text-white mb-2">Voice Settings</h4>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="flex-1"
                            onClick={togglePlayback}
                          >
                            {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                            {isPlaying ? "Pause Voice" : "Play Voice"}
                          </Button>
                          <Button variant="outline" size="icon" className="w-9 h-9">
                            <Volume2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2">
                <Card className="h-[600px] flex flex-col">
                  <CardContent className="flex-1 flex flex-col p-0">
                    <div className="flex-1 overflow-y-auto p-4">
                      {messages.map((message, index) => (
                        <div
                          key={index}
                          className={`mb-4 ${
                            message.role === "user" ? "flex justify-end" : "flex justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              message.role === "user"
                                ? "bg-elephant-600 text-white"
                                : "bg-elephant-100 dark:bg-elephant-800 text-elephant-900 dark:text-white"
                            }`}
                          >
                            <p>{message.content}</p>
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
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </Transition>
  );
};

export default Elli;

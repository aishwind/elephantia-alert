
import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Transition from "@/components/Transition";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Send, Pause, Play, Volume2, Bot } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
  const messageEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Send message
  const handleSendMessage = () => {
    if (!input.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Elephants are the largest land mammals on Earth. African elephants can weigh up to 6 tons and stand up to 13 feet tall at the shoulder!",
        "Did you know? Elephants communicate using low-frequency sounds that can travel up to 6 miles away. They can also use seismic communication, detecting vibrations through their feet.",
        "Elephants have amazing memories! They can remember migration routes, water sources, and other elephants for decades. This is why we say 'an elephant never forgets.'",
        "Conservation efforts are crucial for elephant populations. They face threats from habitat loss, poaching, and human-elephant conflict. Our early warning system helps reduce these conflicts along railway corridors.",
        "Elephants are keystone species, meaning they play a crucial role in maintaining the biodiversity of their ecosystems. They create clearings in forests, disperse seeds, and maintain grasslands."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
      setIsTyping(false);
      
      // Auto-play the response
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 6000);
    }, 1500);
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
                Ask Elli anything about elephants, conservation efforts, or our early warning system.
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
                          <li>• Answer questions about elephants</li>
                          <li>• Explain conservation strategies</li>
                          <li>• Provide information about our tracking system</li>
                          <li>• Offer educational resources</li>
                          <li>• Multi-language support (coming soon)</li>
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
                          placeholder="Ask Elli something about elephants..."
                          className="flex-1"
                        />
                        <Button type="submit" size="icon">
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

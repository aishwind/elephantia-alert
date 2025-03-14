import React from "react";
import { motion } from "framer-motion";
import Transition from "@/components/Transition";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ElliProfile from "@/components/elli/ElliProfile";
import ChatContainer from "@/components/elli/ChatContainer";
import { useChatWithElli } from "@/hooks/useChatWithElli";

const Elli = () => {
  const {
    messages,
    isTyping,
    isPlaying,
    isLoadingResponse,
    sendMessage,
    togglePlayback
  } = useChatWithElli();

  return (
    <Transition>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        
        <main className="flex-1 pt-24 pb-16">
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
                <ElliProfile 
                  isPlaying={isPlaying}
                  togglePlayback={togglePlayback}
                />
              </div>
              
              <div className="lg:col-span-2 order-1 lg:order-2">
                <ChatContainer 
                  messages={messages}
                  isTyping={isTyping}
                  isLoadingResponse={isLoadingResponse}
                  onSendMessage={sendMessage}
                />
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
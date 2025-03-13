
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Transition from "@/components/Transition";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AlertLivePanel from "@/components/alerts/AlertLivePanel";
import AlertMap from "@/components/alerts/AlertMap";
import ActionPanel from "@/components/alerts/ActionPanel";
import NotificationHub from "@/components/alerts/NotificationHub";
import IncidentHistory from "@/components/alerts/IncidentHistory";

const Alerts = () => {
  const [activeTab, setActiveTab] = useState("live");

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
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-elephant-900 dark:text-white mb-2">
                Elephant Alert System
              </h1>
              <p className="text-elephant-600 dark:text-elephant-300 max-w-3xl">
                Monitor elephant movements, receive real-time alerts, and coordinate responses to prevent human-elephant conflicts.
              </p>
            </motion.div>
            
            {/* Main content with tabbed interface for mobile */}
            <div className="block md:hidden mb-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-5 w-full">
                  <TabsTrigger value="live">Live</TabsTrigger>
                  <TabsTrigger value="map">Map</TabsTrigger>
                  <TabsTrigger value="actions">Actions</TabsTrigger>
                  <TabsTrigger value="comms">Comms</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="live" className="mt-4">
                  <AlertLivePanel className="h-[600px]" />
                </TabsContent>
                
                <TabsContent value="map" className="mt-4">
                  <AlertMap className="h-[600px]" />
                </TabsContent>
                
                <TabsContent value="actions" className="mt-4">
                  <ActionPanel className="h-[600px]" />
                </TabsContent>
                
                <TabsContent value="comms" className="mt-4">
                  <NotificationHub className="h-[600px]" />
                </TabsContent>
                
                <TabsContent value="history" className="mt-4">
                  <IncidentHistory className="h-[600px]" />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Desktop layout with all panels visible */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              <div className="col-span-1">
                <AlertLivePanel className="mb-6" />
                <ActionPanel />
              </div>
              
              <div className="col-span-2">
                <AlertMap className="mb-6" />
                <div className="grid grid-cols-2 gap-6">
                  <NotificationHub />
                  <IncidentHistory />
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </Transition>
  );
};

export default Alerts;

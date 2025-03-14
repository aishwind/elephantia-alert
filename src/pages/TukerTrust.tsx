
import React, { useState } from "react";
import { motion } from "framer-motion";
import Transition from "@/components/Transition";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AdminSidebar from "@/components/tukertrust/AdminSidebar";
import IncidentManagement from "@/components/tukertrust/IncidentManagement";
import ElephantTracking from "@/components/tukertrust/ElephantTracking";
import CommunityEngagement from "@/components/tukertrust/CommunityEngagement";
import DataAnalytics from "@/components/tukertrust/DataAnalytics";
import SystemIntegrations from "@/components/tukertrust/SystemIntegrations";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// User role types
type UserRole = "admin" | "ranger" | "farmer" | "community_leader" | "government" | "insurance";

const TukerTrust = () => {
  const [activeTab, setActiveTab] = useState<string>("incidents");
  const [userRole, setUserRole] = useState<UserRole>("admin");

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
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-elephant-900 dark:text-white mb-2">
                Tuker Trust Management Dashboard
              </h1>
              <p className="text-elephant-600 dark:text-elephant-300">
                Comprehensive tools for elephant conservation and human-wildlife conflict management
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-6">
              <AdminSidebar userRole={userRole} setUserRole={setUserRole} />
              
              <div className="flex-1">
                <Tabs 
                  defaultValue="incidents" 
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-full"
                >
                  <TabsList className="mb-6 w-full justify-start overflow-x-auto">
                    <TabsTrigger value="incidents">Incident Management</TabsTrigger>
                    <TabsTrigger value="tracking">Elephant Tracking</TabsTrigger>
                    <TabsTrigger value="community">Community Engagement</TabsTrigger>
                    <TabsTrigger value="analytics">Data Analytics</TabsTrigger>
                    <TabsTrigger value="system">System Integrations</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="incidents">
                    <IncidentManagement userRole={userRole} />
                  </TabsContent>
                  
                  <TabsContent value="tracking">
                    <ElephantTracking userRole={userRole} />
                  </TabsContent>
                  
                  <TabsContent value="community">
                    <CommunityEngagement userRole={userRole} />
                  </TabsContent>
                  
                  <TabsContent value="analytics">
                    <DataAnalytics userRole={userRole} />
                  </TabsContent>
                  
                  <TabsContent value="system">
                    <SystemIntegrations userRole={userRole} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </Transition>
  );
};

export default TukerTrust;

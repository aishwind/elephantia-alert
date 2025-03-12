
import React from "react";
import { motion } from "framer-motion";
import Transition from "@/components/Transition";
import Navigation from "@/components/Navigation";
import OpenStreetMap from "@/components/OpenStreetMap";
import AlertPanel from "@/components/AlertPanel";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for the charts
const movementData = [
  { day: "Mon", count: 12 },
  { day: "Tue", count: 19 },
  { day: "Wed", count: 15 },
  { day: "Thu", count: 22 },
  { day: "Fri", count: 30 },
  { day: "Sat", count: 25 },
  { day: "Sun", count: 18 },
];

const alertData = [
  { day: "Mon", alerts: 2 },
  { day: "Tue", alerts: 5 },
  { day: "Wed", alerts: 3 },
  { day: "Thu", alerts: 7 },
  { day: "Fri", alerts: 12 },
  { day: "Sat", alerts: 8 },
  { day: "Sun", alerts: 4 },
];

const Dashboard = () => {
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
                Elephant Monitoring Dashboard
              </h1>
              <p className="text-elephant-600 dark:text-elephant-300">
                Real-time tracking and alert management for elephant activity
              </p>
            </motion.div>
            
            <div className="mb-8">
              <Stats />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <OpenStreetMap />
              </div>
              <div>
                <AlertPanel className="h-full" />
              </div>
            </div>
            
            <Tabs defaultValue="activity" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
              
              <TabsContent value="activity" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Elephant Movement</CardTitle>
                      <CardDescription>Weekly elephant sightings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={movementData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="count" 
                            stroke="#10b981" 
                            strokeWidth={2} 
                            dot={{ strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Alert Frequency</CardTitle>
                      <CardDescription>Weekly alerts triggered</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={alertData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="alerts" 
                            stroke="#ef4444" 
                            strokeWidth={2}
                            dot={{ strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="analytics">
                <Card>
                  <CardHeader>
                    <CardTitle>Advanced Analytics</CardTitle>
                    <CardDescription>Detailed data analysis and insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center text-elephant-500 dark:text-elephant-400">
                      Advanced analytics content coming soon...
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reports">
                <Card>
                  <CardHeader>
                    <CardTitle>Reports</CardTitle>
                    <CardDescription>Generated reports and summaries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] flex items-center justify-center text-elephant-500 dark:text-elephant-400">
                      Reports module coming soon...
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
    </Transition>
  );
};

export default Dashboard;

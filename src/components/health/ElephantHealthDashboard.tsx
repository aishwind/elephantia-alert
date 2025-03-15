
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Activity, AlertTriangle, Battery, Heart, Brain, ThermometerSnowflake } from "lucide-react";
import ElephantActivityChart from "./ElephantActivityChart";
import ElephantBehaviorAnalysis from "./ElephantBehaviorAnalysis";
import ElephantReportGenerator from "./ElephantReportGenerator";
import { useToast } from "@/components/ui/use-toast";
import { elephantHealthData } from "@/utils/elephantHealthData";

const ElephantHealthDashboard = () => {
  const [selectedElephant, setSelectedElephant] = useState("TNELE2021021");
  const [alertAudio] = useState(new Audio("/alert-sound.mp3"));
  const { toast } = useToast();
  
  // Find the selected elephant data
  const elephantData = elephantHealthData.find(e => e.id === selectedElephant) || elephantHealthData[0];
  
  useEffect(() => {
    // Check for boundary fence alert
    if (elephantData.alert && elephantData.alert.type === "boundary_fence") {
      // Play alert sound
      alertAudio.play().catch(e => console.error("Error playing alert sound:", e));
      
      // Show toast notification
      toast({
        title: "⚠️ Boundary Fence Alert",
        description: `Elephant ${elephantData.name} (${elephantData.id}) has crossed a boundary fence at ${elephantData.alert.location}.`,
        variant: "destructive",
      });
    }
  }, [elephantData, alertAudio, toast]);
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Card className="w-full md:w-64">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Select Elephant</CardTitle>
          </CardHeader>
          <CardContent>
            <select 
              className="w-full p-2 border rounded-md dark:bg-elephant-900 dark:border-elephant-700"
              value={selectedElephant}
              onChange={(e) => setSelectedElephant(e.target.value)}
            >
              {elephantHealthData.map(elephant => (
                <option key={elephant.id} value={elephant.id}>
                  {elephant.name} ({elephant.id})
                </option>
              ))}
            </select>
          </CardContent>
        </Card>
        
        <Card className="w-full md:flex-1 bg-gradient-to-r from-elephant-50 to-elephant-100 dark:from-elephant-900 dark:to-elephant-800">
          <CardHeader className="pb-2">
            <CardTitle>Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-elephant-100 dark:bg-elephant-800 rounded-full">
                  <Heart className="h-4 w-4 text-alert-500" />
                </div>
                <div>
                  <p className="text-xs text-elephant-500 dark:text-elephant-400">Heart Rate</p>
                  <p className="font-medium">{elephantData.vitals.heartRate} bpm</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-elephant-100 dark:bg-elephant-800 rounded-full">
                  <ThermometerSnowflake className="h-4 w-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-elephant-500 dark:text-elephant-400">Temperature</p>
                  <p className="font-medium">{elephantData.vitals.temperature}°C</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-elephant-100 dark:bg-elephant-800 rounded-full">
                  <Activity className="h-4 w-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-elephant-500 dark:text-elephant-400">Activity</p>
                  <p className="font-medium">{elephantData.activity.currentState}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="mr-2 p-2 bg-elephant-100 dark:bg-elephant-800 rounded-full">
                  <Battery className="h-4 w-4 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs text-elephant-500 dark:text-elephant-400">Collar Battery</p>
                  <p className="font-medium">{elephantData.collarStatus.batteryLevel}%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {elephantData.alert && (
        <Card className="border-alert-300 bg-alert-50 dark:bg-alert-900/20 dark:border-alert-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-alert-700 dark:text-alert-300">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alert: {elephantData.alert.type.replace('_', ' ')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-alert-600 dark:text-alert-400">{elephantData.alert.description}</p>
            <p className="text-sm text-alert-500 dark:text-alert-500 mt-1">
              Time: {elephantData.alert.timestamp} • Location: {elephantData.alert.location}
            </p>
          </CardContent>
        </Card>
      )}
      
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activity">Activity Tracking</TabsTrigger>
          <TabsTrigger value="behavior">Behavior Analysis</TabsTrigger>
          <TabsTrigger value="report">Report Generator</TabsTrigger>
        </TabsList>
        
        <TabsContent value="activity" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Patterns</CardTitle>
              <CardDescription>
                24-hour activity monitoring for {elephantData.name}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <ElephantActivityChart elephantData={elephantData} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="behavior" className="mt-4">
          <ElephantBehaviorAnalysis elephantData={elephantData} />
        </TabsContent>
        
        <TabsContent value="report" className="mt-4">
          <ElephantReportGenerator elephantData={elephantData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ElephantHealthDashboard;


import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { History, Download, Filter, ChevronDown, ChevronUp, Calendar, Map as MapIcon, AlertTriangle } from "lucide-react";

interface IncidentHistoryProps {
  className?: string;
}

const IncidentHistory: React.FC<IncidentHistoryProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState("incidents");
  const [expandedItem, setExpandedItem] = useState<number | null>(null);
  
  // Mock historical incident data
  const incidents = [
    {
      id: 1,
      date: "May 15, 2023",
      title: "Elephant herd railway crossing",
      location: "Rajaji National Park, Section C",
      status: "Resolved",
      type: "Crossing",
      actions: ["Train stoppage", "Ranger deployment"],
      notes: "Family group of 6 elephants crossed railway tracks. Trains were stopped for 35 minutes. All elephants crossed safely with ranger supervision."
    },
    {
      id: 2,
      date: "Apr 28, 2023",
      title: "Elephant near village",
      location: "Haridwar Forest Division",
      status: "Resolved",
      type: "Village Proximity",
      actions: ["SMS alerts", "Ranger monitoring"],
      notes: "Single adult bull elephant approached within 1km of village boundary. Residents were alerted via SMS. Elephant moved away naturally after 3 hours."
    },
    {
      id: 3,
      date: "Apr 10, 2023",
      title: "False alert: Large cattle",
      location: "Dehradun Forest Division",
      status: "False Alert",
      type: "Sensor Error",
      actions: ["Sensor recalibration"],
      notes: "Thermal sensors mistook a large cattle herd for elephants. System flagged as false positive. Sensor sensitivity adjusted and recalibrated."
    },
    {
      id: 4,
      date: "Mar 22, 2023",
      title: "Elephants on tracks - emergency braking",
      location: "Corbett Railway Zone",
      status: "Emergency",
      type: "Train Collision Risk",
      actions: ["Emergency braking", "Ranger emergency response"],
      notes: "Three elephants on tracks with train approaching at high speed. Emergency braking activated. Train stopped 600m from elephants. Rangers deployed ultrasonic deterrents to move elephants safely away."
    },
  ];
  
  // Mock trend data
  const trends = [
    { month: "Jan", incidents: 8 },
    { month: "Feb", incidents: 12 },
    { month: "Mar", incidents: 15 },
    { month: "Apr", incidents: 9 },
    { month: "May", incidents: 6 },
  ];
  
  // Status color mapping
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "emergency":
        return "bg-alert-100 text-alert-700 dark:bg-alert-900/30 dark:text-alert-400";
      case "resolved":
        return "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400";
      case "false alert":
        return "bg-elephant-100 text-elephant-700 dark:bg-elephant-900/30 dark:text-elephant-400";
      default:
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    }
  };
  
  const toggleExpand = (id: number) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <div className={cn("rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card overflow-hidden", className)}>
      <div className="bg-white dark:bg-elephant-900 px-4 py-3 border-b border-elephant-200 dark:border-elephant-800 flex justify-between items-center">
        <h3 className="font-semibold text-elephant-900 dark:text-white flex items-center gap-2">
          <History className="h-4 w-4 text-elephant-500" />
          Incident History
        </h3>
        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
          <Filter className="h-4 w-4" />
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white dark:bg-elephant-950">
        <TabsList className="w-full rounded-none bg-elephant-50 dark:bg-elephant-900/80 border-b border-elephant-200 dark:border-elephant-800">
          <TabsTrigger value="incidents" className="flex-1 text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-elephant-950">
            Past Incidents
          </TabsTrigger>
          <TabsTrigger value="trends" className="flex-1 text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-elephant-950">
            Trend Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="incidents" className="p-0 m-0">
          <div className="max-h-[400px] overflow-y-auto divide-y divide-elephant-100 dark:divide-elephant-800">
            {incidents.map((incident) => (
              <div key={incident.id} className="bg-white dark:bg-elephant-950">
                <div 
                  className="p-4 cursor-pointer hover:bg-elephant-50 dark:hover:bg-elephant-900/50"
                  onClick={() => toggleExpand(incident.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm text-elephant-900 dark:text-white">{incident.title}</h4>
                      <div className="flex items-center mt-1 text-xs text-elephant-500 dark:text-elephant-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {incident.date}
                        <span className="mx-1.5">•</span>
                        <MapIcon className="h-3 w-3 mr-1" />
                        {incident.location}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs mr-2", getStatusColor(incident.status))}
                      >
                        {incident.status}
                      </Badge>
                      {expandedItem === incident.id ? 
                        <ChevronUp className="h-4 w-4 text-elephant-500" /> : 
                        <ChevronDown className="h-4 w-4 text-elephant-500" />
                      }
                    </div>
                  </div>
                  
                  {expandedItem === incident.id && (
                    <div className="mt-3 pt-3 border-t border-elephant-100 dark:border-elephant-800">
                      <div className="text-xs text-elephant-700 dark:text-elephant-300 space-y-2">
                        <div>
                          <span className="font-medium">Type:</span> {incident.type}
                        </div>
                        <div>
                          <span className="font-medium">Actions Taken:</span>
                          <ul className="list-disc ml-5 mt-1">
                            {incident.actions.map((action, idx) => (
                              <li key={idx}>{action}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="font-medium">Notes:</span>
                          <p className="mt-1">{incident.notes}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-end mt-3">
                        <Button variant="outline" size="sm" className="text-xs">
                          <Download className="h-3 w-3 mr-1" />
                          Export Report
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="p-0 m-0">
          <div className="p-4">
            <h4 className="font-medium text-sm mb-3 text-elephant-900 dark:text-white">
              Elephant Incident Trends
            </h4>
            
            {/* Simple bar chart visualization */}
            <div className="h-40 flex items-end justify-between gap-1 mb-4">
              {trends.map((item) => (
                <div key={item.month} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-elephant-400 dark:bg-elephant-600 rounded-t"
                    style={{ height: `${(item.incidents / 15) * 100}%` }}
                  ></div>
                  <div className="text-xs mt-1 text-elephant-600 dark:text-elephant-400">
                    {item.month}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-elephant-50 dark:bg-elephant-900/50 rounded-lg p-3 text-xs text-elephant-700 dark:text-elephant-300">
              <div className="flex items-center mb-2">
                <AlertTriangle className="h-3 w-3 text-elephant-600 dark:text-elephant-400 mr-1" />
                <h5 className="font-medium">Key Insights:</h5>
              </div>
              <ul className="list-disc ml-5 space-y-1">
                <li>Peak incidents occurred during March (monsoon season)</li>
                <li>Railway crossings are most common (45% of incidents)</li>
                <li>False alerts have decreased by 30% since sensor calibration</li>
                <li>Recurring hotspot: Rajaji National Park Section B</li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Panel footer */}
      <div className="bg-elephant-50 dark:bg-elephant-900/50 px-4 py-2.5 border-t border-elephant-200 dark:border-elephant-800">
        <Button variant="link" size="sm" className="text-xs w-full">
          View Complete Incident History
        </Button>
      </div>
    </div>
  );
};

export default IncidentHistory;

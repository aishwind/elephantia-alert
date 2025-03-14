
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OpenStreetMap from "@/components/OpenStreetMap";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, BellRing, Calendar } from "lucide-react";

type UserRole = "admin" | "ranger" | "farmer" | "community_leader" | "government" | "insurance";

interface ElephantTrackingProps {
  userRole: UserRole;
}

// Mock elephant herd data
const elephantHerds = [
  { id: "H-001", name: "Amboseli Alpha", count: 12, lastSeen: "1 hour ago", status: "active", risk: "low" },
  { id: "H-002", name: "Tsavo Pride", count: 8, lastSeen: "3 hours ago", status: "active", risk: "medium" },
  { id: "H-003", name: "Mara Matriarch", count: 15, lastSeen: "30 mins ago", status: "active", risk: "high" },
  { id: "H-004", name: "Laikipia Bulls", count: 3, lastSeen: "12 hours ago", status: "inactive", risk: "low" },
  { id: "H-005", name: "Samburu Family", count: 9, lastSeen: "2 hours ago", status: "active", risk: "medium" },
];

// Mock recent alerts data
const recentAlerts = [
  { id: "ALT-001", time: "08:45 AM", message: "Herd approaching village in Amboseli South", severity: "high" },
  { id: "ALT-002", time: "10:12 AM", message: "Bull elephants near railway tracks in Tsavo", severity: "medium" },
  { id: "ALT-003", time: "11:30 AM", message: "Large herd movement toward farmland in Laikipia", severity: "high" },
  { id: "ALT-004", time: "01:15 PM", message: "Elephant spotted near water source in community area", severity: "low" },
];

const ElephantTracking: React.FC<ElephantTrackingProps> = ({ userRole }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Real-Time Elephant Tracking</CardTitle>
                  <CardDescription>
                    Live visualization of tracked elephant locations and movement patterns
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Herds" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Herds</SelectItem>
                      <SelectItem value="active">Active Only</SelectItem>
                      <SelectItem value="high-risk">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="satellite">
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Map View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="satellite">Satellite</SelectItem>
                      <SelectItem value="terrain">Terrain</SelectItem>
                      <SelectItem value="heatmap">Heat Map</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[600px]">
              <OpenStreetMap />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Tracked Herds</CardTitle>
              <CardDescription>
                Status of monitored elephant herds and groups
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {elephantHerds.map((herd) => (
                  <div key={herd.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium flex items-center">
                        <Badge
                          variant="outline"
                          className={
                            herd.status === "active"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mr-2"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 mr-2"
                          }
                        >
                          {herd.status}
                        </Badge>
                        {herd.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {herd.count} elephants • Last seen: {herd.lastSeen}
                      </div>
                    </div>
                    <Badge
                      className={
                        herd.risk === "high"
                          ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          : herd.risk === "medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                          : "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                      }
                    >
                      {herd.risk} risk
                    </Badge>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  <MapPin className="h-4 w-4 mr-2" />
                  View All Herds
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>
                Automated notifications about potential conflicts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start space-x-3 border-b pb-3 last:border-0 last:pb-0">
                    <div className={
                      alert.severity === "high"
                        ? "text-red-500 dark:text-red-400 mt-0.5"
                        : alert.severity === "medium" 
                        ? "text-yellow-500 dark:text-yellow-400 mt-0.5"
                        : "text-green-500 dark:text-green-400 mt-0.5"
                    }>
                      <AlertTriangle className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-medium">{alert.message}</div>
                      <div className="text-sm text-muted-foreground">{alert.time} today</div>
                    </div>
                  </div>
                ))}
                <div className="flex gap-3">
                  <Button variant="outline" className="w-full">
                    <BellRing className="h-4 w-4 mr-2" />
                    Manage Alerts
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="h-4 w-4 mr-2" />
                    Alert History
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ElephantTracking;

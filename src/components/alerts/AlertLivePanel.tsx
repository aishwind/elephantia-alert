
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, Check, Filter, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

// Mock alert data for demonstration
const mockAlerts = [
  {
    id: 1,
    type: "movement",
    severity: "critical",
    time: "Just now",
    timestamp: new Date().toISOString(),
    title: "Multiple elephants approaching railway tracks",
    location: "Rajaji National Park, Section B",
    coordinates: "30.0219° N, 78.2329° E",
    distance: "2.5 km from nearest station",
    status: "active",
    source: "sensor-based",
    details: "Group of 8 elephants detected heading towards the railway tracks. Estimated time to track crossing: 10-15 minutes."
  },
  {
    id: 2,
    type: "prediction",
    severity: "high",
    time: "10 min ago",
    timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    title: "Predicted herd movement toward village",
    location: "Haridwar Forest Division, North Zone",
    coordinates: "29.9457° N, 78.1642° E",
    distance: "4.3 km from Chandi village",
    status: "active",
    source: "ai-prediction",
    details: "Based on current trajectory, elephant herd likely to approach Chandi village within 2 hours. Preventative measures recommended."
  },
  {
    id: 3,
    type: "detection",
    severity: "medium",
    time: "45 min ago",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    title: "Lone elephant near highway",
    location: "Lansdowne Forest Division",
    coordinates: "29.8424° N, 78.6809° E",
    distance: "1.2 km from NH-534",
    status: "monitoring",
    source: "sensor-based",
    details: "Adult bull elephant detected near highway. Currently feeding in forest area, not showing signs of road approach."
  },
  {
    id: 4,
    type: "resolved",
    severity: "low",
    time: "2 hours ago",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    title: "Elephants crossed designated corridor",
    location: "Corbett Buffer Zone",
    coordinates: "29.5300° N, 78.7747° E",
    distance: "8.5 km from nearest village",
    status: "resolved",
    source: "ranger-report",
    details: "Family group successfully used designated elephant corridor to cross between forest patches. No intervention needed."
  },
  {
    id: 5,
    type: "false-alert",
    severity: "low",
    time: "Yesterday",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    title: "Motion detected near railway",
    location: "Dehradun Forest Division",
    coordinates: "30.3165° N, 78.0322° E",
    distance: "6.1 km from Dehradun station",
    status: "false-alert",
    source: "sensor-based",
    details: "Initial motion detection indicated possible elephant presence. Visual confirmation revealed large cattle herd. No elephants present."
  }
];

interface AlertLivePanelProps {
  className?: string;
}

const AlertLivePanel: React.FC<AlertLivePanelProps> = ({ className }) => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null);
  const [showNewAlert, setShowNewAlert] = useState(false);
  const [filter, setFilter] = useState<string>("all");
  const { toast } = useToast();

  // Simulate receiving a new critical alert
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewAlert(true);
      
      const timer2 = setTimeout(() => {
        const newAlert = {
          id: Math.max(...alerts.map(a => a.id)) + 1,
          type: "emergency",
          severity: "critical",
          time: "Just now",
          timestamp: new Date().toISOString(),
          title: "URGENT: Elephants on railway tracks",
          location: "Corbett Railway Zone, Section 4",
          coordinates: "29.6548° N, 78.9235° E",
          distance: "0.1 km from approaching train",
          status: "active",
          source: "sensor-based",
          details: "Multiple elephants directly on railway tracks with train approaching in approximately 8 minutes. Immediate action required."
        };
        
        setAlerts([newAlert, ...alerts]);
        setShowNewAlert(false);
        
        toast({
          title: "Critical Alert",
          description: "Elephants detected on railway tracks. Immediate action required.",
          variant: "destructive",
        });
      }, 3000);
      
      return () => clearTimeout(timer2);
    }, 15000);
    
    return () => clearTimeout(timer);
  }, [alerts, toast]);

  // Filter alerts based on selected filter
  const filteredAlerts = filter === "all" 
    ? alerts 
    : alerts.filter(alert => 
        filter === "active" 
          ? alert.status === "active" || alert.status === "monitoring"
          : alert.severity === filter
      );

  // Icon mapping based on alert severity
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-alert-600 dark:text-alert-400" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-warning-600 dark:text-warning-400" />;
      case "medium":
        return <Info className="h-4 w-4 text-amber-600 dark:text-amber-400" />;
      case "low":
        return <Info className="h-4 w-4 text-nature-600 dark:text-nature-400" />;
      default:
        return <Check className="h-4 w-4 text-success-600 dark:text-success-400" />;
    }
  };

  // Background color based on alert severity
  const getSeverityBg = (severity: string, status: string) => {
    if (status === "false-alert") return "bg-elephant-100 dark:bg-elephant-800/30";
    if (status === "resolved") return "bg-success-100 dark:bg-success-900/30";
    
    switch (severity) {
      case "critical":
        return "bg-alert-100 dark:bg-alert-900/30";
      case "high":
        return "bg-warning-100 dark:bg-warning-900/30";
      case "medium":
        return "bg-amber-100 dark:bg-amber-900/30";
      case "low":
        return "bg-nature-100 dark:bg-nature-900/30";
      default:
        return "bg-elephant-100 dark:bg-elephant-800/30";
    }
  };

  return (
    <div className={cn("rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card overflow-hidden", className)}>
      <div className="bg-white dark:bg-elephant-900 px-4 py-3 border-b border-elephant-200 dark:border-elephant-800 flex justify-between items-center">
        <h3 className="font-semibold text-elephant-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-elephant-500" />
          Live Alerts
        </h3>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-elephant-50 dark:bg-elephant-800">
            {filteredAlerts.length} alerts
          </Badge>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Filter tabs */}
      <div className="bg-elephant-50 dark:bg-elephant-900/80 px-4 py-2 border-b border-elephant-200 dark:border-elephant-800 flex gap-2 overflow-x-auto scrollbar-hide">
        {["all", "active", "critical", "high", "medium", "low"].map((f) => (
          <Badge 
            key={f}
            variant={filter === f ? "default" : "outline"} 
            className={cn(
              "cursor-pointer capitalize",
              filter === f ? "bg-elephant-500" : "hover:bg-elephant-100 dark:hover:bg-elephant-800"
            )}
            onClick={() => setFilter(f)}
          >
            {f}
          </Badge>
        ))}
      </div>
      
      <div className="bg-white dark:bg-elephant-950 max-h-[400px] overflow-y-auto">
        {/* New alert notification */}
        <AnimatePresence>
          {showNewAlert && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-alert-50 dark:bg-alert-900/20 border-b border-alert-100 dark:border-alert-800/20 px-4 py-3 flex items-center justify-between"
            >
              <div className="flex items-center">
                <div className="mr-3 h-8 w-8 bg-alert-100 dark:bg-alert-800/30 rounded-full flex items-center justify-center animate-pulse">
                  <AlertTriangle className="h-4 w-4 text-alert-600 dark:text-alert-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-alert-800 dark:text-alert-200">New critical alert incoming...</p>
                  <div className="h-1.5 mt-1 w-24 bg-alert-200 dark:bg-alert-800/50 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-alert-600 dark:bg-alert-400"
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Alert list */}
        {filteredAlerts.length > 0 ? (
          <ul className="divide-y divide-elephant-100 dark:divide-elephant-800">
            {filteredAlerts.map((alert) => (
              <li key={alert.id} className="relative">
                <button
                  onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                  className="w-full text-left px-4 py-3 transition-colors hover:bg-elephant-50 dark:hover:bg-elephant-900/50"
                >
                  <div className="flex items-start">
                    <div className={cn(
                      "mr-3 h-8 w-8 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0",
                      getSeverityBg(alert.severity, alert.status)
                    )}>
                      {getSeverityIcon(alert.severity)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium text-sm text-elephant-900 dark:text-white truncate pr-4">
                          {alert.title}
                        </h4>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1 text-elephant-500" />
                          <span className="text-xs text-elephant-500 dark:text-elephant-400 whitespace-nowrap">{alert.time}</span>
                        </div>
                      </div>
                      <p className="text-xs text-elephant-500 dark:text-elephant-400 flex items-center mb-1">
                        <MapPin className="h-3 w-3 mr-1 inline" />
                        {alert.location}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={cn(
                            "text-xs capitalize",
                            alert.status === "active" ? "text-alert-600 border-alert-200 bg-alert-50" :
                            alert.status === "monitoring" ? "text-amber-600 border-amber-200 bg-amber-50" :
                            alert.status === "resolved" ? "text-success-600 border-success-200 bg-success-50" :
                            "text-elephant-600 border-elephant-200 bg-elephant-50"
                          )}
                        >
                          {alert.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {alert.source}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {expandedAlert === alert.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 overflow-hidden"
                      >
                        <div className="bg-elephant-50 dark:bg-elephant-900/50 rounded-lg p-3 text-sm">
                          <p className="mb-3 text-elephant-700 dark:text-elephant-300">
                            {alert.details}
                          </p>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                            <div>
                              <span className="text-elephant-500 dark:text-elephant-400">Coordinates:</span>
                              <p className="font-medium text-elephant-700 dark:text-elephant-300">{alert.coordinates}</p>
                            </div>
                            <div>
                              <span className="text-elephant-500 dark:text-elephant-400">Distance:</span>
                              <p className="font-medium text-elephant-700 dark:text-elephant-300">{alert.distance}</p>
                            </div>
                            <div>
                              <span className="text-elephant-500 dark:text-elephant-400">Status:</span>
                              <p className="font-medium text-elephant-700 dark:text-elephant-300 capitalize">{alert.status}</p>
                            </div>
                            <div>
                              <span className="text-elephant-500 dark:text-elephant-400">Source:</span>
                              <p className="font-medium text-elephant-700 dark:text-elephant-300 capitalize">{alert.source}</p>
                            </div>
                          </div>
                          
                          <div className="flex justify-end mt-3">
                            <Button variant="default" size="sm" className="ml-2">View on Map</Button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
                
                {alert.status === "active" && alert.severity === "critical" && alert.id === filteredAlerts[0].id && (
                  <div className="absolute top-0 right-0 mt-3 mr-4">
                    <span className="inline-flex h-2 w-2">
                      <span className="animate-ping-subtle absolute inline-flex h-full w-full rounded-full bg-alert-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-alert-500"></span>
                    </span>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-12 text-center text-elephant-500 dark:text-elephant-400">
            <Info className="h-8 w-8 mx-auto mb-3 opacity-50" />
            <p>No alerts match the current filter</p>
            <Button 
              variant="link" 
              className="mt-2"
              onClick={() => setFilter("all")}
            >
              Show all alerts
            </Button>
          </div>
        )}
      </div>
      
      {/* Panel footer */}
      <div className="bg-elephant-50 dark:bg-elephant-900/50 px-4 py-2.5 border-t border-elephant-200 dark:border-elephant-800 flex justify-between items-center">
        <Badge variant="outline" className="text-xs">
          Auto-refreshing
        </Badge>
        <Button variant="link" size="sm" className="text-xs">
          View all alerts
        </Button>
      </div>
    </div>
  );
};

export default AlertLivePanel;

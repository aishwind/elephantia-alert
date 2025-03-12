
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, MapPin, ArrowRight, ExternalLink, X } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock alert data for demonstration
const mockAlerts = [
  {
    id: 1,
    level: "high",
    time: "Just now",
    title: "Elephant herd approaching railway line",
    location: "Rajaji National Park, Section B",
    details: "Group of 8 elephants detected heading towards the railway tracks. Estimated time to track crossing: 15-20 minutes.",
    actions: ["Notify train operators", "Deploy forest rangers"],
  },
  {
    id: 2,
    level: "medium",
    time: "10 min ago",
    title: "Elephant movement detected near village",
    location: "Haridwar Forest Division, North Zone",
    details: "Single adult bull elephant moving in the vicinity of Chandi village. No immediate risk, but situation being monitored.",
    actions: ["Alert village residents", "Monitor movement"],
  },
  {
    id: 3,
    level: "low",
    time: "1 hour ago",
    title: "Elephant herd in protected corridor",
    location: "Lansdowne Forest Division",
    details: "Family group with calves moving through designated elephant corridor. Movement aligned with expected patterns.",
    actions: ["Update tracking data", "Continue monitoring"],
  },
];

interface AlertProps {
  className?: string;
}

const AlertPanel: React.FC<AlertProps> = ({ className }) => {
  const [alerts, setAlerts] = useState(mockAlerts);
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null);
  const [showNewAlert, setShowNewAlert] = useState(false);

  // Simulate receiving a new alert
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewAlert(true);
      
      const timer2 = setTimeout(() => {
        const newAlert = {
          id: 4,
          level: "high",
          time: "Just now",
          title: "Urgent: Multiple elephants on tracks",
          location: "Corbett Railway Zone, Section 4",
          details: "Three elephants detected directly on railway tracks. Immediate action required to prevent collision.",
          actions: ["Emergency train slowdown", "Deploy response team", "Sound deterrents"],
        };
        
        setAlerts([newAlert, ...alerts]);
        setShowNewAlert(false);
      }, 3000);
      
      return () => clearTimeout(timer2);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card overflow-hidden", className)}>
      <div className="bg-white dark:bg-elephant-900 px-4 py-3 border-b border-elephant-200 dark:border-elephant-800 flex justify-between items-center">
        <h3 className="font-semibold text-elephant-900 dark:text-white flex items-center">
          <AlertTriangle className="h-4 w-4 mr-2 text-elephant-500" />
          Recent Alerts
        </h3>
        <span className="text-xs text-elephant-500 bg-elephant-50 dark:bg-elephant-800 px-2 py-1 rounded-full">
          {alerts.length} alerts
        </span>
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
                <div className="mr-3 h-8 w-8 bg-alert-100 dark:bg-alert-800/30 rounded-full flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-alert-600 dark:text-alert-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-alert-800 dark:text-alert-200">New high priority alert incoming...</p>
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
        <ul className="divide-y divide-elephant-100 dark:divide-elephant-800">
          {alerts.map((alert) => (
            <li key={alert.id} className="relative">
              <button
                onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
                className="w-full text-left px-4 py-3 transition-colors hover:bg-elephant-50 dark:hover:bg-elephant-900/50"
              >
                <div className="flex items-start">
                  <div className={cn(
                    "mr-3 h-8 w-8 mt-0.5 rounded-full flex items-center justify-center flex-shrink-0",
                    alert.level === "high" ? "bg-alert-100 dark:bg-alert-900/30" : 
                    alert.level === "medium" ? "bg-warning-100 dark:bg-warning-900/30" : 
                    "bg-success-100 dark:bg-success-900/30"
                  )}>
                    {alert.level === "high" ? (
                      <AlertTriangle className={cn("h-4 w-4", "text-alert-600 dark:text-alert-400")} />
                    ) : alert.level === "medium" ? (
                      <Info className={cn("h-4 w-4", "text-warning-600 dark:text-warning-400")} />
                    ) : (
                      <MapPin className={cn("h-4 w-4", "text-success-600 dark:text-success-400")} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-sm text-elephant-900 dark:text-white truncate pr-4">
                        {alert.title}
                      </h4>
                      <span className="text-xs text-elephant-500 dark:text-elephant-400 whitespace-nowrap">{alert.time}</span>
                    </div>
                    <p className="text-xs text-elephant-500 dark:text-elephant-400 flex items-center">
                      <MapPin className="h-3 w-3 mr-1 inline" />
                      {alert.location}
                    </p>
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
                      <p className="text-sm mb-3 text-elephant-700 dark:text-elephant-300">
                        {alert.details}
                      </p>
                      <div className="space-y-2">
                        <h5 className="text-xs font-medium text-elephant-500">Recommended Actions:</h5>
                        <ul className="space-y-1.5">
                          {alert.actions.map((action, idx) => (
                            <li key={idx} className="flex items-center text-xs text-elephant-700 dark:text-elephant-300">
                              <ArrowRight className="h-3 w-3 mr-1.5 text-elephant-400" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button className="text-xs flex items-center text-elephant-500 hover:text-elephant-700 transition-colors">
                          View complete details
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
              
              {alert.level === "high" && alert.id === alerts[0]?.id && (
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
      </div>
      
      {/* Panel footer */}
      <div className="bg-elephant-50 dark:bg-elephant-900/50 px-4 py-2.5 border-t border-elephant-200 dark:border-elephant-800">
        <button className="text-xs w-full text-elephant-500 hover:text-elephant-700 flex items-center justify-center">
          View all alerts
          <ArrowRight className="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default AlertPanel;

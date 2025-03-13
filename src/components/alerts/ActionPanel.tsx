
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, ArrowRight, CheckCircle2, AlertTriangle, Train, Users, Shield } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ActionPanelProps {
  className?: string;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ className }) => {
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});
  const [showEmergency, setShowEmergency] = useState(false);
  const { toast } = useToast();

  const acknowledgeAction = (id: string) => {
    setAcknowledged({ ...acknowledged, [id]: true });
    toast({
      title: "Action Acknowledged",
      description: "Your acknowledgment has been recorded.",
    });
  };

  const triggerEmergency = (type: string) => {
    toast({
      title: "Emergency Action Triggered",
      description: `${type} emergency protocol has been activated.`,
      variant: "destructive",
    });
    setShowEmergency(false);
  };

  // Mock recommended actions
  const recommendedActions = [
    {
      id: "train-1",
      type: "train",
      title: "Reduce Train Speed",
      description: "Approaching train #1293 should reduce speed to 20km/h for the next 5km section.",
      urgency: "high",
    },
    {
      id: "rangers-1",
      type: "rangers",
      title: "Deploy Ranger Team",
      description: "Send ranger team to coordinate elephant movement away from tracks.",
      urgency: "high",
    },
    {
      id: "village-1",
      type: "village",
      title: "Alert Chandi Village",
      description: "Send notifications to residents about potential elephant approach in 2 hours.",
      urgency: "medium",
    },
    {
      id: "monitoring-1",
      type: "monitoring",
      title: "Continuous Monitoring",
      description: "Maintain visual contact with lone elephant near highway.",
      urgency: "low",
    },
  ];

  const getActionIcon = (type: string) => {
    switch (type) {
      case "train":
        return <Train className="h-4 w-4" />;
      case "rangers":
        return <Shield className="h-4 w-4" />;
      case "village":
        return <Users className="h-4 w-4" />;
      default:
        return <Bot className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "text-alert-600 dark:text-alert-400";
      case "medium":
        return "text-warning-600 dark:text-warning-400";
      case "low":
        return "text-nature-600 dark:text-nature-400";
      default:
        return "text-elephant-600 dark:text-elephant-400";
    }
  };

  const getUrgencyBg = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-alert-50 dark:bg-alert-900/20 border-alert-100 dark:border-alert-800/20";
      case "medium":
        return "bg-warning-50 dark:bg-warning-900/20 border-warning-100 dark:border-warning-800/20";
      case "low":
        return "bg-nature-50 dark:bg-nature-900/20 border-nature-100 dark:border-nature-800/20";
      default:
        return "bg-elephant-50 dark:bg-elephant-900/20 border-elephant-100 dark:border-elephant-800/20";
    }
  };

  return (
    <div className={cn("rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card overflow-hidden", className)}>
      <div className="bg-white dark:bg-elephant-900 px-4 py-3 border-b border-elephant-200 dark:border-elephant-800 flex justify-between items-center">
        <h3 className="font-semibold text-elephant-900 dark:text-white flex items-center gap-2">
          <Bot className="h-4 w-4 text-elephant-500" />
          AI Recommendations
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-alert-50 text-alert-600 border-alert-200 hover:bg-alert-100"
          onClick={() => setShowEmergency(!showEmergency)}
        >
          Emergency Actions
        </Button>
      </div>
      
      {/* Emergency actions */}
      <motion.div 
        className="overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: showEmergency ? "auto" : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="bg-alert-50 dark:bg-alert-900/20 p-4 border-b border-alert-100 dark:border-alert-800/30">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-alert-700 dark:text-alert-300 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Emergency Response Options
            </h4>
            <Badge variant="outline" className="bg-alert-100 text-alert-700 border-alert-200">
              Authorized Access Only
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button 
              variant="destructive"
              className="justify-start bg-alert-600 hover:bg-alert-700"
              onClick={() => triggerEmergency("Train Emergency")}
            >
              <Train className="h-4 w-4 mr-2" />
              Emergency Train Braking
            </Button>
            <Button 
              variant="destructive"
              className="justify-start bg-alert-600 hover:bg-alert-700"
              onClick={() => triggerEmergency("Ranger Emergency")}
            >
              <Shield className="h-4 w-4 mr-2" />
              Emergency Ranger Dispatch
            </Button>
            <Button 
              variant="destructive"
              className="justify-start bg-alert-600 hover:bg-alert-700"
              onClick={() => triggerEmergency("Village Emergency")}
            >
              <Users className="h-4 w-4 mr-2" />
              Emergency Village Alert
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* AI recommendations */}
      <div className="bg-white dark:bg-elephant-950 overflow-y-auto max-h-[400px] divide-y divide-elephant-100 dark:divide-elephant-800">
        {recommendedActions.map((action) => (
          <div
            key={action.id}
            className={cn(
              "p-4",
              acknowledged[action.id] ? "bg-elephant-50/50 dark:bg-elephant-900/30" : getUrgencyBg(action.urgency)
            )}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                <div className={cn(
                  "h-8 w-8 rounded-full flex items-center justify-center mr-3",
                  acknowledged[action.id] 
                    ? "bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400" 
                    : `text-${action.urgency === "high" ? "alert" : action.urgency === "medium" ? "warning" : "nature"}-600 dark:text-${action.urgency === "high" ? "alert" : action.urgency === "medium" ? "warning" : "nature"}-400`
                )}>
                  {acknowledged[action.id] ? <CheckCircle2 className="h-4 w-4" /> : getActionIcon(action.type)}
                </div>
                <div>
                  <h4 className="font-medium text-elephant-900 dark:text-white">{action.title}</h4>
                  <div className="flex items-center mt-0.5">
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-xs capitalize mr-2",
                        acknowledged[action.id] 
                          ? "text-success-600 border-success-200 bg-success-50" 
                          : `text-${action.urgency === "high" ? "alert" : action.urgency === "medium" ? "warning" : "nature"}-600 border-${action.urgency === "high" ? "alert" : action.urgency === "medium" ? "warning" : "nature"}-200 bg-${action.urgency === "high" ? "alert" : action.urgency === "medium" ? "warning" : "nature"}-50`
                      )}
                    >
                      {acknowledged[action.id] ? "Acknowledged" : `${action.urgency} urgency`}
                    </Badge>
                    <span className="text-xs text-elephant-500 dark:text-elephant-400 capitalize">
                      {action.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-elephant-700 dark:text-elephant-300 pl-11">
              {action.description}
            </p>
            
            <div className="flex justify-end mt-2">
              {!acknowledged[action.id] ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-xs"
                  onClick={() => acknowledgeAction(action.id)}
                >
                  Acknowledge
                  <CheckCircle2 className="h-3 w-3 ml-1" />
                </Button>
              ) : (
                <span className="text-xs text-success-600 dark:text-success-400 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Acknowledged
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Panel footer */}
      <div className="bg-elephant-50 dark:bg-elephant-900/50 px-4 py-2.5 border-t border-elephant-200 dark:border-elephant-800 flex justify-between items-center">
        <Badge variant="outline" className="text-xs">
          AI-powered recommendations
        </Badge>
        <Button variant="link" size="sm" className="text-xs">
          View all recommendations
          <ArrowRight className="h-3 w-3 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default ActionPanel;


import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Send, PhoneOutgoing, Bot, Bell, Users, RefreshCw, Train } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface NotificationHubProps {
  className?: string;
}

const NotificationHub: React.FC<NotificationHubProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState("chat");
  const [messageInput, setMessageInput] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent to the control center.",
    });
    setMessageInput("");
  };

  const handleSendNotification = (type: string) => {
    toast({
      title: "Notification Sent",
      description: `${type} notification has been sent successfully.`,
    });
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      toast({
        title: "Notifications Refreshed",
        description: "Notification status has been updated.",
      });
    }, 1500);
  };

  return (
    <div className={cn("rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card overflow-hidden flex flex-col", className)}>
      <div className="bg-white dark:bg-elephant-900 px-4 py-3 border-b border-elephant-200 dark:border-elephant-800 flex justify-between items-center">
        <h3 className="font-semibold text-elephant-900 dark:text-white flex items-center gap-2">
          <Bell className="h-4 w-4 text-elephant-500" />
          Notification Hub
        </h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          <RefreshCw className={cn("h-4 w-4", refreshing && "animate-spin")} />
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <TabsList className="px-4 pt-2 border-b border-elephant-100 dark:border-elephant-800 bg-white dark:bg-elephant-900 rounded-none justify-start">
          <TabsTrigger value="chat" className="text-xs data-[state=active]:bg-elephant-100 dark:data-[state=active]:bg-elephant-800">
            <MessageSquare className="h-3 w-3 mr-1" />
            Live Chat
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs data-[state=active]:bg-elephant-100 dark:data-[state=active]:bg-elephant-800">
            <Bell className="h-3 w-3 mr-1" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="elli" className="text-xs data-[state=active]:bg-elephant-100 dark:data-[state=active]:bg-elephant-800">
            <Bot className="h-3 w-3 mr-1" />
            Elli
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="chat" className="flex-1 flex flex-col p-0 m-0 data-[state=inactive]:hidden">
          <div className="flex-1 bg-white dark:bg-elephant-950 p-4 overflow-y-auto">
            <div className="flex justify-start mb-4">
              <div className="bg-elephant-100 dark:bg-elephant-800 rounded-lg px-4 py-2 max-w-[80%]">
                <p className="text-sm text-elephant-900 dark:text-white">
                  Welcome to the control center chat. You can communicate with on-duty personnel here.
                </p>
              </div>
            </div>
            
            <div className="flex justify-start mb-4">
              <div className="bg-elephant-100 dark:bg-elephant-800 rounded-lg px-4 py-2 max-w-[80%]">
                <p className="text-sm text-elephant-900 dark:text-white">
                  Ranger Team Alpha is being dispatched to the critical alert location.
                </p>
                <span className="text-xs text-elephant-500 dark:text-elephant-400 mt-1 block">
                  Control Center • 5 min ago
                </span>
              </div>
            </div>
            
            <div className="flex justify-end mb-4">
              <div className="bg-elephant-600 text-white rounded-lg px-4 py-2 max-w-[80%]">
                <p className="text-sm">
                  Has the train operator been notified about the elephants on the track?
                </p>
                <span className="text-xs text-elephant-200 mt-1 block">
                  You • 3 min ago
                </span>
              </div>
            </div>
            
            <div className="flex justify-start mb-4">
              <div className="bg-elephant-100 dark:bg-elephant-800 rounded-lg px-4 py-2 max-w-[80%]">
                <p className="text-sm text-elephant-900 dark:text-white">
                  Yes, train #1293 operator has acknowledged the alert and is reducing speed. ETA to alert zone is now 12 minutes.
                </p>
                <span className="text-xs text-elephant-500 dark:text-elephant-400 mt-1 block">
                  Control Center • Just now
                </span>
              </div>
            </div>
          </div>
          
          <div className="border-t border-elephant-200 dark:border-elephant-800 bg-white dark:bg-elephant-900 p-4">
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type your message..."
                className="text-sm"
              />
              <Button type="submit" size="icon" disabled={!messageInput.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications" className="flex-1 p-0 m-0 data-[state=inactive]:hidden">
          <div className="bg-white dark:bg-elephant-950 p-4">
            <h4 className="font-medium text-sm mb-3 text-elephant-900 dark:text-white">Send Alert Notifications</h4>
            
            <div className="space-y-3">
              <div className="bg-elephant-50 dark:bg-elephant-900/50 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Users className="h-4 w-4 text-elephant-600 dark:text-elephant-400 mr-2" />
                  <h5 className="font-medium text-sm text-elephant-900 dark:text-white">Village Communities</h5>
                </div>
                <p className="text-xs text-elephant-600 dark:text-elephant-400 mb-3">
                  Send alerts to residents in nearby villages about potential elephant movement.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleSendNotification("SMS")}
                  >
                    SMS Alert
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleSendNotification("Voice")}
                  >
                    Voice Call
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleSendNotification("App")}
                  >
                    App Notification
                  </Button>
                </div>
              </div>
              
              <div className="bg-elephant-50 dark:bg-elephant-900/50 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <Train className="h-4 w-4 text-elephant-600 dark:text-elephant-400 mr-2" />
                  <h5 className="font-medium text-sm text-elephant-900 dark:text-white">Train Operators</h5>
                </div>
                <p className="text-xs text-elephant-600 dark:text-elephant-400 mb-3">
                  Alert train operators about elephant presence near railway tracks.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="text-xs bg-alert-600 hover:bg-alert-700"
                    onClick={() => handleSendNotification("Emergency Train Alert")}
                  >
                    Emergency Alert
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleSendNotification("Train Advisory")}
                  >
                    Speed Advisory
                  </Button>
                </div>
              </div>
              
              <div className="bg-elephant-50 dark:bg-elephant-900/50 rounded-lg p-3">
                <div className="flex items-center mb-2">
                  <PhoneOutgoing className="h-4 w-4 text-elephant-600 dark:text-elephant-400 mr-2" />
                  <h5 className="font-medium text-sm text-elephant-900 dark:text-white">Authorities</h5>
                </div>
                <p className="text-xs text-elephant-600 dark:text-elephant-400 mb-3">
                  Coordinate with local authorities and forest department.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleSendNotification("Forest Department")}
                  >
                    Forest Department
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleSendNotification("Police")}
                  >
                    Local Police
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="elli" className="flex-1 flex flex-col p-0 m-0 data-[state=inactive]:hidden">
          <div className="flex-1 bg-white dark:bg-elephant-950 p-4 overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-nature-100 dark:bg-nature-900 rounded-full mx-auto flex items-center justify-center mb-2">
                <Bot className="h-6 w-6 text-nature-600 dark:text-nature-400" />
              </div>
              <h4 className="font-medium text-elephant-900 dark:text-white">Elli the Conservationist</h4>
              <p className="text-xs text-elephant-600 dark:text-elephant-400">Your AI conservation assistant</p>
            </div>
            
            <div className="flex justify-start mb-4">
              <div className="bg-elephant-100 dark:bg-elephant-800 rounded-lg px-4 py-2 max-w-[80%]">
                <p className="text-sm text-elephant-900 dark:text-white">
                  Hello! I'm Elli. I can provide guidance on elephant behavior and conservation actions during alerts. How can I help with the current situation?
                </p>
              </div>
            </div>
            
            <div className="flex justify-end mb-4">
              <div className="bg-elephant-600 text-white rounded-lg px-4 py-2 max-w-[80%]">
                <p className="text-sm">
                  What should we do if the elephants don't move away from the tracks?
                </p>
              </div>
            </div>
            
            <div className="flex justify-start mb-4">
              <div className="bg-elephant-100 dark:bg-elephant-800 rounded-lg px-4 py-2 max-w-[80%]">
                <p className="text-sm text-elephant-900 dark:text-white">
                  If elephants don't move from the tracks despite ranger efforts, consider these options:
                </p>
                <ul className="list-disc ml-5 mt-1 text-sm text-elephant-900 dark:text-white">
                  <li>Continue to keep trains at a safe distance</li>
                  <li>Deploy acoustic deterrents at a safe distance</li>
                  <li>Have rangers use spotlights from a safe position</li>
                  <li>Never approach or disturb the elephants directly</li>
                </ul>
                <p className="text-sm text-elephant-900 dark:text-white mt-2">
                  The elephants will likely move on their own once they feel safe. Patience is key to avoid dangerous confrontations.
                </p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-elephant-200 dark:border-elephant-800 bg-white dark:bg-elephant-900 p-4">
            <Button 
              variant="outline" 
              className="w-full justify-center"
              onClick={() => window.location.href = '/elli'}
            >
              <Bot className="h-4 w-4 mr-2" />
              Open Full Elli Chat
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationHub;

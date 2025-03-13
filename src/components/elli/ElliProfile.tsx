
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Pause, Play, Volume2 } from "lucide-react";

interface ElliProfileProps {
  isPlaying: boolean;
  togglePlayback: () => void;
}

const ElliProfile: React.FC<ElliProfileProps> = ({ isPlaying, togglePlayback }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="mb-6 text-center">
          <div className="w-24 h-24 bg-nature-100 dark:bg-nature-900 rounded-full mx-auto flex items-center justify-center mb-4">
            <Bot className="h-12 w-12 text-nature-600 dark:text-nature-400" />
          </div>
          <h3 className="text-xl font-bold text-elephant-900 dark:text-white">Elli</h3>
          <p className="text-sm text-elephant-600 dark:text-elephant-400">Conservation AI Assistant</p>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-elephant-900 dark:text-white">About Elli</h4>
            <p className="text-sm text-elephant-600 dark:text-elephant-400">
              Elli is an AI virtual assistant powered by advanced language models and conservation expertise. 
              She's designed to provide educational content about elephants and wildlife conservation.
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-elephant-900 dark:text-white">Capabilities</h4>
            <ul className="text-sm text-elephant-600 dark:text-elephant-400 space-y-1">
              <li>• Elephant facts and species information</li>
              <li>• Conservation programs and efforts</li>
              <li>• Wildlife protection tips</li>
              <li>• Interactive Q&A on conservation</li>
              <li>• Educational resources for all ages</li>
            </ul>
          </div>
          
          <div className="pt-4">
            <h4 className="font-medium text-elephant-900 dark:text-white mb-2">Voice Settings</h4>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex-1"
                onClick={togglePlayback}
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                {isPlaying ? "Pause Voice" : "Play Voice"}
              </Button>
              <Button variant="outline" size="icon" className="w-9 h-9">
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ElliProfile;


import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MapPin, Info, Layers, Plus, Minus, Navigation, Train, Map } from "lucide-react";
import Map from "@/components/Map";

interface AlertMapProps {
  className?: string;
}

const AlertMap: React.FC<AlertMapProps> = ({ className }) => {
  const [activeLayers, setActiveLayers] = useState({
    elephants: true,
    predictions: true,
    railways: true,
    villages: true,
    heatmap: true,
    rangers: true,
  });
  
  const toggleLayer = (layer: string) => {
    setActiveLayers({
      ...activeLayers,
      [layer]: !activeLayers[layer as keyof typeof activeLayers],
    });
  };

  return (
    <div className={cn("rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card overflow-hidden flex flex-col", className)}>
      <div className="bg-white dark:bg-elephant-900 px-4 py-3 border-b border-elephant-200 dark:border-elephant-800 flex justify-between items-center">
        <h3 className="font-semibold text-elephant-900 dark:text-white flex items-center gap-2">
          <Map className="h-4 w-4 text-elephant-500" />
          Live Tracking Map
        </h3>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Navigation className="h-3 w-3" />
          <span>My Location</span>
        </Button>
      </div>
      
      {/* Map */}
      <div className="flex-1 relative min-h-[300px]">
        <Map />
        
        {/* Alert indicators - these would be positioned by the Map component in real-world */}
        <div className="absolute left-[45%] top-[30%] z-10">
          <div className="map-marker-pulse bg-alert-500/20 h-8 w-8 rounded-full">
            <div className="bg-alert-500 h-4 w-4 rounded-full flex items-center justify-center text-white">
              <AlertTriangle className="h-3 w-3" />
            </div>
          </div>
        </div>
        
        <div className="absolute left-[25%] top-[45%] z-10">
          <div className="animate-pulse-subtle bg-warning-500/20 h-8 w-8 rounded-full">
            <div className="bg-warning-500 h-4 w-4 rounded-full flex items-center justify-center text-white">
              <AlertTriangle className="h-3 w-3" />
            </div>
          </div>
        </div>
        
        <div className="absolute left-[65%] top-[50%] z-10">
          <div className="bg-nature-500/20 h-8 w-8 rounded-full">
            <div className="bg-nature-500 h-4 w-4 rounded-full flex items-center justify-center text-white">
              <MapPin className="h-3 w-3" />
            </div>
          </div>
        </div>
        
        {/* Train indicator */}
        <div className="absolute left-[75%] top-[40%] z-10">
          <div className="animate-pulse-subtle bg-elephant-500/20 h-8 w-8 rounded-full">
            <div className="bg-elephant-500 h-4 w-4 rounded-full flex items-center justify-center text-white">
              <Train className="h-3 w-3" />
            </div>
          </div>
        </div>
        
        {/* Map controls */}
        <div className="absolute top-4 right-4 glass-card rounded-lg p-1.5 flex flex-col space-y-1.5 z-10">
          <button className="h-8 w-8 bg-white dark:bg-elephant-800 rounded flex items-center justify-center text-elephant-600 dark:text-elephant-300 hover:bg-elephant-50 dark:hover:bg-elephant-700">
            <Plus className="h-4 w-4" />
          </button>
          <div className="h-px w-full bg-elephant-200 dark:bg-elephant-700"></div>
          <button className="h-8 w-8 bg-white dark:bg-elephant-800 rounded flex items-center justify-center text-elephant-600 dark:text-elephant-300 hover:bg-elephant-50 dark:hover:bg-elephant-700">
            <Minus className="h-4 w-4" />
          </button>
        </div>
        
        {/* Map layers control */}
        <div className="absolute bottom-4 right-4 glass-card rounded-lg p-3 z-10">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-medium text-elephant-700 dark:text-elephant-300">Map Layers</h4>
            <Layers className="h-3 w-3 text-elephant-500" />
          </div>
          <div className="space-y-1.5">
            {Object.entries(activeLayers).map(([layer, active]) => (
              <div key={layer} className="flex items-center">
                <button 
                  className={cn(
                    "h-3 w-3 rounded mr-2",
                    active
                      ? layer === "elephants" ? "bg-alert-500" :
                        layer === "predictions" ? "bg-warning-500" :
                        layer === "railways" ? "bg-elephant-500" :
                        layer === "villages" ? "bg-amber-500" :
                        layer === "heatmap" ? "bg-purple-500" :
                        "bg-success-500"
                      : "bg-elephant-300 dark:bg-elephant-700"
                  )}
                  onClick={() => toggleLayer(layer)}
                ></button>
                <span className="text-xs capitalize">
                  {layer}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Map legend */}
        <div className="absolute bottom-4 left-4 glass-card rounded-lg px-4 py-3 z-10">
          <h4 className="text-xs font-semibold mb-2 text-elephant-700 dark:text-elephant-300">Map Legend</h4>
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-alert-500"></div>
              <span className="text-xs">Critical Alert</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-warning-500"></div>
              <span className="text-xs">Warning</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-nature-500"></div>
              <span className="text-xs">Elephant Location</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-elephant-500"></div>
              <span className="text-xs">Train Location</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertMap;

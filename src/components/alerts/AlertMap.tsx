import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, MapPin, Info, Layers, Plus, Minus, Navigation, Train } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default Leaflet markers not showing properly
// You would need to import these marker icons in your project
const defaultIcon = L.icon({
  iconUrl: "/images/marker-icon.png",
  shadowUrl: "/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = defaultIcon;

// Custom marker components
const AlertMarker = ({ position }) => {
  const alertIcon = L.divIcon({
    className: "map-marker-pulse",
    html: `<div class="bg-alert-500/20 h-8 w-8 rounded-full flex items-center justify-center">
            <div class="bg-alert-500 h-4 w-4 rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
            </div>
          </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  return (
    <Marker position={position} icon={alertIcon}>
      <Popup>Critical Alert</Popup>
    </Marker>
  );
};

const WarningMarker = ({ position }) => {
  const warningIcon = L.divIcon({
    className: "animate-pulse-subtle",
    html: `<div class="bg-warning-500/20 h-8 w-8 rounded-full flex items-center justify-center">
            <div class="bg-warning-500 h-4 w-4 rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
            </div>
          </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  return (
    <Marker position={position} icon={warningIcon}>
      <Popup>Warning</Popup>
    </Marker>
  );
};

const ElephantMarker = ({ position }) => {
  const elephantIcon = L.divIcon({
    className: "",
    html: `<div class="bg-nature-500/20 h-8 w-8 rounded-full flex items-center justify-center">
            <div class="bg-nature-500 h-4 w-4 rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
          </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  return (
    <Marker position={position} icon={elephantIcon}>
      <Popup>Elephant Location</Popup>
    </Marker>
  );
};

const TrainMarker = ({ position }) => {
  const trainIcon = L.divIcon({
    className: "animate-pulse-subtle",
    html: `<div class="bg-elephant-500/20 h-8 w-8 rounded-full flex items-center justify-center">
            <div class="bg-elephant-500 h-4 w-4 rounded-full flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-4"></path><path d="M12 5V3.5A1.5 1.5 0 0 0 10.5 2h-5A1.5 1.5 0 0 0 4 3.5V5"></path><path d="M20 5V3.5A1.5 1.5 0 0 0 18.5 2h-5A1.5 1.5 0 0 0 12 3.5V5"></path><path d="M12 16v4"></path><path d="M3 16h18"></path><path d="M8 16v4"></path><path d="M16 16v4"></path></svg>
            </div>
          </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16]
  });

  return (
    <Marker position={position} icon={trainIcon}>
      <Popup>Train Location</Popup>
    </Marker>
  );
};

// Component to handle "Go to my location" functionality
const LocationButton = () => {
  const map = useMap();
  
  const goToMyLocation = () => {
    map.locate({setView: true, maxZoom: 16});
  };
  
  return null; // This is just the functionality, not the actual button
};

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

  // Simulated locations for the map markers (replace with real data in production)
  const locations = {
    center: [8.5241, 80.3707] as [number, number], // Center of Sri Lanka (example)
    alert: [8.5541, 80.4007] as [number, number],
    warning: [8.4941, 80.3407] as [number, number],
    elephant: [8.5941, 80.3907] as [number, number],
    train: [8.6241, 80.3507] as [number, number]
  };

  // Handle "My Location" button click
  const handleMyLocationClick = () => {
    // This will be handled by the LocationButton component
  };

  return (
    <div className={cn("rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card overflow-hidden flex flex-col", className)}>
      <div className="bg-white dark:bg-elephant-900 px-4 py-3 border-b border-elephant-200 dark:border-elephant-800 flex justify-between items-center">
        <h3 className="font-semibold text-elephant-900 dark:text-white flex items-center gap-2">
          <MapPin className="h-4 w-4 text-elephant-500" />
          Live Tracking Map
        </h3>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={handleMyLocationClick}
        >
          <Navigation className="h-3 w-3" />
          <span>My Location</span>
        </Button>
      </div>
      
      {/* OpenStreetMap Map */}
      <div className="flex-1 relative min-h-[300px]">
        <MapContainer 
          center={locations.center} 
          zoom={13} 
          style={{ height: "100%", width: "100%", minHeight: "300px" }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <LocationButton />
          
          {/* Map Markers */}
          {activeLayers.elephants && (
            <>
              <AlertMarker position={locations.alert} />
              <WarningMarker position={locations.warning} />
              <ElephantMarker position={locations.elephant} />
            </>
          )}
          
          {activeLayers.railways && (
            <TrainMarker position={locations.train} />
          )}
          
          {/* Custom zoom controls (purely visual, functionality is through the map) */}
          <ZoomControl position="topright" />
        </MapContainer>
        
        {/* Map layers control - outside MapContainer but styled to appear over the map */}
        <div className="absolute bottom-4 right-4 glass-card bg-white/80 dark:bg-elephant-900/80 backdrop-blur-sm rounded-lg p-3 z-[1000]">
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
        <div className="absolute bottom-4 left-4 glass-card bg-white/80 dark:bg-elephant-900/80 backdrop-blur-sm rounded-lg px-4 py-3 z-[1000]">
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
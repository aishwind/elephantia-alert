
import React from 'react';
import { Circle, Marker, Popup, useMap } from 'react-leaflet';
import { PredictionZone } from '@/types/elephant';
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info } from "lucide-react";
import L from 'leaflet';

interface PredictionOverlayProps {
  predictionZones: PredictionZone[];
  possibleLocations: Array<{lat: number, lng: number}>;
}

const PredictionOverlay: React.FC<PredictionOverlayProps> = ({ 
  predictionZones,
  possibleLocations
}) => {
  const map = useMap();
  
  // Focus the map on the first prediction zone when they change
  React.useEffect(() => {
    if (predictionZones.length > 0) {
      const firstZone = predictionZones[0];
      map.flyTo(
        [firstZone.location.lat, firstZone.location.lng],
        13,
        { duration: 1.5 }
      );
    }
  }, [predictionZones, map]);
  
  // Create a custom icon for possible elephant locations
  const elephantIcon = L.divIcon({
    className: "animate-pulse-subtle",
    html: `<div class="bg-nature-500/60 h-4 w-4 rounded-full"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8]
  });

  return (
    <>
      {/* Render prediction zones */}
      {predictionZones.map((zone) => (
        <React.Fragment key={zone.id}>
          <Circle
            center={[zone.location.lat, zone.location.lng]}
            radius={zone.radius * 1000} // Convert km to meters
            pathOptions={{
              color: 
                zone.riskLevel === 'critical' ? '#ef4444' : 
                zone.riskLevel === 'high' ? '#f59e0b' : 
                zone.riskLevel === 'medium' ? '#10b981' : 
                '#6288b1',
              fillColor: 
                zone.riskLevel === 'critical' ? '#ef4444' : 
                zone.riskLevel === 'high' ? '#f59e0b' : 
                zone.riskLevel === 'medium' ? '#10b981' : 
                '#6288b1',
              fillOpacity: 0.2,
              weight: 1
            }}
          />
          <Marker 
            position={[zone.location.lat, zone.location.lng]}
            icon={L.divIcon({
              className: zone.riskLevel === 'critical' || zone.riskLevel === 'high' 
                ? "map-marker-pulse" 
                : "",
              html: `<div class="bg-${
                zone.riskLevel === 'critical' ? 'alert' : 
                zone.riskLevel === 'high' ? 'warning' : 
                zone.riskLevel === 'medium' ? 'success' : 
                'elephant'
              }-500/20 h-8 w-8 rounded-full flex items-center justify-center">
                <div class="bg-${
                  zone.riskLevel === 'critical' ? 'alert' : 
                  zone.riskLevel === 'high' ? 'warning' : 
                  zone.riskLevel === 'medium' ? 'success' : 
                  'elephant'
                }-500 h-4 w-4 rounded-full flex items-center justify-center text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path></svg>
                </div>
              </div>`,
              iconSize: [32, 32],
              iconAnchor: [16, 16]
            })}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-medium text-sm mb-1">{zone.riskLevel.toUpperCase()} Risk Zone</h3>
                <p className="text-xs text-elephant-600 dark:text-elephant-300 mb-2">
                  Confidence: {Math.round(zone.confidence * 100)}%
                </p>
                {zone.elephantCount && (
                  <p className="text-xs mb-2">
                    Estimated elephants: {zone.elephantCount}
                  </p>
                )}
                {zone.details && (
                  <p className="text-xs mb-2">{zone.details}</p>
                )}
                <div className="text-xs text-elephant-500">
                  Predicted: {new Date(zone.predictedTime).toLocaleString()}
                </div>
                <Button size="sm" variant="outline" className="mt-2 w-full text-xs h-7">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Alert Nearby Trains
                </Button>
              </div>
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
      
      {/* Render possible elephant locations */}
      {possibleLocations.map((loc, index) => (
        <Marker
          key={`elephant-${index}`}
          position={[loc.lat, loc.lng]}
          icon={elephantIcon}
        >
          <Popup>
            <div className="p-1">
              <h3 className="font-medium text-xs">Possible Elephant Location</h3>
              <p className="text-xs text-elephant-500 mt-1">Based on historical data</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default PredictionOverlay;

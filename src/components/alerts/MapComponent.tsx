
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { elephantHealthData } from "@/utils/elephantHealthData";

// Fix default icon issue with Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Custom icon for alerts
const alertIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: 'alert-icon' // This will be used for styling
});

const MapComponent: React.FC = () => {
  const [elephants, setElephants] = useState(elephantHealthData);
  
  // Add pulsing effect to alert icons
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .alert-icon {
        animation: pulse 1.5s infinite;
      }
      
      @keyframes pulse {
        0% {
          filter: drop-shadow(0 0 0 rgba(255, 0, 0, 0.7));
        }
        50% {
          filter: drop-shadow(0 0 10px rgba(255, 0, 0, 0.7));
        }
        100% {
          filter: drop-shadow(0 0 0 rgba(255, 0, 0, 0.7));
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return (
    <MapContainer
      center={[11.0168, 76.9558]} // Center on Coimbatore area
      zoom={10}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {/* Map markers for elephants */}
      {elephants.map(elephant => (
        <React.Fragment key={elephant.id}>
          {/* Marker for elephant location */}
          <Marker 
            position={[elephant.location.coordinates.lat, elephant.location.coordinates.lng]} 
            icon={elephant.alert ? alertIcon : defaultIcon}
          >
            <Popup>
              <div className="p-1">
                <h3 className="font-semibold">{elephant.name} ({elephant.id})</h3>
                <p className="text-sm">Age: {elephant.age} • Gender: {elephant.gender}</p>
                <p className="text-sm">{elephant.activity.currentState}</p>
                {elephant.alert && (
                  <div className="mt-2 p-2 bg-red-50 text-red-700 text-sm rounded">
                    <strong>Alert:</strong> {elephant.alert.description}
                  </div>
                )}
                <div className="mt-2 text-xs text-right">
                  <a href="/health" className="text-blue-500 hover:underline">View Health Dashboard</a>
                </div>
              </div>
            </Popup>
          </Marker>
          
          {/* Activity radius */}
          <Circle 
            center={[elephant.location.coordinates.lat, elephant.location.coordinates.lng]}
            radius={elephant.activity.dailyActiveHours * 200} // Radius based on activity level
            pathOptions={{
              color: elephant.alert ? 'red' : 'green',
              fillColor: elephant.alert ? 'red' : 'green',
              fillOpacity: 0.1
            }}
          />
        </React.Fragment>
      ))}
      
      {/* Railway track overlay */}
      <Marker position={[10.9129, 76.9416]} icon={defaultIcon}>
        <Popup>Madukkarai Railway Section - High Risk Zone</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;

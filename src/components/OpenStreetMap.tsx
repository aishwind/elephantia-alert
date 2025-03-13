
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";

// Custom marker icons for elephants
const elephantIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2395/2395796.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const alertIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1680/1680012.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Mock elephant data for demonstration
const elephantData = [
  {
    id: 1,
    name: "Herd A",
    type: "Group",
    count: 5,
    status: "moving",
    position: [11.6025, 79.8083] as [number, number], // [lat, lng]
    risk: "low",
    lastUpdated: "2 min ago",
  },
  {
    id: 2,
    name: "Bull 01",
    type: "Individual",
    count: 1,
    status: "stationary",
    position: [11.5825, 79.8283] as [number, number],
    risk: "medium",
    lastUpdated: "Just now",
  },
  {
    id: 3,
    name: "Herd B",
    type: "Group",
    count: 8,
    status: "approaching",
    position: [11.6225, 79.7883] as [number, number],
    risk: "high",
    lastUpdated: "5 min ago",
  },
];

// Component to handle map reference
function MapController() {
  const mapRef = useRef<L.Map | null>(null);
  const map = useMap();
  
  useEffect(() => {
    if (map) {
      mapRef.current = map;
    }
  }, [map]);
  
  return null;
}

const OpenStreetMap = () => {
  // Risk level color mapping
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "high":
        return "#ef4444"; // Red
      case "medium":
        return "#f97316"; // Orange
      case "low":
        return "#10b981"; // Green
      default:
        return "#6b7280"; // Gray
    }
  };

  return (
    <div className="relative h-[600px] overflow-hidden rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card">
      <MapContainer
        center={[11.6025, 79.8083] as L.LatLngExpression}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <MapController />
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Railway track representation */}
        <Circle
          center={[11.6025, 79.8083] as L.LatLngExpression}
          pathOptions={{ 
            color: '#a3a3a3',
            fillColor: '#a3a3a3',
            fillOpacity: 0.1
          }}
          radius={2000}
        />

        {/* Elephant markers */}
        {elephantData.map((elephant) => (
          <Marker
            key={elephant.id}
            position={elephant.position as L.LatLngExpression}
            icon={elephant.risk === "high" ? alertIcon : elephantIcon}
          >
            <Popup>
              <div className="p-2">
                <h4 className="font-semibold text-base">{elephant.name}</h4>
                <div className="space-y-1 mt-2 text-sm">
                  <p className="flex justify-between">
                    <span className="text-elephant-600">Type:</span>
                    <span className="font-medium">{elephant.type}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-elephant-600">Count:</span>
                    <span className="font-medium">{elephant.count}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-elephant-600">Status:</span>
                    <span className="font-medium capitalize">{elephant.status}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-elephant-600">Risk:</span>
                    <span
                      className="font-medium"
                      style={{ color: getRiskColor(elephant.risk) }}
                    >
                      {elephant.risk.charAt(0).toUpperCase() + elephant.risk.slice(1)}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-elephant-600">Updated:</span>
                    <span className="font-medium">{elephant.lastUpdated}</span>
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-4 left-4 glass-card rounded-lg px-4 py-3 z-[1000]">
        <h4 className="text-xs font-semibold mb-2 text-elephant-700 dark:text-elephant-200">Map Legend</h4>
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-alert-500"></div>
            <span className="text-xs">High Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-warning-500"></div>
            <span className="text-xs">Medium Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-elephant-500"></div>
            <span className="text-xs">Low Risk</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpenStreetMap;

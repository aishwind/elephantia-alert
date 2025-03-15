
// import React, { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from "react-leaflet";

// // Custom marker icons for elephants
// const elephantIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/3065/3065702.png",
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// const alertIcon = new L.Icon({
//   iconUrl: "https://cdn0.iconfinder.com/data/icons/danger-signs/512/elephant_danger_warning-512.png",
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// // Mock elephant data for demonstration
// const elephantData = [
//   {
//     id: 1,
//     name: "Herd A",
//     type: "Group",
//     count: 5,
//     status: "moving",
//     position: [10.9046, 76.9558] as [number, number], // [lat, lng]
//     risk: "high",
//     lastUpdated: "2 min ago",
//   },
//   {
//     id: 2,
//     name: "Bull 01",
//     type: "Individual",
//     count: 1,
//     status: "stationary",
//     position: [10.9700, 77.0300] as [number, number],
//     risk: "medium",
//     lastUpdated: "Just now",
//   },
//   {
//     id: 3,
//     name: "Herd B",
//     type: "Group",
//     count: 8,
//     status: "approaching",
//     position: [10.9046, 76.8558] as [number, number],
//     risk: "low",
//     lastUpdated: "5 min ago",
//   },
// ];

// // Component to handle map reference
// function MapController() {
//   const mapRef = useRef<L.Map | null>(null);
//   const map = useMap();
  
//   useEffect(() => {
//     if (map) {
//       mapRef.current = map;
//     }
//   }, [map]);
  
//   return null;
// }

// const OpenStreetMap = () => {
//   // Risk level color mapping
//   const getRiskColor = (risk: string) => {
//     switch (risk) {
//       case "high":
//         return "#ef4444"; // Red
//       case "medium":
//         return "#f97316"; // Orange
//       case "low":
//         return "#10b981"; // Green
//       default:
//         return "#6b7280"; // Gray
//     }
//   };

//   return (
//     <div className="relative h-[600px] overflow-hidden rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card">
//       <MapContainer
//         center={[11.6025, 79.8083] as L.LatLngExpression}
//         zoom={12}
//         style={{ height: "100%", width: "100%" }}
//       >
//         <MapController />
        
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />

//         {/* Railway track representation */}
//         <Circle
//           center={[10.9046, 76.9558] as L.LatLngExpression}
//           pathOptions={{ 
//             color: '#a3a3a3',
//             fillColor: '#a3a3a3',
//             fillOpacity: 0.1
//           }}
//           radius={2000}
//         />

//         {/* Elephant markers */}
//         {elephantData.map((elephant) => (
//           <Marker
//             key={elephant.id}
//             position={elephant.position as L.LatLngExpression}
//             icon={elephant.risk === "high" ? alertIcon : elephantIcon}
//           >
//             <Popup>
//               <div className="p-2">
//                 <h4 className="font-semibold text-base">{elephant.name}</h4>
//                 <div className="space-y-1 mt-2 text-sm">
//                   <p className="flex justify-between">
//                     <span className="text-elephant-600">Type:</span>
//                     <span className="font-medium">{elephant.type}</span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-elephant-600">Count:</span>
//                     <span className="font-medium">{elephant.count}</span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-elephant-600">Status:</span>
//                     <span className="font-medium capitalize">{elephant.status}</span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-elephant-600">Risk:</span>
//                     <span
//                       className="font-medium"
//                       style={{ color: getRiskColor(elephant.risk) }}
//                     >
//                       {elephant.risk.charAt(0).toUpperCase() + elephant.risk.slice(1)}
//                     </span>
//                   </p>
//                   <p className="flex justify-between">
//                     <span className="text-elephant-600">Updated:</span>
//                     <span className="font-medium">{elephant.lastUpdated}</span>
//                   </p>
//                 </div>
//               </div>
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>

//       {/* Map Legend Overlay */}
//       <div className="absolute bottom-4 left-4 glass-card rounded-lg px-4 py-3 z-[1000]">
//         <h4 className="text-xs font-semibold mb-2 text-elephant-700 dark:text-elephant-200">Map Legend</h4>
//         <div className="flex flex-col space-y-1.5">
//           <div className="flex items-center space-x-2">
//             <div className="h-3 w-3 rounded-full bg-alert-500"></div>
//             <span className="text-xs">High Risk</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="h-3 w-3 rounded-full bg-warning-500"></div>
//             <span className="text-xs">Medium Risk</span>
//           </div>
//           <div className="flex items-center space-x-2">
//             <div className="h-3 w-3 rounded-full bg-elephant-500"></div>
//             <span className="text-xs">Low Risk</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OpenStreetMap;





// import React, { useState, useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
// import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from "react-leaflet";
// import axios from "axios";

// // Custom marker icons for elephants
// const elephantIcon = new L.Icon({
//   iconUrl: "https://cdn-icons-png.flaticon.com/512/3065/3065702.png",
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// const alertIcon = new L.Icon({
//   iconUrl: "https://cdn0.iconfinder.com/data/icons/danger-signs/512/elephant_danger_warning-512.png",
//   iconSize: [32, 32],
//   iconAnchor: [16, 32],
//   popupAnchor: [0, -32],
// });

// // Fence boundary coordinates (polygon points)
// const fenceBoundary: [number, number][] = [
//   [10.9300, 76.9200],
//   [10.9500, 76.9800],
//   [10.9000, 77.0000],
//   [10.8800, 76.9400],
//   [10.9300, 76.9200]
// ];

// // Component to handle map reference and animations
// function MapController({ elephants, setElephants, onAlertTriggered }) {
//   const map = useMap();
//   const intervalRef = useRef(null);
  
//   // Check if elephant is near or crossing the fence boundary
//   const isNearFence = (position) => {
//     // Simplified distance check - in a real app this would be more sophisticated
//     // using proper polygon containment algorithms
//     for (let i = 0; i < fenceBoundary.length - 1; i++) {
//       const distance = L.latLng(position).distanceTo(L.latLng(fenceBoundary[i]));
//       if (distance < 1000) { // 1km threshold
//         return true;
//       }
//     }
//     return false;
//   };

//   // Simulate random movement for elephants
//   const moveElephants = () => {
//     setElephants(prev => 
//       prev.map(elephant => {
//         // Random movement (small adjustments to lat/long)
//         const latChange = (Math.random() - 0.5) * 0.005;
//         const lngChange = (Math.random() - 0.5) * 0.005;
        
//         const newPosition = [
//           elephant.position[0] + latChange,
//           elephant.position[1] + lngChange
//         ];
        
//         // Check if near fence
//         const nearFence = isNearFence(newPosition);
//         const newRisk = nearFence ? "high" : elephant.risk;
        
//         // Trigger alert API call if elephant newly enters high-risk zone
//         if (newRisk === "high" && elephant.risk !== "high") {
//           triggerAlert({
//             elephantId: `E-${elephant.id}`,
//             elephantName: elephant.name,
//             location: {
//               latitude: newPosition[0],
//               longitude: newPosition[1]
//             }
//           }, onAlertTriggered);
//         }
        
//         return {
//           ...elephant,
//           position: newPosition,
//           status: Math.random() > 0.7 ? "stationary" : "moving",
//           risk: newRisk,
//           lastUpdated: "Just now"
//         };
//       })
//     );
//   };
  
//   // Send alert to the Flask endpoint
//   const triggerAlert = async (alertData, callback) => {
//     try {
//       const response = await axios.post('http://127.0.0.1:5000/api/alertHandler', alertData, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       });
      
//       console.log("Alert triggered:", response.data);
//       if (callback) callback(alertData, response.data);
//     } catch (error) {
//       console.error("Failed to trigger alert:", error);
//       if (callback) callback(alertData, { success: false, message: "Failed to process alert", error: error.message });
//     }
//   };

//   useEffect(() => {
//     // Start simulation
//     intervalRef.current = setInterval(moveElephants, 3000); // Update every 3 seconds
    
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, []);
  
//   return null;
// }

// const OpenStreetMap = () => {
//   // Initial elephant data
//   const [elephants, setElephants] = useState([
//     {
//       id: 1,
//       name: "Herd A",
//       type: "Group",
//       count: 5,
//       status: "moving",
//       position: [10.9046, 76.9558], // [lat, lng]
//       risk: "low",
//       lastUpdated: "Just now",
//     },
//     {
//       id: 2,
//       name: "Bull 01",
//       type: "Individual",
//       count: 1,
//       status: "stationary",
//       position: [10.9700, 77.0300],
//       risk: "medium",
//       lastUpdated: "Just now",
//     },
//     {
//       id: 3,
//       name: "Herd B",
//       type: "Group",
//       count: 8,
//       status: "approaching",
//       position: [10.9046, 76.8558],
//       risk: "low",
//       lastUpdated: "Just now",
//     },
//   ]);
  
//   const [alerts, setAlerts] = useState([]);
  
//   // Handle new alert
//   const handleAlertTriggered = (alertData, response) => {
//     setAlerts(prev => [
//       {
//         id: Date.now(),
//         time: new Date().toLocaleTimeString(),
//         data: alertData,
//         response: response
//       },
//       ...prev.slice(0, 9) // Keep only the 10 most recent alerts
//     ]);
//   };

//   // Risk level color mapping
//   const getRiskColor = (risk) => {
//     switch (risk) {
//       case "high":
//         return "#ef4444"; // Red
//       case "medium":
//         return "#f97316"; // Orange
//       case "low":
//         return "#10b981"; // Green
//       default:
//         return "#6b7280"; // Gray
//     }
//   };
  
//   // Get elephants with high risk
//   const highRiskElephants = elephants.filter(e => e.risk === "high");

//   return (
//     <div className="flex flex-col space-y-4">
//       <div className="relative h-[600px] overflow-hidden rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card">
//         <MapContainer
//           center={[10.9046, 76.9558]}
//           zoom={12}
//           style={{ height: "100%", width: "100%" }}
//         >
//           <MapController 
//             elephants={elephants} 
//             setElephants={setElephants} 
//             onAlertTriggered={handleAlertTriggered}
//           />
          
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />

//           {/* Fence boundary visualization */}
//           <Polyline 
//             positions={fenceBoundary}
//             pathOptions={{ color: '#ff6b6b', weight: 3, dashArray: '5, 10' }}
//           />

//           {/* Elephant markers */}
//           {elephants.map((elephant) => (
//             <Marker
//               key={elephant.id}
//               position={elephant.position as L.LatLngExpression}
//               icon={elephant.risk === "high" ? alertIcon : elephantIcon}
//             >
//               <Popup>
//                 <div className="p-2">
//                   <h4 className="font-semibold text-base">{elephant.name}</h4>
//                   <div className="space-y-1 mt-2 text-sm">
//                     <p className="flex justify-between">
//                       <span className="text-elephant-600">Type:</span>
//                       <span className="font-medium">{elephant.type}</span>
//                     </p>
//                     <p className="flex justify-between">
//                       <span className="text-elephant-600">Count:</span>
//                       <span className="font-medium">{elephant.count}</span>
//                     </p>
//                     <p className="flex justify-between">
//                       <span className="text-elephant-600">Status:</span>
//                       <span className="font-medium capitalize">{elephant.status}</span>
//                     </p>
//                     <p className="flex justify-between">
//                       <span className="text-elephant-600">Risk:</span>
//                       <span
//                         className="font-medium"
//                         style={{ color: getRiskColor(elephant.risk) }}
//                       >
//                         {elephant.risk.charAt(0).toUpperCase() + elephant.risk.slice(1)}
//                       </span>
//                     </p>
//                     <p className="flex justify-between">
//                       <span className="text-elephant-600">Updated:</span>
//                       <span className="font-medium">{elephant.lastUpdated}</span>
//                     </p>
//                     <p className="flex justify-between">
//                       <span className="text-elephant-600">Position:</span>
//                       <span className="font-medium">
//                         {elephant.position[0].toFixed(4)}, {elephant.position[1].toFixed(4)}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </Popup>
//             </Marker>
//           ))}
//         </MapContainer>

//         {/* Map Legend Overlay */}
//         <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg px-4 py-3 z-[1000] shadow-md">
//           <h4 className="text-xs font-semibold mb-2 text-gray-700 dark:text-gray-200">Map Legend</h4>
//           <div className="flex flex-col space-y-1.5">
//             <div className="flex items-center space-x-2">
//               <div className="h-3 w-3 rounded-full bg-red-500"></div>
//               <span className="text-xs">High Risk</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="h-3 w-3 rounded-full bg-orange-500"></div>
//               <span className="text-xs">Medium Risk</span>
//             </div>
//             <div className="flex items-center space-x-2">
//               <div className="h-3 w-3 rounded-full bg-green-500"></div>
//               <span className="text-xs">Low Risk</span>
//             </div>
//             <div className="flex items-center space-x-2 mt-1">
//               <div className="h-1 w-6 bg-red-400 border-dashed border-red-500"></div>
//               <span className="text-xs">Fence Boundary</span>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Alert Log Panel */}
//       <div className="rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card p-4">
//         <div className="flex justify-between items-center mb-3">
//           <h3 className="font-semibold text-lg">Alert Log</h3>
//           <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
//             {highRiskElephants.length} High Risk Elephants
//           </div>
//         </div>
        
//         {alerts.length > 0 ? (
//           <div className="space-y-2 max-h-64 overflow-y-auto">
//             {alerts.map(alert => (
//               <div 
//                 key={alert.id} 
//                 className="p-3 bg-gray-50 dark:bg-gray-800 rounded border-l-4 border-red-500"
//               >
//                 <div className="flex justify-between text-sm mb-1">
//                   <span className="font-medium">{alert.data.elephantName}</span>
//                   <span className="text-gray-500">{alert.time}</span>
//                 </div>
//                 <p className="text-xs text-gray-600 dark:text-gray-400">
//                   ID: {alert.data.elephantId} | Location: {alert.data.location.latitude.toFixed(4)}, {alert.data.location.longitude.toFixed(4)}
//                 </p>
//                 <p className="text-xs mt-1">
//                   {alert.response.success ? (
//                     <span className="text-green-600">✓ Alert sent successfully</span>
//                   ) : (
//                     <span className="text-red-600">✗ Failed: {alert.response.message}</span>
//                   )}
//                 </p>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-6 text-sm text-gray-500">
//             No alerts triggered yet. Elephants will trigger alerts when approaching the fence boundary.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OpenStreetMap;




import React, { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from "react-leaflet";
import axios from "axios";

// Custom marker icons for elephants
const elephantIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/3065/3065702.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const alertIcon = new L.Icon({
  iconUrl: "https://cdn0.iconfinder.com/data/icons/danger-signs/512/elephant_danger_warning-512.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

// Updated fence boundary coordinates around the specified center point: 11.1016683,76.9646575
const fenceBoundary: [number, number][] = [
  [11.0916683, 76.9546575],
  [11.1116683, 76.9546575],
  [11.1116683, 76.9746575],
  [11.0916683, 76.9746575],
  [11.0916683, 76.9546575]
];

// Component to handle map reference and animations
function MapController({ elephants, setElephants, onAlertTriggered }) {
  const map = useMap();
  const intervalRef = useRef(null);
  const movementCountRef = useRef(0);
  
  // Check if a point is inside the fence polygon
  const isInsideFence = (position) => {
    // Ray casting algorithm to determine if point is inside polygon
    let inside = false;
    const x = position[1];
    const y = position[0];
    
    for (let i = 0, j = fenceBoundary.length - 1; i < fenceBoundary.length; j = i++) {
      const xi = fenceBoundary[i][1], yi = fenceBoundary[i][0];
      const xj = fenceBoundary[j][1], yj = fenceBoundary[j][0];
      
      const intersect = ((yi > y) !== (yj > y))
          && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    
    return inside;
  };

  // Simulate movement only for Bull 01 (id: 2) with more direct path to fence
  const moveElephants = () => {
    movementCountRef.current += 1;
    
    setElephants(prev =>
      prev.map(elephant => {
        // Only move Bull 01 (id: 2), keep others static
        if (elephant.id !== 2) {
          return {
            ...elephant,
            status: "stationary",
            lastUpdated: "Just now"
          };
        }
        
        // Enhanced movement logic for Bull 01 to reach fence within 1:10-1:20 minutes
        let [lat, lng] = elephant.position;
        
        // We want to reach the fence in about 15 movement steps (1:15 at 5 seconds per step)
        // Calculate center of fence for target
        const fenceCenter = [11.1016683, 76.9646575];
        
        // Calculate distance to fence
        const distToCenter = Math.sqrt(
          Math.pow(fenceCenter[0] - lat, 2) + 
          Math.pow(fenceCenter[1] - lng, 2)
        );
        
        // Increase speed factor to ensure we reach fence in time
        // Stronger movement toward fence with only slight random variation
        const speedFactor = 0.12; // Adjusted for faster movement
        const randomVariation = 0.002; // Reduced for more direct path
        
        // Move more directly toward fence center with reduced randomness
        lat += (fenceCenter[0] - lat) * speedFactor + (Math.random() - 0.5) * randomVariation;
        lng += (fenceCenter[1] - lng) * speedFactor + (Math.random() - 0.5) * randomVariation;
        
        const newPosition = [lat, lng];
        const nowInsideFence = isInsideFence(newPosition);
        const wasOutsideFence = !isInsideFence(elephant.position);
        const crossingIntoFence = wasOutsideFence && nowInsideFence;
        
        // Set risk based on position
        const newRisk = nowInsideFence ? "high" : "low";
        
        // Trigger alert when crossing into fence
        if (crossingIntoFence) {
          triggerAlert({
            elephantId: `E-${elephant.id}`,
            elephantName: elephant.name,
            location: { latitude: newPosition[0], longitude: newPosition[1] },
            alert_type: "boundary_crossing"
          }, onAlertTriggered);
        }
        
        return {
          ...elephant,
          position: newPosition,
          status: crossingIntoFence ? "crossing fence" : "moving",
          risk: newRisk,
          lastUpdated: "Just now",
          insideFence: nowInsideFence
        };
      })
    );
  };
  
  // Send alert to the Flask endpoint
  const triggerAlert = async (alertData, callback) => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/alertHandler', alertData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Alert triggered:", response.data);
      if (callback) callback(alertData, response.data);
    } catch (error) {
      console.error("Failed to trigger alert:", error);
      if (callback) callback(alertData, { success: false, message: "Failed to process alert", error: error.message });
    }
  };

  useEffect(() => {
    // Initialize elephant positions as outside or inside fence
    setElephants(prev => 
      prev.map(elephant => ({
        ...elephant,
        insideFence: isInsideFence(elephant.position),
        risk: isInsideFence(elephant.position) ? "high" : "low"
      }))
    );
    
    // Using 5-second intervals for movement
    intervalRef.current = setInterval(moveElephants, 5000); // Update every 5 seconds
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  return null;
}

const OpenStreetMap = () => {
  // Updated elephant data - removed Herd A, kept only Bull 01 and Herd B
  const [elephants, setElephants] = useState([
    {
      id: 2,
      name: "Bull 01",
      type: "Individual",
      count: 1,
      status: "moving",
      // Starting position adjusted to better reach fence within time limit
      position: [11.0916683, 76.9346575], 
      risk: "medium",
      lastUpdated: "Just now",
      insideFence: false
    },
    {
      id: 3,
      name: "Herd B",
      type: "Group",
      count: 8,
      status: "stationary",
      position: [11.0846, 76.9358],
      risk: "low",
      lastUpdated: "Just now",
      insideFence: false
    },
  ]);
  
  const [alerts, setAlerts] = useState([]);
  
  // Handle new alert
  const handleAlertTriggered = (alertData, response) => {
    setAlerts(prev => [
      {
        id: Date.now(),
        time: new Date().toLocaleTimeString(),
        data: alertData,
        response: response,
        type: alertData.alert_type || "general"
      },
      ...prev.slice(0, 9) // Keep only the 10 most recent alerts
    ]);
  };

  // Risk level color mapping
  const getRiskColor = (risk) => {
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
  
  // Get elephants with high risk (inside fence)
  const elephantsInsideFence = elephants.filter(e => e.insideFence);

  return (
    <div className="flex flex-col space-y-4">
      <div className="relative h-[500px] overflow-hidden rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card">
        <MapContainer
          center={[11.1016683, 76.9646575]} // Centering map on the new fence location
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <MapController 
            elephants={elephants} 
            setElephants={setElephants} 
            onAlertTriggered={handleAlertTriggered}
          />
          
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Fence boundary visualization */}
          <Polyline 
            positions={fenceBoundary}
            pathOptions={{ color: '#ff6b6b', weight: 3, dashArray: '5, 10' }}
          />

          {/* Elephant markers */}
          {elephants.map((elephant) => (
            <Marker
              key={elephant.id}
              position={elephant.position as L.LatLngExpression}
              icon={elephant.insideFence ? alertIcon : elephantIcon}
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
                      <span className="text-elephant-600">Location:</span>
                      <span className="font-medium">{elephant.insideFence ? "Inside Fence" : "Outside Fence"}</span>
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
                    <p className="flex justify-between">
                      <span className="text-elephant-600">Position:</span>
                      <span className="font-medium">
                        {elephant.position[0].toFixed(4)}, {elephant.position[1].toFixed(4)}
                      </span>
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Map Legend Overlay */}
        <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg px-4 py-3 z-[1000] shadow-md">
          <h4 className="text-xs font-semibold mb-2 text-gray-700 dark:text-gray-200">Map Legend</h4>
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-xs">Inside Fence (High Risk)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="text-xs">Outside Fence (Safe)</span>
            </div>
            <div className="flex items-center space-x-2 mt-1">
              <div className="h-1 w-6 bg-red-400 border-dashed border-red-500"></div>
              <span className="text-xs">Fence Boundary</span>
            </div>
          </div>
        </div>
      </div>
      
      
      {/* Alert Log Panel */}
      <div className="rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card p-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">Alert Log</h3>
          <div className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
            {elephantsInsideFence.length} Elephants Inside Fence
          </div>
        </div>
        
        {alerts.length > 0 ? (
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {alerts.map(alert => (
              <div 
                key={alert.id} 
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded border-l-4 border-red-500"
              >
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">
                    {alert.data.elephantName}
                    {alert.data.alert_type === "boundary_crossing" && 
                      <span className="text-red-600 ml-2 text-xs">FENCE CROSSING</span>
                    }
                  </span>
                  <span className="text-gray-500">{alert.time}</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  ID: {alert.data.elephantId} | Location: {alert.data.location.latitude.toFixed(4)}, {alert.data.location.longitude.toFixed(4)}
                </p>
                <p className="text-xs mt-1">
                  {alert.response.success ? (
                    <span className="text-green-600">✓ Alert sent successfully</span>
                  ) : (
                    <span className="text-red-600">✗ Failed: {alert.response.message}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-sm text-gray-500">
            No alerts triggered yet. Alerts will trigger when elephants cross into the fence boundary from outside.
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenStreetMap;


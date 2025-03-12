
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Info } from "lucide-react";

// Mock elephant data for demonstration
const elephantData = [
  {
    id: 1,
    name: "Herd A",
    type: "Group",
    count: 5,
    status: "moving",
    position: { top: "30%", left: "45%" },
    risk: "low",
    lastUpdated: "2 min ago",
  },
  {
    id: 2,
    name: "Bull 01",
    type: "Individual",
    count: 1,
    status: "stationary",
    position: { top: "65%", left: "55%" },
    risk: "medium",
    lastUpdated: "Just now",
  },
  {
    id: 3,
    name: "Herd B",
    type: "Group",
    count: 8,
    status: "approaching",
    position: { top: "45%", left: "25%" },
    risk: "high",
    lastUpdated: "5 min ago",
  },
];

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedElephant, setSelectedElephant] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMap(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden rounded-xl border border-elephant-200 dark:border-elephant-800 shadow-card">
      <AnimatePresence>
        {showMap ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/static/79.8083,11.6025,9,0/1200x600?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2oxa3FheGkwaDVlMnJxbXFpcmtlajdxIn0.4_kkV6lVrRUBZTQXUhxUYw')] bg-cover bg-center"
            ref={mapRef}
          >
            {/* Map overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20"></div>

            {/* Railway track overlay - simplified representation */}
            <div className="absolute top-[40%] left-0 right-0 h-1 bg-elephant-400/50 backdrop-blur-sm"></div>

            {/* Forest area overlays */}
            <div className="absolute top-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-nature-500/20 backdrop-blur-sm"></div>
            <div className="absolute bottom-[20%] right-[10%] w-[25%] h-[25%] rounded-full bg-nature-500/20 backdrop-blur-sm"></div>

            {/* Elephant markers */}
            {elephantData.map((elephant) => (
              <React.Fragment key={elephant.id}>
                <motion.div
                  className={`absolute cursor-pointer ${
                    elephant.risk === "high"
                      ? "map-marker-pulse"
                      : elephant.risk === "medium"
                      ? "animate-pulse-subtle"
                      : ""
                  }`}
                  style={{
                    top: elephant.position.top,
                    left: elephant.position.left,
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedElephant(elephant.id)}
                >
                  <div
                    className={`h-5 w-5 rounded-full flex items-center justify-center ${
                      elephant.risk === "high"
                        ? "bg-alert-500"
                        : elephant.risk === "medium"
                        ? "bg-warning-500"
                        : "bg-elephant-500"
                    }`}
                  >
                    {elephant.risk === "high" ? (
                      <AlertTriangle className="h-3 w-3 text-white" />
                    ) : (
                      <MapPin className="h-3 w-3 text-white" />
                    )}
                  </div>
                </motion.div>

                {/* Information popup for selected elephant */}
                <AnimatePresence>
                  {selectedElephant === elephant.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute glass-card rounded-lg px-4 py-3 z-10 w-60 text-sm shadow-lg"
                      style={{
                        top: `calc(${elephant.position.top} + 25px)`,
                        left: `calc(${elephant.position.left} - 110px)`,
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{elephant.name}</h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedElephant(null);
                          }}
                          className="text-elephant-500 hover:text-elephant-700"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="space-y-1">
                        <p className="flex justify-between">
                          <span className="text-elephant-600 dark:text-elephant-300">Type:</span>
                          <span className="font-medium">{elephant.type}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-elephant-600 dark:text-elephant-300">Count:</span>
                          <span className="font-medium">{elephant.count}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-elephant-600 dark:text-elephant-300">Status:</span>
                          <span className="font-medium capitalize">{elephant.status}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-elephant-600 dark:text-elephant-300">Risk:</span>
                          <span
                            className={`font-medium ${
                              elephant.risk === "high"
                                ? "text-alert-600"
                                : elephant.risk === "medium"
                                ? "text-warning-600"
                                : "text-success-600"
                            }`}
                          >
                            {elephant.risk.charAt(0).toUpperCase() + elephant.risk.slice(1)}
                          </span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-elephant-600 dark:text-elephant-300">Updated:</span>
                          <span className="font-medium">{elephant.lastUpdated}</span>
                        </p>
                      </div>
                      <button className="mt-3 text-xs flex items-center gap-1 text-elephant-500 hover:text-elephant-700">
                        <Info className="h-3 w-3" />
                        <span>View Details</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </React.Fragment>
            ))}

            {/* Map controls overlay */}
            <div className="absolute top-4 right-4 glass-card rounded-lg p-1.5 flex flex-col space-y-1.5">
              <button className="h-8 w-8 bg-white rounded flex items-center justify-center text-elephant-500 hover:bg-elephant-50">
                +
              </button>
              <div className="h-px w-full bg-elephant-200 dark:bg-elephant-700"></div>
              <button className="h-8 w-8 bg-white rounded flex items-center justify-center text-elephant-500 hover:bg-elephant-50">
                -
              </button>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 left-4 glass-card rounded-lg px-4 py-3">
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
          </motion.div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-elephant-50 dark:bg-elephant-900">
            <div className="animate-pulse-subtle">Loading map...</div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Map;

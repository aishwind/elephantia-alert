
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from "recharts";
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent";

// Sample activity data for a 24-hour period
const generateActivityData = (elephantData) => {
  const baselineActivity = elephantData.activity.dailyActiveHours / 24;
  
  // Generate 24 hours of simulated data
  return Array.from({ length: 24 }, (_, i) => {
    // More activity during morning and evening hours
    let activityLevel = baselineActivity;
    
    if (i >= 5 && i <= 10) {
      // Morning activity peak
      activityLevel = baselineActivity * (1.5 + Math.random() * 0.5);
    } else if (i >= 16 && i <= 20) {
      // Evening activity peak
      activityLevel = baselineActivity * (1.3 + Math.random() * 0.5);
    } else if (i >= 23 || i <= 4) {
      // Night resting
      activityLevel = baselineActivity * (0.3 + Math.random() * 0.3);
    }
    
    // Add alert indication if there was an alert
    const hasAlert = elephantData.alert && 
      new Date(elephantData.alert.timestamp).getHours() === i;
    
    return {
      hour: i,
      activity: activityLevel.toFixed(2),
      alert: hasAlert ? 1 : 0,
      heartRate: Math.floor(70 + (activityLevel * 10) + (Math.random() * 5)),
      temperature: (35.5 + (activityLevel * 0.5) + (Math.random() * 0.3)).toFixed(1)
    };
  });
};

// Custom tooltip formatter
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    // Type assertion to number to fix comparison issue
    const hour = Number(label);
    const period = hour < 12 ? 'AM' : 'PM';
    const displayHour = hour % 12 === 0 ? 12 : hour % 12;
    
    return (
      <div className="bg-white dark:bg-elephant-800 p-3 rounded shadow-md border border-elephant-200 dark:border-elephant-700">
        <p className="font-medium">{`${displayHour} ${period}`}</p>
        <p className="text-sm text-elephant-600 dark:text-elephant-300">
          <span className="font-medium">Activity:</span> {payload[0].value}
        </p>
        <p className="text-sm text-elephant-600 dark:text-elephant-300">
          <span className="font-medium">Heart Rate:</span> {payload[1].value} bpm
        </p>
        <p className="text-sm text-elephant-600 dark:text-elephant-300">
          <span className="font-medium">Temperature:</span> {payload[2].value}°C
        </p>
        {Number(payload[3].value) > 0 && (
          <p className="text-sm text-alert-600 dark:text-alert-300 font-medium">
            Alert triggered at this hour
          </p>
        )}
      </div>
    );
  }
  return null;
};

const ElephantActivityChart = ({ elephantData }) => {
  const activityData = generateActivityData(elephantData);
  
  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium">Activity Patterns</h3>
              <p className="text-sm text-elephant-500 dark:text-elephant-400">
                24-hour monitoring of {elephantData.name}'s activity levels
              </p>
            </div>
            <div className="flex items-center space-x-4 mt-2 lg:mt-0">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-elephant-500 rounded-full mr-1"></div>
                <span className="text-xs">Activity</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-1"></div>
                <span className="text-xs">Heart Rate</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
                <span className="text-xs">Temperature</span>
              </div>
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={activityData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="hour" 
                tickFormatter={(hour) => {
                  // Convert 24h format to 12h format with AM/PM
                  const period = hour < 12 ? 'AM' : 'PM';
                  const displayHour = hour % 12 === 0 ? 12 : hour % 12;
                  return `${displayHour}${period}`;
                }}
              />
              <YAxis yAxisId="left" orientation="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="activity" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={false}
                name="Activity Level"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="heartRate" 
                stroke="#F59E0B" 
                strokeWidth={2}
                dot={false}
                name="Heart Rate"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="temperature" 
                stroke="#3B82F6" 
                strokeWidth={2}
                dot={false}
                name="Temperature"
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="alert" 
                stroke="#EF4444" 
                strokeWidth={0}
                dot={(props) => {
                  const { cx, cy, payload } = props;
                  // Only render dot for alert points
                  if (payload.alert === 0) return null;
                  
                  return (
                    <svg x={cx - 10} y={cy - 10} width={20} height={20} fill="red" viewBox="0 0 20 20">
                      <circle cx="10" cy="10" r="6" stroke="#EF4444" strokeWidth="2" fill="#FEE2E2" />
                      <path
                        d="M10 6V10M10 14H10.01"
                        stroke="#EF4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  );
                }}
                name="Alert"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ElephantActivityChart;

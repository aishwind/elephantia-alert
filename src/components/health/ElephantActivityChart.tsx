
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from "recharts";

const ElephantActivityChart = ({ elephantData }) => {
  // Convert the activity data to a format suitable for the chart
  const chartData = elephantData.activity.hourlyData.map(item => ({
    time: item.hour,
    activityLevel: item.level,
    restPeriod: item.isResting ? 40 : 0, // Show rest periods as flat areas
  }));

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart 
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="time" 
            label={{ value: 'Hour of Day', position: 'insideBottomRight', offset: -10 }} 
          />
          <YAxis 
            label={{ value: 'Activity Level', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip 
            formatter={(value, name) => {
              if (name === "activityLevel") return [`${value}`, "Activity Level"];
              if (name === "restPeriod" && value > 0) return ["Resting", "State"];
              return [value, name];
            }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="activityLevel" 
            stackId="1"
            stroke="#10B981" 
            fill="#10B981" 
            fillOpacity={0.6} 
            name="Activity Level" 
          />
          <Area 
            type="monotone" 
            dataKey="restPeriod" 
            stackId="2"
            stroke="#6366F1" 
            fill="#6366F1" 
            fillOpacity={0.4} 
            name="Rest Period" 
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs text-elephant-500 dark:text-elephant-400">Daily Active Hours</p>
              <p className="text-2xl font-semibold">{elephantData.activity.dailyActiveHours}h</p>
              <p className="text-xs text-elephant-500 dark:text-elephant-400">
                {elephantData.activity.dailyActiveHours > 16 ? "Above" : "Within"} normal range
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs text-elephant-500 dark:text-elephant-400">Rest Periods</p>
              <p className="text-2xl font-semibold">{elephantData.activity.restPeriods} periods</p>
              <p className="text-xs text-elephant-500 dark:text-elephant-400">
                Average duration: {elephantData.activity.avgRestDuration}h
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-xs text-elephant-500 dark:text-elephant-400">Peak Activity Time</p>
              <p className="text-2xl font-semibold">{elephantData.activity.peakActivityTime}</p>
              <p className="text-xs text-elephant-500 dark:text-elephant-400">
                {elephantData.activity.isNormalPattern ? "Normal pattern" : "Abnormal pattern"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ElephantActivityChart;

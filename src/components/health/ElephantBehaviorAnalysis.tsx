
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CalendarDays, Activity, Utensils, Brain, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ElephantBehaviorAnalysis = ({ elephantData }) => {
  // Function to interpret behavior data
  const getBehaviorInterpretation = (elephantData) => {
    const { activity, vitals, behavior } = elephantData;
    
    // Analyze activity levels
    let activityStatus;
    if (activity.dailyActiveHours > 16) {
      activityStatus = { label: "Hyperactive", status: "warning" as const };
    } else if (activity.dailyActiveHours < 8) {
      activityStatus = { label: "Under-active", status: "warning" as const };
    } else {
      activityStatus = { label: "Normal", status: "success" as const };
    }
    
    // Analyze feeding patterns - add null checks
    let feedingStatus;
    if (!activity.feedingPattern) {
      feedingStatus = { label: "Unknown", status: "warning" as const };
    } else if (activity.feedingPattern.includes("irregular")) {
      feedingStatus = { label: "Irregular", status: "warning" as const };
    } else if (activity.feedingPattern.includes("reduced")) {
      feedingStatus = { label: "Reduced", status: "warning" as const };
    } else {
      feedingStatus = { label: "Normal", status: "success" as const };
    }
    
    // Analyze social interaction
    let socialStatus;
    if (behavior && behavior.socialInteraction === "isolated") {
      socialStatus = { label: "Isolated", status: "warning" as const };
    } else if (behavior && behavior.socialInteraction === "aggressive") {
      socialStatus = { label: "Aggressive", status: "alert" as const };
    } else {
      socialStatus = { label: "Normal", status: "success" as const };
    }
    
    // Analyze stress levels
    let stressStatus;
    if (behavior && behavior.stressIndicators === "high") {
      stressStatus = { label: "High", status: "alert" as const };
    } else if (behavior && behavior.stressIndicators === "moderate") {
      stressStatus = { label: "Moderate", status: "warning" as const };
    } else {
      stressStatus = { label: "Low", status: "success" as const };
    }
    
    return {
      activityStatus,
      feedingStatus,
      socialStatus,
      stressStatus
    };
  };
  
  const behaviorData = getBehaviorInterpretation(elephantData);
  
  // Sample data for weekly trends
  const weeklyTrends = [
    {
      day: "Mon",
      activity: "Normal",
      feeding: "Normal",
      social: "Normal",
      stress: "Low"
    },
    {
      day: "Tue",
      activity: "Increased",
      feeding: "Normal",
      social: "Normal",
      stress: "Low"
    },
    {
      day: "Wed",
      activity: "High",
      feeding: "Decreased",
      social: "Agitated",
      stress: "Moderate"
    },
    {
      day: "Thu",
      activity: "High",
      feeding: "Poor",
      social: "Isolated",
      stress: "High"
    },
    {
      day: "Fri",
      activity: behaviorData.activityStatus.label,
      feeding: behaviorData.feedingStatus.label,
      social: behaviorData.socialStatus.label,
      stress: behaviorData.stressStatus.label
    }
  ];
  
  // Generate recommendations based on behavior analysis
  const generateRecommendations = () => {
    const recommendations = [];
    
    if (behaviorData.activityStatus.status === "warning") {
      recommendations.push("Monitor activity levels closely");
    }
    
    if (behaviorData.feedingStatus.status === "warning") {
      recommendations.push("Assess food quality and availability");
    }
    
    if (behaviorData.socialStatus.status !== "success") {
      recommendations.push("Evaluate social environment and herd dynamics");
    }
    
    if (behaviorData.stressStatus.status !== "success") {
      recommendations.push("Identify and reduce stressors in the environment");
    }
    
    if (elephantData.alert) {
      recommendations.push("Immediate intervention required for alert condition");
    }
    
    return recommendations.length > 0 ? recommendations : ["Continue regular monitoring"];
  };
  
  const recommendations = generateRecommendations();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-elephant-500" />
            Behavior Assessment
          </CardTitle>
          <CardDescription>Current behavior indicators for {elephantData.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-elephant-100 dark:border-elephant-800">
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-2 text-elephant-500" />
                <span>Activity Level</span>
              </div>
              <Badge variant={behaviorData.activityStatus.status}>
                {behaviorData.activityStatus.label}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-elephant-100 dark:border-elephant-800">
              <div className="flex items-center">
                <Utensils className="h-4 w-4 mr-2 text-elephant-500" />
                <span>Feeding Pattern</span>
              </div>
              <Badge variant={behaviorData.feedingStatus.status}>
                {behaviorData.feedingStatus.label}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center pb-2 border-b border-elephant-100 dark:border-elephant-800">
              <div className="flex items-center">
                <svg className="h-4 w-4 mr-2 text-elephant-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <span>Social Interaction</span>
              </div>
              <Badge variant={behaviorData.socialStatus.status}>
                {behaviorData.socialStatus.label}
              </Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <AlertTriangle className="h-4 w-4 mr-2 text-elephant-500" />
                <span>Stress Indicators</span>
              </div>
              <Badge variant={behaviorData.stressStatus.status}>
                {behaviorData.stressStatus.label}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CalendarDays className="h-5 w-5 mr-2 text-elephant-500" />
            Weekly Trends
          </CardTitle>
          <CardDescription>Behavioral patterns over the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-elephant-500 dark:text-elephant-400">
                  <th className="font-medium pb-2">Day</th>
                  <th className="font-medium pb-2">Activity</th>
                  <th className="font-medium pb-2">Feeding</th>
                  <th className="font-medium pb-2">Social</th>
                  <th className="font-medium pb-2">Stress</th>
                </tr>
              </thead>
              <tbody>
                {weeklyTrends.map((day, index) => (
                  <tr key={index} className={index === weeklyTrends.length - 1 ? "font-medium" : ""}>
                    <td className="py-1.5">{day.day}</td>
                    <td className="py-1.5">{day.activity}</td>
                    <td className="py-1.5">{day.feeding}</td>
                    <td className="py-1.5">{day.social}</td>
                    <td className="py-1.5">{day.stress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Behavior Recommendations</CardTitle>
          <CardDescription>Suggested actions based on behavior analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <div className="mr-2 mt-0.5 p-1 bg-elephant-100 dark:bg-elephant-800 rounded-full">
                  <svg className="h-3 w-3 text-elephant-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default ElephantBehaviorAnalysis;

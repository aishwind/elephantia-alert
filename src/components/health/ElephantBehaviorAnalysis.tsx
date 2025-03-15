
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, AlertTriangle, Check, Lightbulb } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const ElephantBehaviorAnalysis = ({ elephantData }) => {
  const { behavior } = elephantData;
  
  // Interpret behavior score
  const getBehaviorInterpretation = (score) => {
    if (score < 30) return { status: "Abnormal", color: "destructive" as const };
    if (score < 70) return { status: "Attention Required", color: "warning" as const };
    return { status: "Normal", color: "success" as const };
  };
  
  const scoreInterpretation = getBehaviorInterpretation(behavior.normalityScore);
  
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center">
            <Brain className="h-5 w-5 mr-2 text-elephant-500" />
            Behavior Analysis
          </CardTitle>
          <CardDescription>
            AI-powered analysis of behavior patterns for {elephantData.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <h3 className="text-sm font-medium">Normality Score</h3>
                <Badge variant={scoreInterpretation.color}>
                  {scoreInterpretation.status}
                </Badge>
              </div>
              <Progress value={behavior.normalityScore} className="h-2" />
              <p className="text-xs text-elephant-500 dark:text-elephant-400 mt-1">
                Score: {behavior.normalityScore}/100
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Behavior Indicators</h3>
                <ul className="space-y-2">
                  {behavior.indicators.map((indicator, index) => (
                    <li key={index} className="flex items-start">
                      {indicator.isNormal ? (
                        <Check className="h-4 w-4 mr-2 text-success-500 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 mr-2 text-warning-500 mt-0.5" />
                      )}
                      <div>
                        <p className="text-sm">{indicator.name}</p>
                        <p className="text-xs text-elephant-500 dark:text-elephant-400">
                          {indicator.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Recommendations</h3>
                <ul className="space-y-2">
                  {behavior.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start">
                      <Lightbulb className="h-4 w-4 mr-2 text-amber-500 mt-0.5" />
                      <p className="text-sm">{rec}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Anomaly Detection</CardTitle>
          <CardDescription>
            Unusual behavior patterns detected in the past 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          {behavior.anomalies.length > 0 ? (
            <ul className="space-y-4">
              {behavior.anomalies.map((anomaly, index) => (
                <li key={index} className="p-3 bg-elephant-100 dark:bg-elephant-800/30 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <AlertTriangle className={`h-5 w-5 mr-2 text-${anomaly.severity === 'high' ? 'alert' : anomaly.severity === 'medium' ? 'amber' : 'warning'}-500`} />
                      <div>
                        <h4 className="font-medium">{anomaly.title}</h4>
                        <p className="text-sm text-elephant-600 dark:text-elephant-400">
                          {anomaly.date} • {anomaly.time}
                        </p>
                      </div>
                    </div>
                    <Badge variant={anomaly.severity === 'high' ? 'destructive' : anomaly.severity === 'medium' ? 'warning' : 'outline'}>
                      {anomaly.severity} severity
                    </Badge>
                  </div>
                  <p className="text-sm mt-2">{anomaly.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-6">
              <Check className="h-8 w-8 mx-auto mb-2 text-success-500" />
              <p>No anomalies detected in the past 30 days</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ElephantBehaviorAnalysis;

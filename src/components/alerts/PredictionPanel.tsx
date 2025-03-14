
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertTriangle, Train, RefreshCw } from "lucide-react";
import { useElephantPrediction } from '@/hooks/useElephantPrediction';

interface PredictionPanelProps {
  className?: string;
}

const PredictionPanel: React.FC<PredictionPanelProps> = ({ className }) => {
  const { 
    isLoading, 
    predictionZones, 
    recommendations, 
    explanation, 
    generatePredictions 
  } = useElephantPrediction();

  // Generate predictions on component mount
  React.useEffect(() => {
    generatePredictions();
  }, []);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-display">AI Prediction</CardTitle>
            <CardDescription>
              Gemini AI predicted elephant movements and risk zones
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            disabled={isLoading}
            onClick={() => generatePredictions()}
            className="flex items-center gap-1"
          >
            {isLoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <RefreshCw className="h-3 w-3" />
            )}
            <span>{isLoading ? "Predicting..." : "Refresh"}</span>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-elephant-500 animate-spin mb-4" />
            <p className="text-sm text-elephant-600 dark:text-elephant-300">
              Analyzing historical data and generating predictions...
            </p>
          </div>
        ) : (
          <>
            {/* Risk Zones Summary */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Risk Zones ({predictionZones.length})</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {predictionZones.slice(0, 4).map((zone) => (
                  <div key={zone.id} className="border rounded-lg p-3 text-xs">
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        variant="outline"
                        className={
                          zone.riskLevel === 'critical'
                            ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                            : zone.riskLevel === 'high'
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                            : zone.riskLevel === 'medium'
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                            : "bg-elephant-100 text-elephant-800 dark:bg-elephant-900/30 dark:text-elephant-300"
                        }
                      >
                        {zone.riskLevel} risk
                      </Badge>
                      <span className="text-elephant-500 text-xs">{Math.round(zone.confidence * 100)}%</span>
                    </div>
                    <p className="text-xs mb-1">
                      Radius: {zone.radius}km
                      {zone.elephantCount && ` • ${zone.elephantCount} elephants`}
                    </p>
                    <p className="text-xs text-elephant-600 dark:text-elephant-300 truncate">
                      {zone.details || "No additional details"}
                    </p>
                  </div>
                ))}
              </div>
              
              {predictionZones.length > 4 && (
                <p className="text-xs text-elephant-500 text-center">
                  +{predictionZones.length - 4} more zones
                </p>
              )}
            </div>
            
            {/* Recommendations */}
            {recommendations && (
              <div className="space-y-2">
                <h3 className="text-sm font-medium flex items-center">
                  <Train className="h-4 w-4 mr-1.5 text-elephant-500" />
                  Train Operator Recommendations
                </h3>
                <div className="bg-elephant-50 dark:bg-elephant-900/30 text-elephant-800 dark:text-elephant-200 p-3 rounded-lg text-xs">
                  {recommendations}
                </div>
              </div>
            )}
            
            {/* Explanation */}
            {explanation && (
              <div className="space-y-1">
                <h3 className="text-sm font-medium flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1.5 text-elephant-500" />
                  Prediction Explanation
                </h3>
                <p className="text-xs text-elephant-600 dark:text-elephant-300">
                  {explanation}
                </p>
              </div>
            )}
            
            <div className="flex justify-between mt-4">
              <Button variant="outline" size="sm" className="text-xs">
                View Full Analysis
              </Button>
              <Button size="sm" className="text-xs">
                Send Alerts
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default PredictionPanel;

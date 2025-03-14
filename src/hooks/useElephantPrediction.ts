
import { useState } from 'react';
import { ElephantIncident, PredictionZone, TrainSchedule } from '@/types/elephant';
import { predictElephantMovement, getPossibleElephantLocations } from '@/utils/elephantPrediction';
import { initialElephantIncidents, mockTrainSchedules } from '@/utils/elephantData';
import { useToast } from '@/components/ui/use-toast';

export function useElephantPrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionZones, setPredictionZones] = useState<PredictionZone[]>([]);
  const [recommendations, setRecommendations] = useState<string>('');
  const [explanation, setExplanation] = useState<string>('');
  const [possibleLocations, setPossibleLocations] = useState<Array<{lat: number, lng: number}>>([]);
  const { toast } = useToast();

  const generatePredictions = async (
    currentLocation: { lat: number; lng: number } = { lat: 10.9129, lng: 76.9416 } // Default to Madukkarai
  ) => {
    setIsLoading(true);
    try {
      // In a production app, these would come from Supabase
      const incidents: ElephantIncident[] = initialElephantIncidents;
      const trainSchedules: TrainSchedule[] = mockTrainSchedules;
      
      // Calculate possible elephant locations based on historical data
      const locations = getPossibleElephantLocations(incidents);
      setPossibleLocations(locations);
      
      // Get AI predictions
      const prediction = await predictElephantMovement(
        incidents,
        trainSchedules,
        currentLocation
      );
      
      setPredictionZones(prediction.predictionZones);
      setRecommendations(prediction.recommendations);
      setExplanation(prediction.explanation);
      
      toast({
        title: "Prediction Generated",
        description: "Elephant movement prediction has been generated successfully.",
      });
    } catch (error) {
      console.error("Error generating predictions:", error);
      toast({
        title: "Prediction Failed",
        description: "Failed to generate elephant movement prediction.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    predictionZones,
    recommendations,
    explanation,
    possibleLocations,
    generatePredictions
  };
}

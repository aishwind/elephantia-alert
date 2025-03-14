
import { ChatGeminiAI, ChatMessage, ELLI_SYSTEM_PROMPT } from "@/utils/geminiApi";
import { ElephantIncident, PredictionZone, TrainSchedule } from "@/types/elephant";

// System prompt specifically for elephant movement prediction
const PREDICTION_SYSTEM_PROMPT = `
You are an AI assistant specialized in predicting elephant movements and identifying potential conflict zones with trains.
You have been trained on historical elephant movement patterns, incident data, and geographical information about railways in India.

Your task is to analyze:
1. Historical elephant incidents, especially those involving train accidents
2. Current season and weather conditions
3. Known elephant corridors and habitats
4. Train schedules and routes
5. Time of day and elephant activity patterns

Based on this information, predict:
- High-risk zones where elephants might cross railway tracks
- Potential time windows when such crossings might occur
- Recommended speed reductions or special precautions for trains
- Confidence level of the prediction

Format your response as structured JSON with the following fields:
- predictionZones: array of prediction zones with location, radius, risk level, and confidence
- recommendations: specific actions for train operators
- explanation: brief explanation of the reasoning behind the prediction
`;

// Instance of Gemini AI for elephant prediction
const predictionAI = new ChatGeminiAI({
  temperature: 0.3, // Lower temperature for more deterministic responses
  maxOutputTokens: 1200,
});

/**
 * Function to predict elephant movement and potential conflict zones
 */
export async function predictElephantMovement(
  historicalIncidents: ElephantIncident[],
  trainSchedules: TrainSchedule[],
  currentLocation: { lat: number; lng: number }
): Promise<{
  predictionZones: PredictionZone[];
  recommendations: string;
  explanation: string;
}> {
  try {
    // Prepare the data to send to the AI
    const trainData = trainSchedules.map(train => ({
      trainNumber: train.trainNumber,
      route: train.route,
      departureTime: train.departureTime,
      arrivalTime: train.arrivalTime,
      currentLocation: train.currentLocation,
      speed: train.speed,
    }));

    const incidentData = historicalIncidents.map(incident => ({
      idNo: incident.idNo,
      detectionDate: incident.detectionDate,
      circle: incident.circle,
      division: incident.division,
      range: incident.range,
      gender: incident.gender,
      category: incident.category,
      subCategory: incident.subCategory,
      age: incident.age,
    }));

    // Current date and time information
    const now = new Date();
    const timeInfo = {
      date: now.toISOString().split('T')[0],
      time: now.toISOString().split('T')[1].split('.')[0],
      season: getSeason(now.getMonth()),
      isDaytime: isDaytime(now.getHours()),
    };

    // Create prompt with all relevant information
    const userPrompt = `
      Based on the following information, predict potential elephant movement and identify high-risk zones:
      
      Current location: ${JSON.stringify(currentLocation)}
      Current time information: ${JSON.stringify(timeInfo)}
      
      Historical elephant incidents: ${JSON.stringify(incidentData)}
      
      Train schedules: ${JSON.stringify(trainData)}
      
      Please identify high-risk zones within 30km of approaching trains, and provide recommendations for train operators.
    `;

    // Messages for the AI
    const messages: ChatMessage[] = [
      { role: "system", content: PREDICTION_SYSTEM_PROMPT },
      { role: "user", content: userPrompt }
    ];

    // Call the Gemini API
    console.log("Calling Gemini API for elephant movement prediction...");
    const responseText = await predictionAI.invoke(messages);
    console.log("Received response from Gemini API:", responseText);

    // Parse the AI response
    let parsedResponse;
    try {
      // First look for JSON in the response
      const jsonMatch = responseText.match(/```json([\s\S]*?)```/) || 
                        responseText.match(/{[\s\S]*}/);
      
      const jsonString = jsonMatch 
        ? jsonMatch[1] ? jsonMatch[1].trim() : jsonMatch[0].trim()
        : responseText;
      
      parsedResponse = JSON.parse(jsonString);
    } catch (error) {
      console.error("Failed to parse AI response as JSON:", error);
      // Fallback response if parsing fails
      return {
        predictionZones: [],
        recommendations: "Unable to generate recommendations at this time.",
        explanation: "Analysis system encountered an error processing the data.",
      };
    }

    // Transform and validate the AI response
    const predictionZones = Array.isArray(parsedResponse.predictionZones) 
      ? parsedResponse.predictionZones.map((zone: any, index: number) => ({
          id: `pred-${Date.now()}-${index}`,
          location: zone.location || { lat: currentLocation.lat, lng: currentLocation.lng },
          radius: zone.radius || 5,
          riskLevel: zone.riskLevel || 'medium',
          predictedTime: zone.predictedTime || new Date().toISOString(),
          confidence: zone.confidence || 0.7,
          elephantCount: zone.elephantCount,
          details: zone.details,
          createdAt: new Date().toISOString(),
        }))
      : [];

    return {
      predictionZones,
      recommendations: parsedResponse.recommendations || "No specific recommendations available.",
      explanation: parsedResponse.explanation || "No detailed explanation provided.",
    };
  } catch (error) {
    console.error("Error in elephant movement prediction:", error);
    throw new Error("Failed to predict elephant movement patterns.");
  }
}

// Helper function to determine the season based on month
function getSeason(month: number): string {
  if (month >= 2 && month <= 5) return "Summer";
  if (month >= 6 && month <= 9) return "Monsoon";
  return "Winter";
}

// Helper function to determine if it's daytime
function isDaytime(hour: number): boolean {
  return hour >= 6 && hour <= 18;
}

// Mock function to get possible elephant locations based on historical data
export function getPossibleElephantLocations(incidents: ElephantIncident[]): Array<{lat: number, lng: number}> {
  // This would be replaced with actual algorithms in production
  // For now, returning some mock locations based on the Madukkarai region
  const baseCoordinates = {
    "Madukkarai": { lat: 10.9129, lng: 76.9416 },
    "Rayakotta": { lat: 12.5124, lng: 77.7296 },
    "Hosur": { lat: 12.7409, lng: 77.8253 },
    "Coimbatore": { lat: 11.0168, lng: 76.9558 },
    "Dharmapuri": { lat: 12.1289, lng: 78.1578 }
  };
  
  // Count incidents by region to weight the locations
  const regionCounts: {[key: string]: number} = {};
  incidents.forEach(incident => {
    const key = incident.range;
    regionCounts[key] = (regionCounts[key] || 0) + 1;
  });
  
  // Generate locations with some randomness based on historical data
  return Object.entries(baseCoordinates).flatMap(([region, coord]) => {
    const count = regionCounts[region] || 1;
    return Array(count).fill(0).map(() => ({
      lat: coord.lat + (Math.random() - 0.5) * 0.05,
      lng: coord.lng + (Math.random() - 0.5) * 0.05
    }));
  });
}

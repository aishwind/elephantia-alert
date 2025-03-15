
import { ChatGeminiAI, ChatMessage } from "@/utils/geminiApi";

// Initialize Gemini AI client for report generation
const reportAI = new ChatGeminiAI({
  temperature: 0.3, // Lower temperature for more factual/consistent reports
  maxOutputTokens: 1000
});

// System prompt for health report generation
const REPORT_SYSTEM_PROMPT = `
You are an expert wildlife veterinarian and elephant health specialist. 
Generate a detailed, professional health report for the elephant described in the data provided.
Your report should include:
1. A comprehensive health assessment
2. Analysis of vital signs and indicators
3. Behavior patterns and welfare assessment
4. Recommendations for care and monitoring
5. Risk assessment for common elephant health issues

Format the report professionally with headings, bullet points, and clear sections.
Keep your tone scientific but accessible to wildlife management professionals.
`;

export interface ReportOptions {
  includeHealth: boolean;
  includeActivity: boolean;
  includeBehavior: boolean;
  includeLocation: boolean;
  includeRecommendations: boolean;
}

/**
 * Generates a health report for an elephant using Gemini AI
 */
export async function generateElephantHealthReport(elephantData: any, options: ReportOptions): Promise<string> {
  try {
    // Create a formatted description of the elephant data for the AI
    const elephantDescription = `
# Elephant Data for Health Report
- ID: ${elephantData.id}
- Name: ${elephantData.name}
- Age: ${elephantData.age} years
- Gender: ${elephantData.gender}
- Current Location: ${elephantData.location.coordinates.lat.toFixed(4)}, ${elephantData.location.coordinates.lng.toFixed(4)}
- Current Activity: ${elephantData.activity.currentState}

## Vital Statistics:
- Heart Rate: ${elephantData.vitals.heartRate} bpm
- Temperature: ${elephantData.vitals.temperature}°C
- Daily Active Hours: ${elephantData.activity.dailyActiveHours} hours
- Feeding Patterns: ${elephantData.activity.feedingPattern}
- Behavior Anomalies: ${elephantData.behavior?.anomalies || "None detected"}

${elephantData.alert ? 
`## Alert Information:
- Alert Type: ${elephantData.alert.type}
- Alert Description: ${elephantData.alert.description}
- Alert Timestamp: ${elephantData.alert.timestamp}
- Alert Location: ${elephantData.alert.location}` 
: "No active alerts for this elephant."}

## Report Options Selected:
${options.includeHealth ? "- Include health assessment" : ""}
${options.includeActivity ? "- Include activity patterns" : ""}
${options.includeBehavior ? "- Include behavior analysis" : ""}
${options.includeLocation ? "- Include location history" : ""}
${options.includeRecommendations ? "- Include recommendations" : ""}
`;

    // Create messages for the AI request
    const messages: ChatMessage[] = [
      { role: "system", content: REPORT_SYSTEM_PROMPT },
      { role: "user", content: `Generate a health report for this elephant:\n${elephantDescription}` }
    ];

    // Request the report from Gemini
    console.log("Requesting health report from Gemini AI...");
    const report = await reportAI.invoke(messages);
    
    // Return the generated report
    return report;
  } catch (error) {
    console.error("Error generating elephant health report:", error);
    return "Failed to generate health report. Please try again later.";
  }
}

/**
 * Creates a downloadable PDF from the report text
 */
export function createDownloadableReport(reportText: string, elephantName: string): string {
  // Create a Blob containing the report text
  const blob = new Blob([reportText], { type: 'text/plain' });
  
  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);
  
  return url;
}

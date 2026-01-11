import { GoogleGenAI } from "@google/genai";
import { ServiceData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeDashboardData = async (services: ServiceData[]): Promise<string> => {
  try {
    // Simplify data for the prompt to save tokens and focus on key metrics
    const summary = services.map(s => ({
      service: s.name,
      totalCost: s.totalCostMonth.toFixed(2),
      totalRequests: s.totalRequestsMonth,
      status: s.status,
      last7DaysCost: s.dailyHistory.slice(-7).reduce((acc, day) => acc + day.cost, 0).toFixed(2)
    }));

    const prompt = `
      You are a Senior DevOps and FinOps dashboard analyst. 
      Analyze the following API consumption data for an Android App backend.
      
      Data:
      ${JSON.stringify(summary, null, 2)}
      
      Provide a concise executive summary in markdown format with:
      1. A "Cost Efficiency" rating (1-10) with a brief explanation.
      2. Identify the biggest cost driver.
      3. One specific actionable recommendation to optimize costs or performance.
      4. Note any service status issues (like degraded performance).
      
      Keep it professional, short, and visually scannable.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "No analysis generated.";
  } catch (error) {
    console.error("Gemini Analysis Failed:", error);
    return "Unable to generate AI insights at this time. Please check your API Key configuration.";
  }
};

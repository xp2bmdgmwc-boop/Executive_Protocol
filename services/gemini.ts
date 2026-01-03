import { GoogleGenAI, Type } from "@google/genai";

export interface VisualStrategyResponse {
  title: string;
  advice: string;
  suggestedStyle: string;
  accessories: string[];
}

export class GeminiService {
  async getVisualStrategy(executiveRole: string, personalValues: string): Promise<VisualStrategyResponse> {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Сформируй премиальную визуальную стратегию для роли: ${executiveRole}. Ценности: ${personalValues}. Стиль: Quiet Luxury. Язык: Русский.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            advice: { type: Type.STRING },
            suggestedStyle: { type: Type.STRING },
            accessories: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["title", "advice", "suggestedStyle", "accessories"]
        }
      }
    });

    const text = response.text || '{}';
    try {
      return JSON.parse(text) as VisualStrategyResponse;
    } catch (e) {
      console.error("AI Strategy Parse Error", e);
      throw new Error("Ошибка обработки данных ИИ");
    }
  }
}

export const geminiService = new GeminiService();
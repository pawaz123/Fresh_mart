import { GoogleGenAI } from "@google/genai";

// Accessing the API key from the environment variables
const apiKey = process.env.API_KEY || '';

// Initialize the Google GenAI client
const ai = new GoogleGenAI({ apiKey });

export const getRecipeSuggestion = async (ingredients: string[]): Promise<string> => {
  if (!apiKey) {
    return "AI features are disabled (Missing API Key). Try making a simple salad!";
  }

  try {
    const prompt = `I have the following ingredients: ${ingredients.join(', ')}. 
    Suggest a simple, delicious recipe I can make with these (and common pantry staples like salt, oil, spices). 
    Keep the response concise, under 200 words, formatted as a markdown list of steps.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text || "Could not generate a recipe at this time.";
  } catch (error) {
    console.error("Error generating recipe:", error);
    return "Sorry, I couldn't cook up a recipe right now. Please try again later.";
  }
};

export const getProductCookingTip = async (productName: string): Promise<string> => {
    if (!apiKey) return "Great choice for your kitchen!";
    
    try {
        const prompt = `Give me one quick, unique 1-sentence cooking tip or usage idea for ${productName}.`;
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text || "Fresh and healthy!";
    } catch (e) {
        return "Fresh and healthy!";
    }
}

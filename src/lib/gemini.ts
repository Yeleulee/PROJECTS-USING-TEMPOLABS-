const GEMINI_API_KEY = "AIzaSyCO1sG2PyjHykUkHl3hY9HL8_wXyXiVRMI";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export interface GeminiResponse {
  text: string;
}

export async function generateGeminiResponse(
  prompt: string,
): Promise<GeminiResponse> {
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get response from Gemini");
    }

    const data = await response.json();
    return {
      text: data.candidates[0].content.parts[0].text,
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

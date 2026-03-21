import { APP_CONFIG } from '../../config/appConfig';

export async function generateGeminiReply(prompt) {
  const apiKey = APP_CONFIG.gemini.apiKey;
  const normalizedPrompt = prompt?.trim();

  if (!apiKey) {
    return 'AI is not configured yet. Add EXPO_PUBLIC_GEMINI_API_KEY to your environment.';
  }

  if (!normalizedPrompt) {
    return 'Please enter a message before asking AbleAssist.';
  }

  const response = await fetch(
    `${APP_CONFIG.gemini.endpoint}/${APP_CONFIG.gemini.model}:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: normalizedPrompt }] }],
      }),
    }
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

  return aiResponse || "Sorry, I didn't get that.";
}

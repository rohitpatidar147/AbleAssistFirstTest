export const APP_ROUTES = {
  onboarding: 'Onboarding',
  home: 'Home',
  textToSpeech: 'TextToSpeech',
  speechToText: 'SpeechToText',
  chatBot: 'ChatBotScreen',
};

export const APP_CONFIG = {
  requestTimeoutMs: Math.max(
    Number(process.env.EXPO_PUBLIC_REQUEST_TIMEOUT_MS) || 30000,
    1000
  ),
  gemini: {
    apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY || '',
    model: process.env.EXPO_PUBLIC_GEMINI_MODEL || 'gemini-2.0-flash',
    endpoint:
      process.env.EXPO_PUBLIC_GEMINI_ENDPOINT ||
      'https://generativelanguage.googleapis.com/v1beta/models',
  },
  assemblyAi: {
    apiKey: process.env.EXPO_PUBLIC_ASSEMBLYAI_API_KEY || '',
    endpoint: process.env.EXPO_PUBLIC_ASSEMBLYAI_ENDPOINT || 'https://api.assemblyai.com/v2',
  },
  googleVision: {
    apiKey: process.env.EXPO_PUBLIC_GOOGLE_VISION_API_KEY || '',
    endpoint:
      process.env.EXPO_PUBLIC_GOOGLE_VISION_ENDPOINT ||
      'https://vision.googleapis.com/v1/images:annotate',
  },
};

export const ONBOARDING_SCREENS = [
  { key: '1', name: 'ScreenOne' },
  { key: '2', name: 'ScreenTwo' },
  { key: '3', name: 'ScreenThree' },
  { key: '4', name: 'ScreenFour' },
];

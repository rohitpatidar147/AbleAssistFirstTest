export const APP_ROUTES = {
  onboarding: 'Onboarding',
  home: 'Home',
  textToSpeech: 'TextToSpeech',
  speechToText: 'SpeechToText',
  chatBot: 'ChatBotScreen',
};

export const APP_CONFIG = {
  gemini: {
    apiKey: process.env.EXPO_PUBLIC_GEMINI_API_KEY || '',
    model: 'gemini-2.0-flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models',
  },
  assemblyAi: {
    apiKey: process.env.EXPO_PUBLIC_ASSEMBLYAI_API_KEY || 'b390a84613614ec89c0e14a40d0bcc6e',
    endpoint: 'https://api.assemblyai.com/v2',
  },
  googleVision: {
    apiKey: process.env.EXPO_PUBLIC_GOOGLE_VISION_API_KEY || '',
    endpoint: 'https://vision.googleapis.com/v1/images:annotate',
  },
};

export const ONBOARDING_SCREENS = [
  { key: '1', name: 'ScreenOne' },
  { key: '2', name: 'ScreenTwo' },
  { key: '3', name: 'ScreenThree' },
  { key: '4', name: 'ScreenFour' },
];

import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { APP_CONFIG } from '../config/appConfig';

export async function extractTextFromImage(imageUri) {
  const { apiKey, endpoint } = APP_CONFIG.googleVision;

  if (!apiKey) {
    throw new Error('Google Vision API key is not configured. Please set EXPO_PUBLIC_GOOGLE_VISION_API_KEY.');
  }

  const base64Image = await FileSystem.readAsStringAsync(imageUri, {
    encoding: 'base64',
  });

  const requestData = {
    requests: [
      {
        image: { content: base64Image },
        features: [{ type: 'TEXT_DETECTION' }],
      },
    ],
  };

  const response = await axios.post(`${endpoint}?key=${apiKey}`, requestData);
  const textAnnotations = response.data?.responses?.[0]?.textAnnotations;

  if (textAnnotations && textAnnotations.length > 0) {
    return textAnnotations[0].description;
  }

  return 'No text found.';
}

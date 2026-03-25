import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { Buffer } from 'buffer';
import { APP_CONFIG } from '../../core/appConfig';

global.Buffer = global.Buffer || Buffer;

export async function transcribeAudioFile(uri) {
  const { apiKey, endpoint } = APP_CONFIG.assemblyAi;

  if (!apiKey) {
    throw new Error('AssemblyAI is not configured. Please set EXPO_PUBLIC_ASSEMBLYAI_API_KEY.');
  }

  const audioFile = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const uploadResponse = await axios.post(
    `${endpoint}/upload`,
    Buffer.from(audioFile, 'base64'),
    {
      headers: {
        authorization: apiKey,
        'content-type': 'application/octet-stream',
      },
      timeout: APP_CONFIG.requestTimeoutMs,
    }
  );

  const audioUrl = uploadResponse.data?.upload_url;
  if (!audioUrl) {
    throw new Error('Failed to obtain audio upload URL from AssemblyAI.');
  }

  const transcriptResponse = await axios.post(
    `${endpoint}/transcript`,
    { audio_url: audioUrl },
    {
      headers: {
        authorization: apiKey,
        'content-type': 'application/json',
      },
      timeout: APP_CONFIG.requestTimeoutMs,
    }
  );

  const transcriptId = transcriptResponse.data?.id;
  if (!transcriptId) {
    throw new Error('Failed to initiate transcription task with AssemblyAI.');
  }

  let completed = false;
  let pollAttempts = 0;
  let transcript = '';

  while (!completed && pollAttempts < APP_CONFIG.transcriptionMaxPollAttempts) {
    pollAttempts += 1;
    const pollingResponse = await axios.get(`${endpoint}/transcript/${transcriptId}`, {
      headers: {
        authorization: apiKey,
      },
      timeout: APP_CONFIG.requestTimeoutMs,
    });

    const status = pollingResponse.data?.status;

    if (status === 'completed') {
      transcript = pollingResponse.data?.text || '';
      completed = true;
    } else if (status === 'error') {
      throw new Error(pollingResponse.data?.error || 'Transcription encountered an error.');
    } else {
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }
  }

  if (!completed) {
    throw new Error('Transcription timed out while waiting for AssemblyAI.');
  }

  return transcript;
}

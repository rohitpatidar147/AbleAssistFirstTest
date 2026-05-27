import * as Speech from 'expo-speech';

export function speakText(text, options = {}) {
  const { language = 'en', rate = 1, pitch = 1, onStart, onDone, onError } = options;

  Speech.speak(text, {
    language,
    rate,
    pitch,
    onStart,
    onDone,
    onError: (err) => {
      console.error('Speech synthesis error:', err);
      onError?.(err);
    },
  });
}

export function pauseSpeech() {
  Speech.pause();
}

export function resumeSpeech() {
  Speech.resume();
}

export function stopSpeech() {
  Speech.stop();
}

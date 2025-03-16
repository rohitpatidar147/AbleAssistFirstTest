import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Voice from '@react-native-voice/voice';

export default function SpeechToTextScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');

  useEffect(() => {
    // Set up event listeners for voice recognition
    Voice.onSpeechStart = () => setIsRecording(true);
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechResults = (event) => {
      if (event.value && event.value.length > 0) {
        setTranscription(event.value[0]); // Take the first recognized phrase
      }
    };
    Voice.onSpeechError = (error) => {
      console.error('Speech recognition error:', error);
      setIsRecording(false);
    };

    return () => {
      // Cleanup listeners when component unmounts
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // Function to start voice recognition
  const startRecording = async () => {
    try {
      await Voice.start('en-US'); // Start recording with English language
      setIsRecording(true);
      setTranscription('');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  // Function to stop voice recognition
  const stopRecording = async () => {
    try {
      await Voice.stop();
      setIsRecording(false);
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Speech-to-Text</Text>

      {isRecording ? (
        <Button title="Stop Recording" onPress={stopRecording} color="red" />
      ) : (
        <Button title="Start Recording" onPress={startRecording} color="green" />
      )}

      <Text style={styles.transcription}>
        {transcription ? `Transcription: ${transcription}` : 'No speech detected yet.'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  transcription: {
    fontSize: 18,
    marginVertical: 20,
    color: 'blue',
  },
});

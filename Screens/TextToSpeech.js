import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';

export default function TextToSpeech() {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Function to handle speech output
  const handleTextSubmit = () => {
    if (!text.trim()) {
      console.log('No text to speak');
      return;
    }

    Speech.stop(); // Stop any ongoing speech before starting new
    setIsSpeaking(true);
    setIsPaused(false);

    Speech.speak(text, {
      language: 'en',
      rate: 1,
      pitch: 1,
      onStart: () => console.log('Started speaking...'),
      onDone: () => setIsSpeaking(false),
      onError: (error) => {
        console.log('Error:', error);
        setIsSpeaking(false);
      },
    });
  };

  // Function to stop speech
  const handleStopSpeech = () => {
    Speech.stop();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  // Function to pause speech
  const handlePauseSpeech = () => {
    Speech.pause();
    setIsPaused(true);
  };

  // Function to resume speech
  const handleResumeSpeech = () => {
    Speech.resume();
    setIsPaused(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text-to-Speech</Text>

      <TextInput
        value={text}
        onChangeText={setText}
        onSubmitEditing={handleTextSubmit}
        placeholder="Type something here..."
        style={styles.input}
      />

      <View style={styles.buttonContainer}>
        <Button title="Speak" onPress={handleTextSubmit} disabled={isSpeaking} />
        
        {isSpeaking && (
          <TouchableOpacity 
            style={styles.stopButton} 
            onPress={handleStopSpeech} 
          >
            <Text style={styles.stopButtonText}>Stop</Text>
          </TouchableOpacity>
        )}

        {isSpeaking && !isPaused ? (
          <TouchableOpacity style={styles.pauseButton} onPress={handlePauseSpeech}>
            <Text style={styles.pauseButtonText}>Pause</Text>
          </TouchableOpacity>
        ) : isPaused ? (
          <TouchableOpacity style={styles.resumeButton} onPress={handleResumeSpeech}>
            <Text style={styles.resumeButtonText}>Resume</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {text.trim() === '' && (
        <Text style={styles.warningText}>Please enter some text to speak</Text>
      )}
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
  input: {
    height: 50,
    width: '100%',
    borderColor: '#000',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 0,
  },
  stopButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pauseButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  pauseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resumeButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginLeft: 10,
  },
  resumeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningText: {
    color: 'red',
    fontSize: 16,
    marginTop: 0,
  },
});

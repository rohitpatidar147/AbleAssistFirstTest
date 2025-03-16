import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import * as Speech from 'expo-speech';

export default function TextToSpeechScreen() {
  const [text, setText] = useState(''); // Holds the typed text

  // Function to handle speech output when user submits the text
  const handleTextSubmit = () => {
    if (text.trim()) {
      // Speak the typed text
      Speech.speak(text, {
        language: 'en',  // Language of the speech
        rate: 1,         // Speed of speech (1 is normal)
        pitch: 1,        // Pitch of speech (1 is normal)
        onStart: () => console.log('Started speaking...'),
        onDone: () => console.log('Finished speaking!'),
        onError: (error) => console.log('Error:', error),
      });

      // Clear the text field after speaking
      setText('');
    } else {
      console.log('No text to speak');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text-to-Speech</Text>

      <TextInput
        value={text}
        onChangeText={setText}  // Updates the typed text
        onSubmitEditing={handleTextSubmit}  // Trigger speech when Enter is pressed
        placeholder="Type something here..."
        style={styles.input}
      />

      <Button title="Speak" onPress={handleTextSubmit} />

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
  warningText: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },
});

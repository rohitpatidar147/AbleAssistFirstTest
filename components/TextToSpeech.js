import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import { speakText, pauseSpeech, resumeSpeech, stopSpeech } from "../services/speechService";
import { extractTextFromImage } from "../services/ocrService";
import { APP_ROUTES } from "../config/appConfig";

export default ({ navigation }) => {
  const [inputText, setInputText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);

  // Request camera permissions on mount
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera permissions to make this work!");
        }
      }
    };
    requestPermissions();
  }, []);

  // Handle speech synthesis
  const handleSpeak = () => {
    if (!inputText.trim()) return;
    speakText(inputText.trim(), {
      onStart: () => {
        setIsSpeaking(true);
        setIsPaused(false);
      },
      onDone: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    });
  };

  // Handle pause/resume of speech
  const handlePauseResume = () => {
    if (isPaused) {
      resumeSpeech();
    } else {
      pauseSpeech();
    }
    setIsPaused(!isPaused);
  };

  // Handle stop of speech
  const handleStop = () => {
    stopSpeech();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  // Clear the text input
  const clearText = () => {
    setInputText("");
  };

  // Handle image selection (gallery or camera)
  const handleImageSelection = async (source) => {
    let pickerResult;
    if (source === "gallery") {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      pickerResult = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!pickerResult.canceled && pickerResult.assets.length > 0) {
      const selectedUri = pickerResult.assets[0].uri;
      setLoading(true);
      try {
        const text = await extractTextFromImage(selectedUri);
        setInputText(text);
      } catch (err) {
        console.error("OCR Error:", err);
        alert("Failed to extract text. Try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.view1}>
          <TouchableOpacity
            onPress={() => navigation.navigate(APP_ROUTES.home, { fromLeft: true })}
            accessibilityRole="button"
            accessibilityLabel="Back to home"
            hitSlop={8}
          >
            <Image
              source={{
                uri: "https://cdn-icons-png.flaticon.com/512/93/93634.png",
              }}
              resizeMode="stretch"
              style={styles.image}
            />
          </TouchableOpacity>

          <View style={styles.rowButtons}>
            <TouchableOpacity style={styles.button} onPress={handleSpeak}>
              <Text style={styles.text3}>Speak</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.clearButton} onPress={clearText}>
              <Text style={styles.text3}>Clear</Text>
            </TouchableOpacity>
          </View>

          {isSpeaking && (
            <View style={styles.rowButtons}>
              <TouchableOpacity
                style={[styles.pauseButton, { marginRight: 10 }]}
                onPress={handlePauseResume}
              >
                <Text style={styles.controlText}>
                  {isPaused ? "Resume" : "Pause"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.stopButton} onPress={handleStop}>
                <Text style={styles.controlText}>Stop</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.view3}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type here..."
              placeholderTextColor="#ABABAB"
              style={styles.input}
              multiline
            />
          </View>

          {loading && (
            <ActivityIndicator size="large" color="#0000ff" style={{ marginBottom: 10 }} />
          )}

          <TouchableOpacity
            style={styles.view}
            onPress={() => handleImageSelection("gallery")}
          >
            <View style={styles.column}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/0FMvR0VUXv/698gn083_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.image2}
              />
              <Text style={styles.text}>Upload an Image</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.view}
            onPress={() => handleImageSelection("camera")}
          >
            <View style={styles.column}>
              <Image
                source={{
                  uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/0FMvR0VUXv/2zjbb7ru_expires_30_days.png",
                }}
                resizeMode="stretch"
                style={styles.image2}
              />
              <Text style={styles.text}>Take a Picture</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  view1: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingBottom: 20,
  },
  image: {
    width: 40,
    height: 40,
    marginTop: 80,
    marginBottom: 30,
    marginLeft: 30,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 30,
  },
  clearButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 9,
    paddingHorizontal: 20,
    marginLeft: 10,
  },
  text3: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  rowButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  view3: {
    backgroundColor: "#EFEFEF",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 15,
    marginHorizontal: 32,
  },
  input: {
    fontSize: 18,
    color: "#000",
    minHeight: 120,
    textAlignVertical: "top",
  },
  view: {
    alignItems: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: 12,
    paddingTop: 10,
    paddingBottom: 15,
    marginBottom: 16,
    marginHorizontal: 32,
  },
  image2: {
    width: 120,
    height: 120,
  },
  column: {
    alignItems: "center",
  },
  text: {
    color: "black",
    fontSize: 24,
    marginTop: 8,
  },
  pauseButton: {
    backgroundColor: "orange",
    borderRadius: 10,
    padding: 10,
  },
  stopButton: {
    backgroundColor: "red",
    borderRadius: 10,
    padding: 10,
  },
  controlText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

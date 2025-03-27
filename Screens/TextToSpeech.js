import React, { useState, useEffect } from "react";
import { 
    View, ScrollView, Image, Text, TouchableOpacity, 
    StyleSheet, TextInput, ActivityIndicator, Platform 
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Speech from 'expo-speech';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants';

const TextToSpeechApp = () => {
    const [inputText, setInputText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera permissions to make this work!');
                }
            }
        })();
    }, []);

    const handleSpeak = () => {
        if (!inputText.trim()) return;
        
        Speech.speak(inputText.trim(), {
            language: 'en',
            rate: 1,
            pitch: 1,
            onStart: () => {
                setIsSpeaking(true);
                setIsPaused(false);
            },
            onDone: () => setIsSpeaking(false),
            onError: (error) => {
                console.log('Speech Error:', error);
                setIsSpeaking(false);
            },
        });
    };

    const handlePauseResumeSpeech = () => {
        if (isPaused) {
            Speech.resume();
        } else {
            Speech.pause();
        }
        setIsPaused(!isPaused);
    };

    const handleStopSpeech = () => {
        Speech.stop();
        setIsSpeaking(false);
        setIsPaused(false);
    };

    const extractTextFromImage = async (imageUri) => {
        setLoading(true);
        const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCrJi62EIMPZM1LzaVcivvyjnhesaOPDvM`;

        try {
            const base64Image = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });

            const requestData = {
                requests: [{
                    image: { content: base64Image },
                    features: [{ type: 'TEXT_DETECTION' }],
                }],
            };

            const response = await axios.post(apiUrl, requestData);
            const textAnnotations = response.data.responses[0]?.textAnnotations;
            setLoading(false);
            return textAnnotations?.length > 0 ? textAnnotations[0].description : 'No text found.';
        } catch (error) {
            console.error('Google Cloud Vision API Error:', error);
            setLoading(false);
            return 'Error extracting text.';
        }
    };

    const handleImageSelection = async (source) => {
        let pickerResult;
        if (source === 'gallery') {
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
            setImageUri(selectedUri);
            const text = await extractTextFromImage(selectedUri);
            
            if (text !== "Error extracting text.") {
                setInputText(text);
            } else {
                alert("Failed to extract text. Try again.");
            }
        }
    };

    const clearData = () => {
        setInputText('');
        setImageUri(null);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
            <TouchableOpacity
                    style={[styles.button, { backgroundColor: inputText.trim() ? '#77A600' : '#ccc' }]}
                    onPress={handleSpeak}
                    disabled={!inputText.trim()}
                >
                    <Text style={styles.buttonText}>Speak</Text>
                </TouchableOpacity>

                {isSpeaking && (
                    <>
                        <TouchableOpacity style={styles.pauseButton} onPress={handlePauseResumeSpeech}>
                            <Text style={styles.pauseButtonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.stopButton} onPress={handleStopSpeech}>
                            <Text style={styles.stopButtonText}>Stop</Text>
                        </TouchableOpacity>
                    </>
                )}
                <TouchableOpacity style={styles.clearButton} onPress={clearData}>
                    <Text style={styles.buttonText}>Clear</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => handleImageSelection('gallery')}>
                    <Text style={styles.buttonText}>Upload an Image</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => handleImageSelection('camera')}>
                    <Text style={styles.buttonText}>Take a Picture</Text>
                </TouchableOpacity>

                {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />}
                {imageUri && <Image source={{ uri: imageUri }} style={styles.displayImage} />}

                <TextInput
                    style={styles.input}
                    placeholder="Type or edit extracted text..."
                    value={inputText}
                    onChangeText={setInputText}
                    multiline={true}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#FFFFFF" },
    scrollView: { marginTop: 50, flex: 1, padding: 20 },
    button: { backgroundColor: "#D9D9D9", padding: 15, borderRadius: 10, alignItems: "center", marginVertical: 10 },
    buttonText: { fontSize: 18, fontWeight: "bold", color: "#333" },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginVertical: 10, borderRadius: 5, fontSize: 18 },
    displayImage: { width: 200, height: 200, marginVertical: 10, alignSelf: 'center' },
    loadingIndicator: { marginVertical: 10 },
    stopButton: { backgroundColor: 'red', padding: 10, borderRadius: 5, alignSelf: 'center', marginTop: 10 },
    stopButtonText: { color: 'white', fontWeight: 'bold' },
    pauseButton: { backgroundColor: 'orange', padding: 10, borderRadius: 5, alignSelf: 'center', marginTop: 10 },
    pauseButtonText: { color: 'white', fontWeight: 'bold' },
    clearButton: { backgroundColor: 'gray', padding: 15, borderRadius: 10, alignItems: 'center', marginVertical: 10 },
});

export default TextToSpeechApp;

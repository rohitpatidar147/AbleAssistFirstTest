import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';

import { transcribeAudioFile } from '../services/transcriptionService';
import { APP_ROUTES } from '../config/appConfig';

const SpeechToTextScreen = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [transcribedText, setTranscribedText] = useState('');
    const [recording, setRecording] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    // Configure audio settings once when the component is mounted
    useEffect(() => {
        const configureAudioMode = async () => {
            try {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                    shouldDuckAndroid: true,
                    playThroughEarpieceAndroid: false,
                    staysActiveInBackground: true,
                });
            } catch (err) {
                console.error('Audio mode configuration error:', err);
            }
        };

        configureAudioMode();
    }, []);

    // Start recording when the user taps the start button
    const startRecording = async () => {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Needed', 'Microphone access is required to record audio.');
                return;
            }

            const newRecording = new Audio.Recording();
            const recordingOptions = Audio.RecordingOptionsPresets.HIGH_QUALITY;
            await newRecording.prepareToRecordAsync(recordingOptions);
            await newRecording.startAsync();

            setRecording(newRecording);
            setIsRecording(true);
            setTranscribedText('');
        } catch (err) {
            console.error('Recording start error:', err);
            Alert.alert('Recording Error', err.message);
        }
    };

    // Stop recording when the user taps the stop button
    const stopRecording = async () => {
        try {
            if (recording) {
                await recording.stopAndUnloadAsync();
                const uri = recording.getURI();

                setRecording(null);
                setIsRecording(false);
                setIsLoading(true);

                try {
                    const transcript = await transcribeAudioFile(uri);
                    setTranscribedText(transcript);
                } catch (err) {
                    console.error('AssemblyAI Transcription Error:', err);
                    Alert.alert('Transcription Failed', err.message || 'An error occurred');
                    setTranscribedText('Transcription failed');
                } finally {
                    setIsLoading(false);
                }
            }
        } catch (err) {
            console.error('Recording stop error:', err);
            Alert.alert('Stopping Recording Error', err.message);
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ alignItems: 'center' }}>
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
                        style={styles.image2}
                    />
                </TouchableOpacity>
                <Text style={styles.text}>Speech to Text</Text>

                <Image
                    source={{
                        uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/0FMvR0VUXv/edlqcfku_expires_30_days.png"
                    }}
                    resizeMode="stretch"
                    style={styles.image}
                />

                <Text style={styles.text2}>
                    {isLoading ? "Processing..." : isRecording ? "Recording... Tap to stop." : "Tap to start recording..."}
                </Text>

                <TouchableOpacity
                    onPress={isRecording ? stopRecording : startRecording}
                    style={{
                        backgroundColor: isRecording ? '#FF5555' : '#4CAF50',
                        paddingVertical: 14,
                        paddingHorizontal: 28,
                        borderRadius: 12,
                        marginBottom: 30,
                    }}
                    disabled={isLoading}
                >
                    <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                        {isRecording ? "Stop Recording" : "Start Recording"}
                    </Text>
                </TouchableOpacity>

                <View style={styles.view}>
                    <Text style={styles.text3}>Text:</Text>
                    <Text style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                        {transcribedText || "No transcription yet."}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    scrollView: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 38,
    },
    text: {
        color: "#000000",
        fontSize: 24,
        marginTop: 58,
        marginBottom: 9,
        fontWeight: "bold",
    },
    text2: {
        color: "#000000",
        fontSize: 19,
        marginBottom: 20,
    },
    text3: {
        color: "#000000",
        fontSize: 19,
        fontWeight: "bold",
    },
    image: {
        width: 186,
        height: 186,
    },
    view: {
        width: "100%",
        backgroundColor: "#EFEFEF",
        borderRadius: 12,
        padding: 20,
        marginBottom: 40,
        shadowColor: "#00000040",
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        elevation: 4,
    },
    image2: {
        width: 40,
        height: 40,
        marginTop: 25,
        marginBottom: 30,
        marginLeft: 30,
        marginRight: 300,
    }
});

export default SpeechToTextScreen;

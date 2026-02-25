import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StyleSheet,
  Alert,
  Animated,
  Platform,
} from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { transcribeAudioFile } from '../services/transcriptionService';
import BackButton from './BackButton';
import AnimatedPressable from './AnimatedPressable';
import { APP_ROUTES } from '../config/appConfig';
import { THEME } from '../theme';

export default function SpeechToTextScreen() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [recording, setRecording] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const pulseAnim = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();

  // Pulse animation for recording
  useEffect(() => {
    let animation;
    if (isRecording) {
      animation = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.15,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      );
      animation.start();
    } else {
      pulseAnim.setValue(1);
    }
    return () => animation?.stop();
  }, [isRecording]);

  // Audio setup
  useEffect(() => {
    const configureAudioMode = async () => {
      try {
        if (Platform.OS !== 'web') {
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
            staysActiveInBackground: true,
          });
        }
      } catch (err) {
        console.error('Audio mode configuration error:', err);
      }
    };
    configureAudioMode();
  }, []);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Needed', 'Microphone access is required to record audio.');
        return;
      }

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();

      setRecording(newRecording);
      setIsRecording(true);
      setTranscribedText('');
    } catch (err) {
      console.error('Recording start error:', err);
      Alert.alert('Recording Error', err.message);
    }
  };

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
          setTranscribedText(transcript || 'No speech detected.');
        } catch (err) {
          console.error('AssemblyAI Transcription Error:', err);
          Alert.alert('Transcription Failed', err.message || 'An error occurred during transcription.');
          setTranscribedText('Transcription failed. Please try again.');
        } finally {
          setIsLoading(false);
        }
      }
    } catch (err) {
      console.error('Recording stop error:', err);
      Alert.alert('Stopping Error', err.message);
      setIsLoading(false);
    }
  };

  const handleCopyText = () => {
    if (!transcribedText) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton
          onPress={() => navigation.navigate(APP_ROUTES.home, { fromLeft: true })}
        />
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Speech to Text</Text>
          <Text style={styles.headerSubtitle}>Real-time Voice Recognition</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Microphone Interactive Stage */}
        <View style={styles.stageCard}>
          <View style={styles.stageGlow}>
            <Animated.View
              style={[
                styles.pulseRing,
                { transform: [{ scale: pulseAnim }] },
                isRecording && styles.pulseRingActive,
              ]}
            />
            <AnimatedPressable
              onPress={isRecording ? stopRecording : startRecording}
              disabled={isLoading}
              accessibilityRole="button"
              accessibilityLabel={isRecording ? 'Stop Recording' : 'Start Recording'}
              style={styles.micButtonWrapper}
            >
              <LinearGradient
                colors={
                  isRecording
                    ? ['#EF4444', '#DC2626']
                    : isLoading
                    ? ['#94A3B8', '#64748B']
                    : THEME.colors.gradientPrimary
                }
                style={styles.micButton}
              >
                <Ionicons
                  name={isRecording ? 'stop' : isLoading ? 'hourglass-outline' : 'mic'}
                  size={48}
                  color="#FFFFFF"
                />
              </LinearGradient>
            </AnimatedPressable>
          </View>

          <Text style={styles.statusLabel}>
            {isLoading
              ? 'Transcribing audio with AssemblyAI...'
              : isRecording
              ? 'Listening... Tap to stop recording'
              : 'Tap to start recording speech'}
          </Text>

          {isRecording && (
            <View style={styles.liveIndicator}>
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>RECORDING LIVE AUDIO</Text>
            </View>
          )}
        </View>

        {/* Live Transcription Result Card */}
        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <View style={styles.resultTag}>
              <Ionicons name="document-text-outline" size={16} color={THEME.colors.primary} />
              <Text style={styles.resultTagText}>TRANSCRIPTION RESULT</Text>
            </View>

            <View style={styles.resultActions}>
              {Boolean(transcribedText) && (
                <>
                  <AnimatedPressable
                    onPress={handleCopyText}
                    style={styles.iconButton}
                    accessibilityLabel="Copy text"
                  >
                    <Ionicons
                      name={copied ? 'checkmark' : 'copy-outline'}
                      size={18}
                      color={copied ? '#10B981' : THEME.colors.textSecondary}
                    />
                  </AnimatedPressable>
                  <AnimatedPressable
                    onPress={() => setTranscribedText('')}
                    style={styles.iconButton}
                    accessibilityLabel="Clear transcription"
                  >
                    <Ionicons name="trash-outline" size={18} color={THEME.colors.danger} />
                  </AnimatedPressable>
                </>
              )}
            </View>
          </View>

          <View style={styles.transcriptBox}>
            <Text style={[styles.transcriptText, !transcribedText && styles.placeholderText]}>
              {transcribedText || 'Your spoken words will appear here in real-time once transcribed...'}
            </Text>
          </View>
        </View>

        {/* Quick Tips Box */}
        <View style={styles.tipsCard}>
          <Ionicons name="bulb-outline" size={20} color={THEME.colors.primary} />
          <View style={styles.tipsContent}>
            <Text style={styles.tipsTitle}>Tips for high accuracy</Text>
            <Text style={styles.tipsBody}>
              Hold your microphone 6-8 inches away and speak at a steady pace for optimal clarity.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    fontWeight: '500',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  stageCard: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.radii.xl,
    paddingVertical: 36,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 20,
    ...THEME.shadows.card,
  },
  stageGlow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  pulseRing: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
  },
  pulseRingActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  micButtonWrapper: {
    borderRadius: 60,
    ...THEME.shadows.glow,
  },
  micButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: THEME.radii.full,
    marginTop: 6,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 6,
  },
  recordingText: {
    color: '#DC2626',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  resultCard: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.radii.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 16,
    ...THEME.shadows.card,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  resultTag: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  resultTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.primary,
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  resultActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: THEME.colors.surfaceSubtle,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  transcriptBox: {
    minHeight: 120,
    padding: 16,
    borderRadius: THEME.radii.lg,
    backgroundColor: THEME.colors.surfaceSubtle,
  },
  transcriptText: {
    fontSize: 16,
    lineHeight: 24,
    color: THEME.colors.textPrimary,
    fontWeight: '500',
  },
  placeholderText: {
    color: THEME.colors.textMuted,
    fontStyle: 'italic',
  },
  tipsCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#EEF2FF',
    borderRadius: THEME.radii.lg,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E0E7FF',
  },
  tipsContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.primary,
    marginBottom: 2,
  },
  tipsBody: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    lineHeight: 17,
  },
});

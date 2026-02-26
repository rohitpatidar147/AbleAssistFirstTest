import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Animated,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { speakText, pauseSpeech, resumeSpeech, stopSpeech } from '../services/speechService';
import { extractTextFromImage } from '../services/ocrService';
import BackButton from './BackButton';
import AnimatedPressable from './AnimatedPressable';
import { APP_ROUTES } from '../config/appConfig';
import { THEME } from '../theme';

const SPEED_PRESETS = [
  { label: '0.8x', rate: 0.8 },
  { label: '1.0x (Normal)', rate: 1.0 },
  { label: '1.2x', rate: 1.2 },
];

export default function TextToSpeech({ navigation }) {
  const [inputText, setInputText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [speechRate, setSpeechRate] = useState(1.0);

  // Animated wave bars
  const waveAnim1 = useRef(new Animated.Value(10)).current;
  const waveAnim2 = useRef(new Animated.Value(20)).current;
  const waveAnim3 = useRef(new Animated.Value(15)).current;
  const waveAnim4 = useRef(new Animated.Value(25)).current;
  const waveAnim5 = useRef(new Animated.Value(12)).current;

  useEffect(() => {
    let anim;
    if (isSpeaking && !isPaused) {
      const createBarAnim = (val, min, max, duration) =>
        Animated.loop(
          Animated.sequence([
            Animated.timing(val, { toValue: max, duration, useNativeDriver: false }),
            Animated.timing(val, { toValue: min, duration, useNativeDriver: false }),
          ])
        );

      anim = Animated.parallel([
        createBarAnim(waveAnim1, 8, 32, 400),
        createBarAnim(waveAnim2, 12, 38, 320),
        createBarAnim(waveAnim3, 6, 42, 450),
        createBarAnim(waveAnim4, 10, 36, 360),
        createBarAnim(waveAnim5, 8, 28, 410),
      ]);
      anim.start();
    } else {
      waveAnim1.setValue(10);
      waveAnim2.setValue(14);
      waveAnim3.setValue(18);
      waveAnim4.setValue(14);
      waveAnim5.setValue(10);
    }
    return () => anim?.stop();
  }, [isSpeaking, isPaused]);

  // Request camera permissions
  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Camera permissions are required to scan text from documents.');
        }
      }
    };
    requestPermissions();
  }, []);

  const handleSpeak = () => {
    if (!inputText.trim()) return;
    speakText(inputText.trim(), {
      rate: speechRate,
      onStart: () => {
        setIsSpeaking(true);
        setIsPaused(false);
      },
      onDone: () => {
        setIsSpeaking(false);
        setIsPaused(false);
      },
      onError: () => {
        setIsSpeaking(false);
        setIsPaused(false);
      },
    });
  };

  const handlePauseResume = () => {
    if (isPaused) {
      resumeSpeech();
    } else {
      pauseSpeech();
    }
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    stopSpeech();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const clearText = () => {
    handleStop();
    setInputText('');
  };

  const handleImageSelection = async (source) => {
    try {
      let pickerResult;
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      };

      if (source === 'gallery') {
        pickerResult = await ImagePicker.launchImageLibraryAsync(options);
      } else {
        pickerResult = await ImagePicker.launchCameraAsync(options);
      }

      if (!pickerResult.canceled && pickerResult.assets?.length > 0) {
        const selectedUri = pickerResult.assets[0].uri;
        setLoading(true);
        try {
          const text = await extractTextFromImage(selectedUri);
          setInputText(text);
        } catch (err) {
          console.error('OCR Error:', err);
          alert('Failed to extract text from image. Please check your network and API key.');
        } finally {
          setLoading(false);
        }
      }
    } catch (err) {
      console.error('Picker Error:', err);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <BackButton
          onPress={() => navigation.navigate(APP_ROUTES.home, { fromLeft: true })}
        />
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Text to Speech</Text>
          <Text style={styles.headerSubtitle}>Natural Voice Synthesis</Text>
        </View>
        <View style={{ width: 44 }} />
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Main Speech Visualizer & Input Card */}
          <View style={styles.editorCard}>
            {/* Waveform Animation Header */}
            <View style={styles.waveHeader}>
              <View style={styles.waveBars}>
                <Animated.View style={[styles.waveBar, { height: waveAnim1 }]} />
                <Animated.View style={[styles.waveBar, { height: waveAnim2 }]} />
                <Animated.View style={[styles.waveBar, { height: waveAnim3 }]} />
                <Animated.View style={[styles.waveBar, { height: waveAnim4 }]} />
                <Animated.View style={[styles.waveBar, { height: waveAnim5 }]} />
              </View>

              <View style={styles.speakingTag}>
                <View
                  style={[
                    styles.speakingDot,
                    isSpeaking && !isPaused && styles.speakingDotActive,
                  ]}
                />
                <Text style={styles.speakingTagText}>
                  {isSpeaking ? (isPaused ? 'PAUSED' : 'SPEAKING') : 'READY'}
                </Text>
              </View>
            </View>

            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type or paste any text to hear it spoken aloud..."
              placeholderTextColor={THEME.colors.textMuted}
              style={styles.input}
              multiline
              textAlignVertical="top"
            />

            {/* Character info bar */}
            <View style={styles.charInfoBar}>
              <Text style={styles.charCount}>
                {inputText.length} characters • {inputText.trim() ? inputText.trim().split(/\s+/).length : 0} words
              </Text>
              {Boolean(inputText) && (
                <AnimatedPressable onPress={clearText} style={styles.clearLink}>
                  <Text style={styles.clearLinkText}>Clear</Text>
                </AnimatedPressable>
              )}
            </View>

            {/* Playback Primary Controls */}
            <View style={styles.controlsRow}>
              <AnimatedPressable
                onPress={handleSpeak}
                disabled={!inputText.trim()}
                style={[styles.primaryButtonWrapper, !inputText.trim() && styles.buttonDisabled]}
              >
                <LinearGradient
                  colors={
                    inputText.trim() ? THEME.colors.gradientPrimary : ['#CBD5E1', '#94A3B8']
                  }
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.primaryButton}
                >
                  <Ionicons name="volume-high" size={20} color="#FFFFFF" />
                  <Text style={styles.primaryButtonText}>
                    {isSpeaking ? 'Speak Again' : 'Speak Text'}
                  </Text>
                </LinearGradient>
              </AnimatedPressable>

              {isSpeaking && (
                <>
                  <AnimatedPressable onPress={handlePauseResume} style={styles.controlPill}>
                    <Ionicons
                      name={isPaused ? 'play' : 'pause'}
                      size={18}
                      color={THEME.colors.textPrimary}
                    />
                    <Text style={styles.controlPillText}>{isPaused ? 'Resume' : 'Pause'}</Text>
                  </AnimatedPressable>

                  <AnimatedPressable
                    onPress={handleStop}
                    style={[styles.controlPill, styles.stopPill]}
                  >
                    <Ionicons name="stop" size={18} color="#EF4444" />
                    <Text style={[styles.controlPillText, { color: '#EF4444' }]}>Stop</Text>
                  </AnimatedPressable>
                </>
              )}
            </View>

            {/* Speed Presets */}
            <View style={styles.presetsRow}>
              <Text style={styles.presetLabel}>Speed:</Text>
              {SPEED_PRESETS.map((preset) => {
                const isSelected = speechRate === preset.rate;
                return (
                  <AnimatedPressable
                    key={preset.rate}
                    onPress={() => setSpeechRate(preset.rate)}
                    style={[styles.presetChip, isSelected && styles.presetChipActive]}
                  >
                    <Text
                      style={[styles.presetChipText, isSelected && styles.presetChipTextActive]}
                    >
                      {preset.label}
                    </Text>
                  </AnimatedPressable>
                );
              })}
            </View>
          </View>

          {/* OCR OCR Actions Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Import & Scan Text</Text>
            <Text style={styles.sectionSubtitle}>Extract text directly from documents or photos</Text>
          </View>

          {loading && (
            <View style={styles.loadingCard}>
              <ActivityIndicator size="small" color={THEME.colors.primary} />
              <Text style={styles.loadingText}>Extracting text with Google Vision OCR...</Text>
            </View>
          )}

          <View style={styles.ocrRow}>
            {/* Gallery Upload Card */}
            <AnimatedPressable
              onPress={() => handleImageSelection('gallery')}
              disabled={loading}
              style={styles.ocrCard}
            >
              <View style={[styles.ocrIconCircle, { backgroundColor: '#EEF2FF' }]}>
                <Ionicons name="images" size={26} color="#4F46E5" />
              </View>
              <Text style={styles.ocrCardTitle}>Upload Photo</Text>
              <Text style={styles.ocrCardSubtitle}>From your camera roll</Text>
            </AnimatedPressable>

            {/* Camera Capture Card */}
            <AnimatedPressable
              onPress={() => handleImageSelection('camera')}
              disabled={loading}
              style={styles.ocrCard}
            >
              <View style={[styles.ocrIconCircle, { backgroundColor: '#ECFDF5' }]}>
                <Ionicons name="camera" size={26} color="#059669" />
              </View>
              <Text style={styles.ocrCardTitle}>Take Picture</Text>
              <Text style={styles.ocrCardSubtitle}>Scan physical page</Text>
            </AnimatedPressable>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
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
  editorCard: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.radii.xl,
    padding: 20,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginBottom: 24,
    ...THEME.shadows.card,
  },
  waveHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
  },
  waveBars: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  waveBar: {
    width: 4,
    backgroundColor: THEME.colors.primary,
    borderRadius: 2,
    marginRight: 4,
  },
  speakingTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceSubtle,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: THEME.radii.full,
  },
  speakingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.textMuted,
    marginRight: 6,
  },
  speakingDotActive: {
    backgroundColor: '#16A34A',
  },
  speakingTagText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.textSecondary,
    letterSpacing: 0.5,
  },
  input: {
    minHeight: 130,
    fontSize: 16,
    lineHeight: 24,
    color: THEME.colors.textPrimary,
    paddingVertical: 10,
  },
  charInfoBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.surfaceSubtle,
    marginBottom: 16,
  },
  charCount: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    fontWeight: '500',
  },
  clearLink: {
    paddingVertical: 2,
    paddingHorizontal: 6,
  },
  clearLinkText: {
    fontSize: 12,
    color: THEME.colors.danger,
    fontWeight: '700',
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  primaryButtonWrapper: {
    flex: 1,
    marginRight: 8,
    ...THEME.shadows.glow,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: THEME.radii.full,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    marginLeft: 8,
  },
  controlPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: THEME.radii.full,
    backgroundColor: THEME.colors.surfaceSubtle,
    marginRight: 8,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  stopPill: {
    borderColor: '#FEE2E2',
    backgroundColor: '#FEF2F2',
  },
  controlPillText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textPrimary,
    marginLeft: 4,
  },
  presetsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  presetLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textSecondary,
    marginRight: 8,
  },
  presetChip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: THEME.radii.full,
    backgroundColor: THEME.colors.surfaceSubtle,
    marginRight: 6,
  },
  presetChipActive: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: THEME.colors.primary,
  },
  presetChipText: {
    fontSize: 12,
    color: THEME.colors.textSecondary,
    fontWeight: '600',
  },
  presetChipTextActive: {
    color: THEME.colors.primary,
    fontWeight: '800',
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  loadingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2FF',
    padding: 12,
    borderRadius: THEME.radii.lg,
    marginBottom: 12,
  },
  loadingText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.primary,
    marginLeft: 8,
  },
  ocrRow: {
    flexDirection: 'row',
    marginHorizontal: -6,
  },
  ocrCard: {
    flex: 1,
    marginHorizontal: 6,
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.radii.xl,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
    ...THEME.shadows.card,
  },
  ocrIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  ocrCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    marginBottom: 2,
  },
  ocrCardSubtitle: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: '500',
  },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import OnboardingSlide from './OnboardingSlide';
import AnimatedPressable from './AnimatedPressable';
import { APP_ROUTES } from '../config/appConfig';
import { APP_ASSETS } from '../config/assets';
import { THEME } from '../theme';

export default function ScreenFour({ navigation }) {
  return (
    <OnboardingSlide
      badgeText="SPEECH TO TEXT"
      title="Speech Recognition in Real-Time"
      source={APP_ASSETS.onboarding.stt}
      description="Speak naturally and watch your voice transform into clear, editable text in seconds."
    >
      <View style={styles.actionContainer}>
        <AnimatedPressable
          onPress={() => navigation.navigate(APP_ROUTES.home)}
          accessibilityRole="button"
          accessibilityLabel="Get Started with AbleAssist"
          style={styles.buttonWrapper}
        >
          <LinearGradient
            colors={THEME.colors.gradientPrimary}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
          </LinearGradient>
        </AnimatedPressable>
      </View>
    </OnboardingSlide>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    width: '100%',
    marginTop: 20,
  },
  buttonWrapper: {
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: THEME.radii.full,
    ...THEME.shadows.glow,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    marginRight: 8,
  },
});

import React from 'react';
import { StyleSheet } from 'react-native';

import OnboardingSlide from './OnboardingSlide';
import { APP_ASSETS } from '../config/assets';

export default function ScreenOne() {
  return (
    <OnboardingSlide
      title="Welcome to AbleAssist!"
      source={APP_ASSETS.onboarding.welcome}
      description="The AI-Powered Accessibility Companion You Deserve!"
      titleStyle={styles.headerText}
      imageStyle={styles.image}
      descriptionStyle={styles.subHeaderText}
    />
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#000000',
    marginTop: 90,
    marginLeft: 40,
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    height: 400,
    marginTop: 60,
    marginBottom: 10,
  },
  subHeaderText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginHorizontal: 42,
  },
});


import React from 'react';
import { StyleSheet } from 'react-native';

import OnboardingSlide from './OnboardingSlide';
import { APP_ASSETS } from '../config/assets';

export default function ScreenTwo() {
  return (
    <OnboardingSlide
      title="Bridging the Gap with AI!"
      source={APP_ASSETS.onboarding.asl}
      description="Instantly translate ASL gestures into English text and speech, making communication seamless and inclusive for all."
      titleStyle={styles.heading}
      imageStyle={styles.image}
      descriptionStyle={styles.description}
    />
  );
}

const styles = StyleSheet.create({
  heading: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 90,
    marginBottom: 50,
  },
  image: {
    width: 350,
    height: 400,
    marginBottom: 70,
    alignSelf: 'center',
  },
  description: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 44,
  },
});


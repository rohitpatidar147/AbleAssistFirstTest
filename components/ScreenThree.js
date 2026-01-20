import React from 'react';
import { StyleSheet } from 'react-native';

import OnboardingSlide from './OnboardingSlide';
import { APP_ASSETS } from '../config/assets';

export default function ScreenThree() {
  return (
    <OnboardingSlide
      title="Effortless Communication at Your Fingertips! 🎙️"
      source={APP_ASSETS.onboarding.tts}
      description="Convert text into clear, natural speech and make conversations more accessible for everyone."
      containerStyle={styles.content}
      titleStyle={styles.mainText}
      imageStyle={styles.image}
      descriptionStyle={styles.subText}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    paddingHorizontal: 42,
  },
  mainText: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 45,
    marginBottom: 50,
  },
  image: {
    width: 299,
    height: 330,
    marginTop: 0,
    marginBottom: 70,
    alignSelf: 'center',
  },
  subText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 70,
  },
});


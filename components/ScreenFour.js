import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import OnboardingSlide from './OnboardingSlide';
import { APP_ROUTES } from '../config/appConfig';
import { APP_ASSETS } from '../config/assets';

export default function ScreenFour({ navigation }) {
  return (
    <OnboardingSlide
      title="Seamlessly Transform Speech into Text! 🗣️"
      source={APP_ASSETS.onboarding.stt}
      titleStyle={styles.headerText}
      imageStyle={styles.image}
    >
      <Text style={styles.subHeaderText}>
        Instantly convert your voice into written words for effortless communication.
      </Text>

      <Text style={styles.subHeaderText}>
        And that's just the beginning—explore many more features designed to make life easier for you!
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate(APP_ROUTES.home)}
          accessibilityRole="button"
          accessibilityLabel="Get Started"
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </OnboardingSlide>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 81,
    marginBottom: 28,
    marginHorizontal: 46,
  },
  image: {
    width: 285,
    height: 285,
    alignSelf: 'center',
    marginBottom: 48,
  },
  subHeaderText: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginHorizontal: 29,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: '#77A600',
    fontSize: 24,
    fontWeight: 'bold',
  },
});


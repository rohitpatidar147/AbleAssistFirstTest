import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import HomeActionCard from './HomeActionCard';
import { APP_ROUTES } from '../config/appConfig';
import { APP_ASSETS } from '../config/assets';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>How can we help you today?</Text>

        {/* Row 1 */}
        <View style={styles.row}>
          <HomeActionCard
            title="Text To Speech"
            source={APP_ASSETS.home.tts}
            onPress={() => navigation.navigate(APP_ROUTES.textToSpeech)}
            accessibilityHint="Opens text to speech"
          />
          <HomeActionCard
            title="Speech To Text"
            source={APP_ASSETS.home.stt}
            onPress={() => navigation.navigate(APP_ROUTES.speechToText)}
            accessibilityHint="Opens speech to text"
          />
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <HomeActionCard
            title="ASL Converter"
            source={APP_ASSETS.home.asl}
          />
          <HomeActionCard
            title="Be My Eyes"
            source={APP_ASSETS.home.beMyEyes}
          />
        </View>

        {/* AI Assistant */}
        <View style={styles.aiWrapper}>
          <HomeActionCard
            title="AI Assistant"
            source={APP_ASSETS.home.aiAssistant}
            onPress={() => navigation.navigate(APP_ROUTES.chatBot)}
            accessibilityHint="Opens the AI assistant"
            imageStyle={styles.aiImage}
            textStyle={styles.aiText}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  heading: {
    color: "black",
    fontSize: 24,
    marginTop: 87,
    marginBottom: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "space-around",
  },
  image: {
    width: 175,
    height: 175,
  },
  imageText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
  },
  aiWrapper: {
    alignItems: "center",
    marginTop: 20,
  },
  aiImage: {
    width: 183,
    height: 183,
    marginBottom: 6,
  },
  aiText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 100,
  },
});

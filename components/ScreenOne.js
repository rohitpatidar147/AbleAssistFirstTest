import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ScreenOne() {
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.headerText}>Welcome to AbleAssist!</Text>

      <Image
        source={{
          uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/0FMvR0VUXv/kje5ztoi.png",
        }}
        resizeMode="stretch"
        style={styles.image}
      />

      <Text style={styles.subHeaderText}>
        The AI-Powered Accessibility Companion You Deserve!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: {
    flex: 1,
    width,
    height,
    backgroundColor: '#FFFFFF',
  },
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

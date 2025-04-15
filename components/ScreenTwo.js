import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ScreenTwo() {
  return (
    <View style={styles.content}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Bridging the Gap with AI!</Text>
      </View>

      <Image
        source={{
          uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/8ah4kh0b.png',
        }}
        resizeMode="stretch"
        style={styles.image}
      />

      <Text style={styles.description}>
        Instantly translate ASL gestures into English text and speech, making communication seamless and inclusive for all.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width,
    height,
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 90,
    marginBottom: 50,
  },
  heading: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
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

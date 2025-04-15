import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ScreenThree() {
  return (
    <View style={styles.content}>
      <Text style={styles.mainText}>
        Effortless Communication at Your Fingertips! 🎙️
      </Text>

      <Image
        source={{
          uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/pfs5h9wi.png',
        }}
        resizeMode="stretch"
        style={styles.image}
      />

      <Text style={styles.subText}>
        Convert text into clear, natural speech and make conversations more accessible for everyone.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width,
    backgroundColor: '#FFFFFF',
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

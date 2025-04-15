import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ScreenFour({ navigation }) {
  return (
    <View style={styles.innerContainer}>
      <Text style={styles.headerText}>
        Seamlessly Transform Speech into Text! 🗣️
      </Text>

      <Image
        source={{
          uri: 'https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/7q832o94.png',
        }}
        resizeMode="stretch"
        style={styles.image}
      />

      <Text style={styles.subHeaderText}>
        Instantly convert your voice into written words for effortless communication.
      </Text>

      <Text style={styles.subHeaderText}>
        And that's just the beginning—explore many more features designed to make life easier for you!
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
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

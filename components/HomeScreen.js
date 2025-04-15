import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>How can we help you today?</Text>

        {/* Row 1 */}
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => navigation.navigate("TextToSpeech")}
            activeOpacity={0.7}
            accessible accessibilityLabel="Text to Speech"
          >
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/2tdz64i6.png" }}
              resizeMode="stretch"
              style={styles.image}
            />
            <Text style={styles.imageText}>Text To Speech</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate("SpeechToText")}
            activeOpacity={0.7}
            accessible accessibilityLabel="Speech to Text"
          >
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/007xigo5.png" }}
              resizeMode="stretch"
              style={styles.image}
            />
            <Text style={styles.imageText}>Speech To Text</Text>
          </TouchableOpacity>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <TouchableOpacity activeOpacity={0.7} accessible accessibilityLabel="ASL Converter">
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/d1mjnxqt.png" }}
              resizeMode="stretch"
              style={styles.image}
            />
            <Text style={styles.imageText}>ASL Converter</Text>
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.7} accessible accessibilityLabel="Be My Eyes">
            <Image
              source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/kjxlg9k7.png" }}
              resizeMode="stretch"
              style={styles.image}
            />
            <Text style={styles.imageText}>Be My Eyes</Text>
          </TouchableOpacity>
        </View>

        {/* AI Assistant */}
        <TouchableOpacity
          onPress={() => navigation.navigate("ChatBotScreen")}
          activeOpacity={0.7}
          accessible accessibilityLabel="AI Assistant"
          style={styles.aiWrapper}
        >
          <Image
            source={{ uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/nufgzu2q.png" }}
            resizeMode="stretch"
            style={styles.aiImage}
          />
          <Text style={styles.aiText}>AI Assistant</Text>
        </TouchableOpacity>
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

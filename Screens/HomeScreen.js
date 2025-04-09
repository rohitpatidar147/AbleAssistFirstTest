import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>{"How can we help you today?"}</Text>

        {/* Row 1 */}
        <View style={styles.row}>
          <TouchableOpacity onPress={() => navigation.navigate("TextToSpeech")}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/2tdz64i6.png",
              }}
              resizeMode={"stretch"}
              style={styles.image}
            />
            <Text style={styles.imageText}>{"Text To Speech"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("SpeechToText")}>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/007xigo5.png",
              }}
              resizeMode={"stretch"}
              style={styles.image}
            />
            <Text style={styles.imageText}>{"Speech To Text"}</Text>
          </TouchableOpacity>
        </View>

        {/* Row 2 */}
        <View style={styles.row}>
          <TouchableOpacity>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/d1mjnxqt.png",
              }}
              resizeMode={"stretch"}
              style={styles.image}
            />
            <Text style={styles.imageText}>{"ASL Converter"}</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Image
              source={{
                uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/kjxlg9k7.png",
              }}
              resizeMode={"stretch"}
              style={styles.image}
            />
            <Text style={styles.imageText}>{"Be My Eyes"}</Text>
          </TouchableOpacity>
        </View>

        {/* AI Assistant */}
        <TouchableOpacity onPress={() => navigation.navigate("ChatBotScreen")}>
          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/nufgzu2q.png",
            }}
            resizeMode={"stretch"}
            style={styles.aiImage}
          />
          <Text style={styles.aiText}>{"AI Assistant"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  innerContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    color: "black",
    fontSize: 28,
    marginTop: 87,
    marginBottom: 24,
    marginHorizontal: 27,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    marginLeft: 26,
  },
  image: {
    width: 175,
    height: 175,
    marginRight: 12,
  },
  imageText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 0,
    marginLeft: 15,
  },
  aiImage: {
    width: 183,
    height: 183,
    marginBottom: 6,
    marginLeft: 26,
  },
  aiText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 100,
    marginLeft: 50,
  },
});


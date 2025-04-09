import React, { useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import SwipeHandler from "../SwipeHandler";

export default ({ navigation }) => {
  const swipeHandler = useRef(new SwipeHandler(navigation)).current;

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={(event) => swipeHandler.handleSwipe(event, "Fourth", "Second")}
      >
        <View style={styles.content}>
          <Text style={styles.mainText}>
            Effortless Communication at Your Fingertips! 🎙️
          </Text>

          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/pfs5h9wi.png",
            }}
            resizeMode="stretch"
            style={styles.image}
          />

          <Text style={styles.subText}>
            Convert text into clear, natural speech and make conversations more accessible for everyone.
          </Text>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",  // Align content vertically
    paddingHorizontal: 42,
  },
  mainText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 91,
    marginBottom: 52,
  },
  image: {
    width: 299,
    height: 299,
    marginBottom: 115,
    marginLeft: 57,
  },
  subText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 6,
  },
});


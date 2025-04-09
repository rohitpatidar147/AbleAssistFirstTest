import React, { useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import SwipeHandler from "../SwipeHandler";

export default ({ navigation }) => {
  const swipeHandler = useRef(new SwipeHandler(navigation)).current;

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={(event) =>
          swipeHandler.handleSwipe(event, "Third", "First", (value) => {})
        }
      >
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>{"Bridging the Gap with AI!"}</Text>
          </View>

          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/8ah4kh0b.png",
            }}
            resizeMode={"stretch"}
            style={styles.image}
          />

          <Text style={styles.description}>
            {
              "Instantly translate ASL gestures into English text and speech, making communication seamless and inclusive for all."
            }
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
  },
  textContainer: {
    alignItems: "center",
    marginTop: 97,
    marginBottom: 42,
  },
  heading: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
  },
  image: {
    width: 301,
    height: 301,
    marginBottom: 90,
    marginLeft: 57,
  },
  description: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 0,
    marginHorizontal: 44,
  },
});

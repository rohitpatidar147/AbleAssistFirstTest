import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import SwipeHandler from "../SwipeHandler";

export default ({ navigation }) => {
  const swipeHandler = useRef(new SwipeHandler(navigation)).current;

  return (
    <GestureHandlerRootView style={styles.container}>
      <PanGestureHandler
        onGestureEvent={(event) =>
          swipeHandler.handleSwipe(event, null, "Third", (value) => {})
        }
      >
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>{"Seamlessly Transform Speech into Text! 🗣️"}</Text>

          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/7q832o94.png",
            }}
            resizeMode={"stretch"}
            style={styles.image}
          />

          <Text style={styles.subHeaderText}>
            {"Instantly convert your voice into written words for effortless communication."}
          </Text>

          <Text style={styles.subHeaderText}>
            {"And that's just the beginning—explore many more features designed to make life easier for you!"}
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <Text style={styles.buttonText}>{"Get Started"}</Text>
            </TouchableOpacity>
          </View>
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
  innerContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 81,
    marginBottom: 28,
    marginHorizontal: 46,
  },
  image: {
    width: 285,
    height: 285,
    marginBottom: 48,
    marginLeft: 45,
  },
  subHeaderText: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 38,
    marginHorizontal: 29,
  },
  buttonContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 25,
  },
  buttonText: {
    color: "#77A600",
    fontSize: 24,
    fontWeight: "bold",
  },
});


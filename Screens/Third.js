import React, { useRef } from "react";
import { View, Text, Image } from "react-native";
import { GestureHandlerRootView, PanGestureHandler } from "react-native-gesture-handler";
import SwipeHandler from "../SwipeHandler";

export default ({ navigation }) => {
  const swipeHandler = useRef(new SwipeHandler(navigation)).current;

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <PanGestureHandler
        onGestureEvent={(event) => swipeHandler.handleSwipe(event, "Fourth", "Second")}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
          }}
        >
          <Text
            style={{
              color: "#000000",
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 91,
              marginBottom: 52,
              marginHorizontal: 42,
            }}
          >
            {"Effortless Communication at Your Fingertips! 🎙️ "}
          </Text>

          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/pfs5h9wi.png",
            }}
            resizeMode="stretch"
            style={{
              width: 299,
              height: 299,
              marginBottom: 115,
              marginLeft: 57,
            }}
          />

          <Text
            style={{
              color: "#000000",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 6,
              marginHorizontal: 42,
            }}
          >
            {
              "Convert text into clear, natural speech and make conversations more accessible for everyone."
            }
          </Text>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

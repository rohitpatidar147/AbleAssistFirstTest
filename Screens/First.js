import React, { useRef } from "react";
import { View, Text, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PanGestureHandler } from "react-native-gesture-handler";
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
        onGestureEvent={(event) =>
          swipeHandler.handleSwipe(event, "Second", null, (value) => {
          })
        }
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
              marginTop: 90,
              marginBottom: 0,
              marginLeft: 40,
              fontSize: 30,
              fontWeight: "bold",
            }}
          >
            {"Welcome to AbleAssist!"}
          </Text>

          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/0FMvR0VUXv/kje5ztoi.png",
            }}
            resizeMode={"stretch"}
            style={{
              height: 400,
              marginBottom: 10,
              marginTop: 60,
            }}
          />

          <Text
            style={{
              color: "#000000",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 0,
              marginHorizontal: 42,
              marginTop: 60,
            }}
          >
            {"The AI-Powered Accessibility Companion You Deserve!"}
          </Text>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

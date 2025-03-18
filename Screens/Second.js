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
        onGestureEvent={(event) =>
          swipeHandler.handleSwipe(event, "Third", "First", (value) => {
          })
        }
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: 97,
              marginBottom: 42,
            }}
          >
            <Text
              style={{
                color: "#000000",
                fontSize: 24,
                fontWeight: "bold",
              }}
            >
              {"Bridging the Gap with AI!"}
            </Text>
          </View>

          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/8ah4kh0b.png",
            }}
            resizeMode={"stretch"}
            style={{
              width: 301,
              height: 301,
              marginBottom: 90,
              marginLeft: 57,
            }}
          />

          <Text
            style={{
              color: "#000000",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 0,
              marginHorizontal: 44,
            }}
          >
            {
              "Instantly translate ASL gestures into English text and speech, making communication seamless and inclusive for all."
            }
          </Text>

          <View
            style={{
              alignItems: "center",
              marginBottom: 45,
            }}
          />
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

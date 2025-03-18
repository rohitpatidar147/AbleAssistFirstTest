import React, { useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
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
          swipeHandler.handleSwipe(event, null, "Third", (value) => {})
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
              fontSize: 24,
              fontWeight: "bold",
              marginTop: 81,
              marginBottom: 28,
              marginHorizontal: 46,
            }}
          >
            {"Seamlessly Transform Speech into Text! 🗣️ "}
          </Text>

          <Image
            source={{
              uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/HsgFDjQAVe/7q832o94.png",
            }}
            resizeMode={"stretch"}
            style={{
              width: 285,
              height: 285,
              marginBottom: 48,
              marginLeft: 45,
            }}
          />

          <Text
            style={{
              color: "#000000",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 38,
              marginHorizontal: 29,
            }}
          >
            {"Instantly convert your voice into written words for effortless communication."}
          </Text>

          <Text
            style={{
              color: "#000000",
              fontSize: 24,
              fontWeight: "bold",
              marginBottom: 20,
              marginHorizontal: 30,
            }}
          >
            {"And that's just the beginning—explore many more features designed to make life easier for you!"}
          </Text>

          <View
            style={{
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: "#D9D9D9",
                borderRadius: 20,
                paddingVertical: 16,
                paddingHorizontal: 25,
              }}
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <Text
                style={{
                  color: "#77A600",
                  fontSize: 24,
                  fontWeight: "bold",
                }}
              >
                {"Get Started"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

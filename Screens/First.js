import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

export default ({ navigation }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}>

      <View  
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}>

        <Text 
          style={{
            color: "#000000",
            marginTop: 90,
            marginBottom: 0,
            marginLeft: 40,
            fontSize: 30,
            fontWeight: "bold",
          }}>
          {"Welcome to AbleAssist!"}
        </Text>

        <Image
          source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/0FMvR0VUXv/kje5ztoi.png"}} 
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
            marginTop:60,
          }}>
          {"The AI-Powered Accessibility Companion You Deserve!"}
        </Text>

        <View 
          style={{
            alignItems: "flex-end",
            marginBottom: 45,
          }}>
          <TouchableOpacity 
            style={{
              backgroundColor: "#D9D9D9",
              borderRadius: 20,
              paddingVertical: 16,
              paddingHorizontal: 25,
              marginRight:150,
              marginTop: 10,
            }} onPress={()=>navigation.navigate("tts")}>
            <Text 
              style={{
                color: "#77A600",
                fontSize: 24,
                fontWeight: "bold",
              }}>
              {"Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
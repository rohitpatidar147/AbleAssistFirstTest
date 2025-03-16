import React from "react";
import { SafeAreaView, View, ScrollView, Text, Image, Button } from "react-native";

export default ({ navigation }) => {
  return (
    <SafeAreaView 
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}>
      <ScrollView  
        style={{
          flex: 1,
          backgroundColor: "#C5C3C3",
        }}>
        <Text 
          style={{
            color: "#000000",
            marginTop: 78,
            marginBottom: 24,
            marginLeft: 54,
          }}>
          {"Welcome to\nAbleAssist!"}
        </Text>
        <Image
          source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/0FMvR0VUXv/kje5ztoi.png"}} 
          resizeMode={"stretch"}
          style={{
            height: 400,
            marginBottom: 84,
          }}
        />
        <Text 
          style={{
            color: "#000000",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 73,
            marginHorizontal: 42,
          }}>
          {"The AI-Powered Accessibility Companion You Deserve!"}
        </Text>
        <View 
          style={{
            alignItems: "flex-end",
            marginBottom: 45,
          }}>
          <Image
            source={{uri: "https://storage.googleapis.com/tagjs-prod.appspot.com/0FMvR0VUXv/1xgd52rr.png"}} 
            resizeMode={"stretch"}
            style={{
              width: 85,
              height: 13,
              marginRight: 48,
            }}
          />
        </View>

        {/* Button to navigate to the About page */}
        <Button
          title="Go to About Page"
          onPress={() => navigation.navigate("About")} // Navigate to "About" page
        />
        
      </ScrollView>
    </SafeAreaView>
  );
};
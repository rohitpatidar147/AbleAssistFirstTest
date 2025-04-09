import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

export default function ChatBotScreen({ navigation }) {
  const [inputMessage, setInputMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const scrollViewRef = useRef();

  const API_KEY = "AIzaSyCrJi62EIMPZM1LzaVcivvyjnhesaOPDvM"; // Hide this in production

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    setChatHistory((prev) => [...prev, { role: "user", text: inputMessage }]);
    const userMessage = inputMessage;
    setInputMessage("");

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: userMessage }] }],
          }),
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        const aiResponse = data.candidates[0].content.parts[0].text.trim();
        setChatHistory((prev) => [...prev, { role: "ai", text: aiResponse }]);
      } else {
        setChatHistory((prev) => [
          ...prev,
          { role: "ai", text: "Sorry, I didn't get that." },
        ]);
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{ paddingBottom: 20 }}
            ref={scrollViewRef}
            onContentSizeChange={() =>
              scrollViewRef.current.scrollToEnd({ animated: true })
            }
          >
            {chatHistory.map((message, index) => (
              <View
                key={index}
                style={message.role === "user" ? styles.row2 : styles.row}
              >
                {message.role === "ai" && (
                  <Image
                    source={{
                      uri:
                        "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/0FMvR0VUXv/iwrmldbn_expires_30_days.png",
                    }}
                    resizeMode="stretch"
                    style={styles.image}
                  />
                )}

                <View
                  style={
                    message.role === "user" ? styles.button2 : styles.button
                  }
                >
                  <Text
                    style={
                      message.role === "user" ? styles.text2 : styles.text
                    }
                  >
                    {message.text}
                  </Text>
                </View>

                {message.role === "user" && (
                  <Image
                    source={{
                      uri:
                        "https://storage.googleapis.com/tagjs-prod.appspot.com/v1/0FMvR0VUXv/cqhmsaao_expires_30_days.png",
                    }}
                    resizeMode="stretch"
                    style={styles.image2}
                  />
                )}
              </View>
            ))}
            <View style={{ marginBottom: 20 }} />
          </ScrollView>
        </TouchableWithoutFeedback>

        <View style={{ paddingHorizontal: 10, backgroundColor: "#FFFFFF" }}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder={"Type here..."}
              value={inputMessage}
              onChangeText={setInputMessage}
              style={styles.input}
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              style={styles.sendButton}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
    paddingLeft: 8,
    paddingRight: 8,
  },
  row2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginVertical: 10,
    paddingLeft: 8,
    paddingRight: 8,
  },
  button: {
    backgroundColor: "#D8CFC4",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 12,
    maxWidth: "70%",
  },
  button2: {
    backgroundColor: "#DBD3D8",
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 12,
    maxWidth: "70%",
  },
  text: {
    color: "#484646",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
  },
  text2: {
    color: "#484646",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "right",
  },
  image: {
    width: 39,
    height: 40,
    marginTop: 11,
    marginRight: 13,
  },
  image2: {
    width: 46,
    height: 46,
    marginLeft: 13,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    paddingVertical: 18,
    paddingLeft: 27,
    paddingRight: 20,
    fontSize: 18,
    color: "#000",
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
});


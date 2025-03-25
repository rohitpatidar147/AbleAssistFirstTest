import React, { useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";

export default function ChatBotScreen() {
    const [inputMessage, setInputMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const API_KEY = "AIzaSyCC-mbb1ZtlFdiif-5D5qtCmsDXPKvhE5I"; // Replace with your actual API key

    const handleSendMessage = async () => {
        if (!inputMessage.trim()) return;

        setChatHistory([...chatHistory, { role: "user", text: inputMessage }]);
        setInputMessage("");

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ contents: [{ parts: [{ text: inputMessage }] }] }),
                }
            );

            const data = await response.json();

            if (data.candidates && data.candidates.length > 0) {
                const aiResponse = data.candidates[0].content.parts[0].text.trim();
                setChatHistory(prevChat => [...prevChat, { role: "ai", text: aiResponse }]);
            } else {
                console.log("No valid response from AI");
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
                    <View style={{ flex: 1 }}>
                        <ScrollView style={styles.chatContainer} contentContainerStyle={{ paddingBottom: 20 }}>
                            {chatHistory.map((message, index) => (
                                <View key={index} style={[styles.messageBubble, message.role === "user" ? styles.userBubble : styles.aiBubble]}>
                                    <Text style={styles.messageText}>{message.text}</Text>
                                </View>
                            ))}
                        </ScrollView>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={inputMessage}
                                onChangeText={setInputMessage}
                                placeholder="Type a message..."
                                onSubmitEditing={handleSendMessage}
                                returnKeyType="send"
                            />
                            <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                                <Text style={styles.sendButtonText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "white", padding: 10 },
    chatContainer: { flex: 1, marginBottom: 10 },
    messageBubble: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: "80%" },
    userBubble: { alignSelf: "flex-end", backgroundColor: "#007bff" },
    aiBubble: { alignSelf: "flex-start", backgroundColor: "white" },
    messageText: { color: "#fff" },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "white",
        borderRadius: 10,
        borderTopWidth: 0,
        borderColor: "#ccc",
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        marginRight: 10,
    },
    sendButton: { backgroundColor: "#007bff", padding: 10, borderRadius: 20 },
    sendButtonText: { color: "#fff", fontWeight: "bold" },
});


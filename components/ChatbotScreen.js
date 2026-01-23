import React, { useRef, useState } from 'react';
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
} from 'react-native';

import { generateGeminiReply } from '../services/geminiService';
import { buildAssistantMessage, buildUserMessage, normalizeText } from '../utils/chatUtils';
import BackButton from './BackButton';
import { APP_ROUTES } from '../config/appConfig';
import { APP_ASSETS } from '../config/assets';

export default function ChatbotScreen({ navigation }) {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const scrollViewRef = useRef(null);

  const handleSendMessage = async () => {
    const messageText = normalizeText(inputMessage);
    if (!messageText) {
      return;
    }

    setChatHistory((prev) => [...prev, buildUserMessage(messageText)]);
    setInputMessage('');
    Keyboard.dismiss();

    try {
      const aiReply = await generateGeminiReply(messageText);
      setChatHistory((prev) => [...prev, buildAssistantMessage(aiReply)]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setChatHistory((prev) => [
        ...prev,
        buildAssistantMessage("I couldn't connect right now. Please try again."),
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <BackButton
          onPress={() => navigation.navigate(APP_ROUTES.home, { fromLeft: true })}
          style={styles.backButton}
        />

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{ paddingBottom: 20 }}
            keyboardShouldPersistTaps="handled"
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {chatHistory.map((message, index) => (
              <View key={`${message.role}-${index}`} style={message.role === 'user' ? styles.row2 : styles.row}>
                {message.role === 'ai' && (
                  <Image
                    source={APP_ASSETS.chat.aiAvatar}
                    resizeMode="cover"
                    style={styles.image}
                  />
                )}

                <View style={message.role === 'user' ? styles.button2 : styles.button}>
                  <Text style={message.role === 'user' ? styles.text2 : styles.text}>{message.text}</Text>
                </View>

                {message.role === 'user' && (
                  <Image
                    source={APP_ASSETS.chat.userAvatar}
                    resizeMode="cover"
                    style={styles.image2}
                  />
                )}
              </View>
            ))}
            <View style={{ marginBottom: 20 }} />
          </ScrollView>
        </TouchableWithoutFeedback>

        <View style={{ paddingHorizontal: 10, backgroundColor: '#FFFFFF' }}>
          <View style={styles.inputWrapper}>
            <TextInput
              placeholder="Type here..."
              value={inputMessage}
              onChangeText={setInputMessage}
              style={styles.input}
              accessibilityLabel="Chat message"
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              disabled={!inputMessage.trim()}
              style={[styles.sendButton, !inputMessage.trim() && styles.disabledSendButton]}
              accessibilityRole="button"
              accessibilityLabel="Send message"
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  scrollView: { flex: 1, backgroundColor: '#FFFFFF' },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 10,
    paddingLeft: 8,
    paddingRight: 8,
  },
  row2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 10,
    paddingLeft: 8,
    paddingRight: 8,
  },
  button: {
    backgroundColor: '#B4B4B4',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 12,
    maxWidth: '70%',
  },
  button2: {
    backgroundColor: '#EFEFEF',
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 12,
    maxWidth: '70%',
  },
  text: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  text2: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 11,
    marginRight: 13,
  },
  image2: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginLeft: 13,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
    paddingVertical: 18,
    paddingLeft: 27,
    paddingRight: 20,
    fontSize: 18,
    color: '#000',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#007bff',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  disabledSendButton: { opacity: 0.5 },
  backButton: {
    marginTop: 15,
    marginLeft: 20,
    marginBottom: 5,
  },
});

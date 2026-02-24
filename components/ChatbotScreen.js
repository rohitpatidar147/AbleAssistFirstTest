import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Image,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import { generateGeminiReply } from '../services/geminiService';
import { buildAssistantMessage, buildUserMessage, normalizeText } from '../utils/chatUtils';
import BackButton from './BackButton';
import AnimatedPressable from './AnimatedPressable';
import { APP_ROUTES } from '../config/appConfig';
import { APP_ASSETS } from '../config/assets';
import { THEME } from '../theme';

const SUGGESTED_PROMPTS = [
  'How can you assist me today?',
  'How does ASL translation work?',
  'Tips for clearer voice synthesis',
];

export default function ChatbotScreen({ navigation }) {
  const [inputMessage, setInputMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    buildAssistantMessage("Hello! I'm your AbleAssist companion. How can I help you today?"),
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef(null);

  const sendMessage = async (textToSend) => {
    const messageText = normalizeText(textToSend);
    if (!messageText || isTyping) {
      return;
    }

    setChatHistory((prev) => [...prev, buildUserMessage(messageText)]);
    setInputMessage('');
    setIsTyping(true);
    Keyboard.dismiss();

    try {
      const aiReply = await generateGeminiReply(messageText);
      setChatHistory((prev) => [...prev, buildAssistantMessage(aiReply)]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      setChatHistory((prev) => [
        ...prev,
        buildAssistantMessage("I couldn't connect to the AI service right now. Please check your network and try again."),
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => sendMessage(inputMessage);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
        style={styles.keyboardContainer}
      >
        {/* Modern Top Header */}
        <View style={styles.topHeader}>
          <BackButton
            onPress={() => navigation.navigate(APP_ROUTES.home, { fromLeft: true })}
          />

          <View style={styles.headerProfile}>
            <View style={styles.headerAvatarWrapper}>
              <Image source={APP_ASSETS.chat.aiAvatar} style={styles.headerAvatar} />
              <View style={styles.onlineBadge} />
            </View>
            <View>
              <Text style={styles.headerTitle}>AI Assistant</Text>
              <Text style={styles.headerStatus}>Always Active • Gemini 2.0</Text>
            </View>
          </View>

          <AnimatedPressable
            onPress={() => setChatHistory([buildAssistantMessage("Hello! How can I assist you today?")])}
            accessibilityLabel="Clear chat conversation"
            style={styles.clearChatButton}
          >
            <Ionicons name="refresh-outline" size={20} color={THEME.colors.textSecondary} />
          </AnimatedPressable>
        </View>

        {/* Message Thread */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          >
            {chatHistory.map((message, index) => {
              const isUser = message.role === 'user';

              return (
                <View
                  key={`${message.role}-${index}`}
                  style={[styles.messageRow, isUser ? styles.userRow : styles.aiRow]}
                >
                  {!isUser && (
                    <Image source={APP_ASSETS.chat.aiAvatar} style={styles.messageAvatar} />
                  )}

                  {isUser ? (
                    <LinearGradient
                      colors={THEME.colors.gradientPrimary}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.userBubble}
                    >
                      <Text style={styles.userText}>{message.text}</Text>
                    </LinearGradient>
                  ) : (
                    <View style={styles.aiBubble}>
                      <Text style={styles.aiText}>{message.text}</Text>
                    </View>
                  )}

                  {isUser && (
                    <Image source={APP_ASSETS.chat.userAvatar} style={styles.messageAvatar} />
                  )}
                </View>
              );
            })}

            {/* Typing / Loading Indicator */}
            {isTyping && (
              <View style={[styles.messageRow, styles.aiRow]}>
                <Image source={APP_ASSETS.chat.aiAvatar} style={styles.messageAvatar} />
                <View style={styles.typingBubble}>
                  <ActivityIndicator size="small" color={THEME.colors.primary} />
                  <Text style={styles.typingText}>AI is thinking...</Text>
                </View>
              </View>
            )}

            {/* Quick Prompts for First-time engagement */}
            {chatHistory.length <= 1 && (
              <View style={styles.suggestionsContainer}>
                <Text style={styles.suggestionsTitle}>Suggested Prompts</Text>
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <AnimatedPressable
                    key={i}
                    onPress={() => sendMessage(prompt)}
                    style={styles.suggestionChip}
                  >
                    <Ionicons name="sparkles-outline" size={14} color={THEME.colors.primary} />
                    <Text style={styles.suggestionText}>{prompt}</Text>
                  </AnimatedPressable>
                ))}
              </View>
            )}
          </ScrollView>
        </TouchableWithoutFeedback>

        {/* Input Composer Bar */}
        <View style={styles.composerWrapper}>
          <View style={styles.composerCard}>
            <TextInput
              placeholder="Ask anything or request assistance..."
              placeholderTextColor={THEME.colors.textMuted}
              value={inputMessage}
              onChangeText={setInputMessage}
              style={styles.input}
              accessibilityLabel="Chat message input"
              onSubmitEditing={handleSendMessage}
              returnKeyType="send"
              multiline
            />

            <AnimatedPressable
              onPress={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              style={[
                styles.sendButton,
                (!inputMessage.trim() || isTyping) && styles.sendButtonDisabled,
              ]}
              accessibilityRole="button"
              accessibilityLabel="Send message"
            >
              <LinearGradient
                colors={
                  inputMessage.trim() && !isTyping
                    ? THEME.colors.gradientPrimary
                    : ['#CBD5E1', '#94A3B8']
                }
                style={styles.sendGradient}
              >
                <Ionicons name="arrow-up" size={20} color="#FFFFFF" />
              </LinearGradient>
            </AnimatedPressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  keyboardContainer: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: THEME.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
    ...THEME.shadows.soft,
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatarWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  headerAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#16A34A',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  headerStatus: {
    fontSize: 11,
    color: THEME.colors.textSecondary,
    fontWeight: '600',
  },
  clearChatButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: THEME.colors.surfaceSubtle,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: 6,
  },
  userRow: {
    justifyContent: 'flex-end',
  },
  aiRow: {
    justifyContent: 'flex-start',
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  userBubble: {
    maxWidth: '75%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderBottomRightRadius: 4,
    ...THEME.shadows.glow,
  },
  userText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '500',
  },
  aiBubble: {
    maxWidth: '75%',
    backgroundColor: THEME.colors.surface,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    ...THEME.shadows.card,
  },
  aiText: {
    color: THEME.colors.textPrimary,
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '400',
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  typingText: {
    color: THEME.colors.textSecondary,
    fontSize: 13,
    marginLeft: 8,
    fontWeight: '600',
  },
  suggestionsContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  suggestionsTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 10,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surface,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: THEME.radii.full,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    marginVertical: 4,
    ...THEME.shadows.soft,
  },
  suggestionText: {
    color: THEME.colors.primary,
    fontSize: 13,
    fontWeight: '600',
    marginLeft: 6,
  },
  composerWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: THEME.colors.surface,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
  },
  composerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.surfaceSubtle,
    borderRadius: 24,
    paddingLeft: 16,
    paddingRight: 6,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: THEME.colors.textPrimary,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    marginLeft: 8,
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  sendGradient: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

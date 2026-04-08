import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

import HomeActionCard from './HomeActionCard';
import { AnimatedPressable } from '../../shared/components';
import { APP_ROUTES } from '../../core/routes';
import { APP_ASSETS } from '../../core/assets';
import { THEME } from '../../shared';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Header */}
        <View style={styles.header}>
          <View>
            <View style={styles.brandRow}>
              <View style={styles.logoBadge}>
                <Ionicons name="sparkles" size={16} color={THEME.colors.textInverse} />
              </View>
              <Text style={styles.brandName}>AbleAssist</Text>
            </View>
            <Text style={styles.heading}>How can we help you today?</Text>
            <Text style={styles.subheading}>Empowering accessible communication with AI</Text>
          </View>

          <View accessible accessibilityRole="text" accessibilityLabel="AI Ready" style={styles.statusChip}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>AI Ready</Text>
          </View>
        </View>

        {/* AI Assistant Hero Banner */}
        <AnimatedPressable
          onPress={() => navigation.navigate(APP_ROUTES.chatBot)}
          accessibilityRole="button"
          accessibilityLabel="Open AI Assistant"
          accessibilityHint="Starts interactive conversation with AI companion"
          style={styles.heroWrapper}
        >
          <LinearGradient
            colors={THEME.colors.gradientHero}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.heroCard}
          >
            <View style={styles.heroContent}>
              <View style={styles.heroBadge}>
                <Ionicons name="flash" size={12} color={THEME.colors.warning} />
                <Text style={styles.heroBadgeText}>FEATURED COMPANION</Text>
              </View>
              <Text style={styles.heroTitle}>AI Assistant</Text>
              <Text style={styles.heroSubtitle}>
                Chat freely, translate gestures, and get smart contextual help anytime.
              </Text>
              <View style={styles.heroButton}>
                <Text style={styles.heroButtonText}>Start Chatting</Text>
                <Ionicons name="arrow-forward" size={16} color={THEME.colors.textInverse} />
              </View>
            </View>

            <View style={styles.heroImageWrapper}>
              <Image
                source={APP_ASSETS.home.aiAssistant}
                resizeMode="cover"
                style={styles.heroImage}
              />
            </View>
          </LinearGradient>
        </AnimatedPressable>

        {/* Core Assistive Tools Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Assistive Tools</Text>
          <Text style={styles.sectionSubtitle}>Select an intelligent accessibility module</Text>
        </View>

        {/* Grid Row 1 */}
        <View style={styles.gridRow}>
          <HomeActionCard
            title="Text to Speech"
            subtitle="Natural vocalizer"
            source={APP_ASSETS.home.tts}
            onPress={() => navigation.navigate(APP_ROUTES.textToSpeech)}
            accessibilityHint="Opens text to speech synthesizer"
            tag="Active"
            tagColor={THEME.colors.primary}
          />
          <HomeActionCard
            title="Speech to Text"
            subtitle="Audio transcriber"
            source={APP_ASSETS.home.stt}
            onPress={() => navigation.navigate(APP_ROUTES.speechToText)}
            accessibilityHint="Opens voice transcriber"
            tag="Active"
            tagColor={THEME.colors.primary}
          />
        </View>

        {/* Grid Row 2 */}
        <View style={styles.gridRow}>
          <HomeActionCard
            title="ASL Converter"
            subtitle="Gesture recognition"
            source={APP_ASSETS.home.asl}
            tag="Beta"
            tagColor={THEME.colors.warning}
          />
          <HomeActionCard
            title="Be My Eyes"
            subtitle="Visual description"
            source={APP_ASSETS.home.beMyEyes}
            tag="Soon"
            tagColor={THEME.colors.success}
          />
        </View>

        {/* Footer info pill */}
        <View style={styles.footer}>
          <Ionicons name="shield-checkmark-outline" size={16} color={THEME.colors.textMuted} />
          <Text style={styles.footerText}>
            Privacy-first design • Connected with Gemini 2.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  logoBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: THEME.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
    ...THEME.shadows.soft,
  },
  brandName: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.primary,
    letterSpacing: 0.5,
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
    letterSpacing: -0.5,
  },
  subheading: {
    fontSize: 14,
    color: THEME.colors.textSecondary,
    marginTop: 4,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.successSoft,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: THEME.radii.full,
    borderWidth: 1,
    borderColor: THEME.colors.successBorder,
  },
  statusDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: THEME.colors.success,
    marginRight: 6,
  },
  statusText: {
    color: THEME.colors.success,
    fontSize: 12,
    fontWeight: '700',
  },
  heroWrapper: {
    marginBottom: 28,
  },
  heroCard: {
    borderRadius: THEME.radii.xl,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    ...THEME.shadows.glow,
  },
  heroContent: {
    flex: 1,
    paddingRight: 12,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.onPrimarySurface,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: THEME.radii.full,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  heroBadgeText: {
    color: THEME.colors.textInverse,
    fontSize: 10,
    fontWeight: '800',
    marginLeft: 4,
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: THEME.colors.textInverse,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: THEME.colors.textInverse,
    lineHeight: 18,
    marginBottom: 14,
  },
  heroButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.onPrimarySurface,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: THEME.radii.full,
    alignSelf: 'flex-start',
  },
  heroButtonText: {
    color: THEME.colors.textInverse,
    fontSize: 13,
    fontWeight: '700',
    marginRight: 6,
  },
  heroImageWrapper: {
    width: 100,
    height: 100,
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: THEME.colors.onPrimaryBorder,
    ...THEME.shadows.card,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  sectionHeader: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.textPrimary,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: THEME.colors.textSecondary,
    marginTop: 2,
  },
  gridRow: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    paddingVertical: 12,
  },
  footerText: {
    color: THEME.colors.textMuted,
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
  },
});

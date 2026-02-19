import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AnimatedPressable from './AnimatedPressable';
import { THEME } from '../theme';

export default function HomeActionCard({
  title,
  subtitle,
  source,
  imageUri,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  style,
  imageStyle,
  textStyle,
  tag,
  tagColor = THEME.colors.primary,
}) {
  const imageSource = source || (imageUri ? { uri: imageUri } : null);

  return (
    <AnimatedPressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      style={[styles.cardWrapper, style]}
    >
      <View style={styles.card}>
        {Boolean(tag) && (
          <View style={[styles.badge, { backgroundColor: tagColor }]}>
            <Text style={styles.badgeText}>{tag}</Text>
          </View>
        )}

        <View style={styles.imageContainer}>
          {Boolean(imageSource) && (
            <Image
              source={imageSource}
              resizeMode="cover"
              style={[styles.image, imageStyle]}
              accessible={false}
            />
          )}
        </View>

        <View style={styles.content}>
          <Text style={[styles.title, textStyle]} numberOfLines={1}>{title}</Text>
          {Boolean(subtitle) && <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>}
        </View>

        <View style={styles.actionIcon}>
          <Ionicons name="arrow-forward" size={14} color={THEME.colors.primary} />
        </View>
      </View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    flex: 1,
    margin: 8,
  },
  card: {
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.radii.xl,
    padding: 14,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: 'center',
    position: 'relative',
    ...THEME.shadows.card,
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: THEME.radii.full,
    zIndex: 1,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: THEME.radii.lg,
    overflow: 'hidden',
    backgroundColor: THEME.colors.surfaceSubtle,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: THEME.colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: THEME.colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
  },
  actionIcon: {
    marginTop: 8,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

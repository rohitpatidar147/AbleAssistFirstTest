import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, Image } from 'react-native';
import { THEME } from '../theme';

export default function OnboardingSlide({
  title,
  source,
  imageUri,
  description,
  badgeText = 'ACCESSIBILITY AI',
  containerStyle,
  imageStyle,
  titleStyle,
  descriptionStyle,
  children,
}) {
  const { width } = useWindowDimensions();
  const imageSource = source || (imageUri ? { uri: imageUri } : null);

  return (
    <View style={[styles.slide, { width }, containerStyle]}>
      <View style={styles.cardContainer}>
        {Boolean(badgeText) && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        )}

        {Boolean(title) && <Text style={[styles.title, titleStyle]}>{title}</Text>}

        {Boolean(imageSource) && (
          <View style={styles.imageContainer}>
            <Image
              source={imageSource}
              resizeMode="cover"
              style={[styles.image, imageStyle]}
              accessible={false}
            />
          </View>
        )}

        {Boolean(description) && (
          <Text style={[styles.description, descriptionStyle]}>{description}</Text>
        )}

        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 90,
    backgroundColor: THEME.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    width: '100%',
    maxWidth: 440,
    backgroundColor: THEME.colors.surface,
    borderRadius: THEME.radii.xl,
    padding: 24,
    borderWidth: 1,
    borderColor: THEME.colors.border,
    alignItems: 'center',
    ...THEME.shadows.card,
  },
  badge: {
    backgroundColor: '#EEF2FF',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: THEME.radii.full,
    marginBottom: 12,
  },
  badgeText: {
    color: THEME.colors.primary,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  title: {
    color: THEME.colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  imageContainer: {
    width: '100%',
    height: 240,
    borderRadius: THEME.radii.lg,
    overflow: 'hidden',
    backgroundColor: THEME.colors.surfaceSubtle,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  description: {
    color: THEME.colors.textSecondary,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    fontWeight: '500',
  },
});

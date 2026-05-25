import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function HomeActionCard({
  title,
  imageUri,
  onPress,
  accessibilityLabel,
  accessibilityHint,
  style,
  imageStyle,
  textStyle,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      accessible
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      hitSlop={8}
      style={[styles.card, style]}
    >
      <Image
        source={{ uri: imageUri }}
        resizeMode="stretch"
        style={[styles.image, imageStyle]}
        accessible={false}
      />
      <Text style={[styles.title, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
  },
  image: {
    width: 175,
    height: 175,
  },
  title: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
});

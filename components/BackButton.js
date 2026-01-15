import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BackButton({ onPress, label = 'Back to home', style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={12}
      style={[styles.button, style]}
    >
      <Ionicons name="arrow-back" size={28} color="#111827" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
});

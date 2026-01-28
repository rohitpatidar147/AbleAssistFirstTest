import React from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default function ScreenFive({ navigation }) {
  return (
    <View style={[styles.screen, { backgroundColor: '#White' }]}>
      <Text style={styles.text}>Screen Five</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    width,
    height,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
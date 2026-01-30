import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

export default function OnboardingSlide({
  title,
  source,
  imageUri,
  description,
  containerStyle,
  imageStyle,
  titleStyle,
  descriptionStyle,
  children,
}) {
  const imageSource = source || (imageUri ? { uri: imageUri } : null);

  return (
    <View style={[styles.slide, containerStyle]}>
      {Boolean(title) && <Text style={[styles.title, titleStyle]}>{title}</Text>}

      {Boolean(imageSource) && (
        <Image
          source={imageSource}
          resizeMode="cover"
          style={[styles.image, imageStyle]}
          accessible={false}
        />
      )}

      {Boolean(description) && (
        <Text style={[styles.description, descriptionStyle]}>{description}</Text>
      )}

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    width,
    backgroundColor: '#FFFFFF',
  },
  title: {
    color: '#000000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  image: {
    alignSelf: 'center',
  },
  description: {
    color: '#000000',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

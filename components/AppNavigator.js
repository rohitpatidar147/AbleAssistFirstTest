import React, { useCallback, useRef, useState } from 'react';
import { FlatList, View, StyleSheet, Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo';
import ScreenThree from './ScreenThree';
import ScreenFour from './ScreenFour';
import HomeScreen from './HomeScreen';
import TextToSpeech from './TextToSpeech';
import SpeechToTextScreen from './SpeechToTextScreen';
import ChatBotScreen from './ChatbotScreen';
import { APP_ROUTES, ONBOARDING_SCREENS } from '../config/appConfig';

const Stack = createNativeStackNavigator();
const ONBOARDING_VIEWABILITY_CONFIG = { viewAreaCoveragePercentThreshold: 50 };

const onboardingComponents = {
  ScreenOne,
  ScreenTwo,
  ScreenThree,
  ScreenFour,
};

function OnboardingCarousel({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    const visibleIndex = viewableItems[0]?.index;
    if (visibleIndex != null) {
      setCurrentIndex(visibleIndex);
    }
  }, []);

  const screens = ONBOARDING_SCREENS.map(({ key, name }) => {
    const Component = onboardingComponents[name];

    return {
      key,
      component: name === 'ScreenFour' ? <Component navigation={navigation} /> : <Component />,
    };
  });

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={screens}
        renderItem={({ item }) => <>{item.component}</>}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        accessibilityRole="list"
        accessibilityLabel="Onboarding pages"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={ONBOARDING_VIEWABILITY_CONFIG}
      />

      <View style={styles.dotsContainer}>
        {screens.map((_, i) => (
          <View
            key={i}
            accessibilityLabel={`Onboarding page ${i + 1}`}
            style={[styles.dot, currentIndex === i && styles.activeDot]}
          />
        ))}
      </View>
    </View>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName={APP_ROUTES.onboarding}>
      <Stack.Screen
        name={APP_ROUTES.onboarding}
        component={OnboardingCarousel}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={APP_ROUTES.home}
        component={HomeScreen}
        options={({ route }) => {
          const fromLeft = route?.params?.fromLeft;
          return {
            headerShown: false,
            animation: fromLeft ? 'slide_from_left' : 'slide_from_right',
          };
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.textToSpeech}
        component={TextToSpeech}
        options={{ animation: 'slide_from_right', headerShown: false }}
      />
      <Stack.Screen
        name={APP_ROUTES.speechToText}
        component={SpeechToTextScreen}
        options={{ animation: 'slide_from_right', headerShown: false }}
      />
      <Stack.Screen
        name={APP_ROUTES.chatBot}
        component={ChatBotScreen}
        options={{ animation: 'slide_from_right', headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  dotsContainer: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: '#000',
    width: 14,
    height: 14,
  },
});

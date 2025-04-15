import React, { useRef, useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Animated,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ScreenOne from './components/ScreenOne';
import ScreenTwo from './components/ScreenTwo';
import ScreenThree from './components/ScreenThree';
import ScreenFour from './components/ScreenFour';
import HomeScreen from './components/HomeScreen';
import TextToSpeech from './components/TextToSpeech';
import SpeechToTextScreen from './components/SpeechToTextScreen';
import ChatBotScreen from './components/ChatbotScreen';

const Stack = createNativeStackNavigator();

function OnboardingCarousel({ navigation }) {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const screens = [
    { key: '1', component: <ScreenOne /> },
    { key: '2', component: <ScreenTwo /> },
    { key: '3', component: <ScreenThree /> },
    { key: '4', component: <ScreenFour navigation={navigation} /> },
  ];

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={screens}
        renderItem={({ item }) => <>{item.component}</>}
        keyExtractor={item => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
          }
        }}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
      />

      <View style={styles.dotsContainer}>
        {screens.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              currentIndex === i && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={OnboardingCarousel}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
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
          name="TextToSpeech"
          component={TextToSpeech}
          options={{ animation: 'slide_from_right', headerShown: false }}
        />
        <Stack.Screen
          name="SpeechToText"
          component={SpeechToTextScreen}
          options={{ animation: 'slide_from_right', headerShown: false }}
        />
        <Stack.Screen
          name="ChatBotScreen"
          component={ChatBotScreen}
          options={{ animation: 'slide_from_right', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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

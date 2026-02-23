import React, { useCallback, useRef, useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Text,
  useWindowDimensions,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import ScreenOne from './ScreenOne';
import ScreenTwo from './ScreenTwo';
import ScreenThree from './ScreenThree';
import ScreenFour from './ScreenFour';
import HomeScreen from './HomeScreen';
import TextToSpeech from './TextToSpeech';
import SpeechToTextScreen from './SpeechToTextScreen';
import ChatBotScreen from './ChatbotScreen';
import { APP_ROUTES, ONBOARDING_SCREENS } from '../config/appConfig';
import { THEME } from '../theme';

const Stack = createNativeStackNavigator();
const ONBOARDING_VIEWABILITY_CONFIG = { viewAreaCoveragePercentThreshold: 50 };

const onboardingComponents = {
  ScreenOne,
  ScreenTwo,
  ScreenThree,
  ScreenFour,
};

function OnboardingCarousel({ navigation }) {
  const { width } = useWindowDimensions();
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleViewableItemsChanged = useCallback(({ viewableItems }) => {
    const visibleIndex = viewableItems[0]?.index;
    if (visibleIndex != null) {
      setCurrentIndex(visibleIndex);
    }
  }, []);

  const goToIndex = (index) => {
    if (index >= 0 && index < ONBOARDING_SCREENS.length) {
      flatListRef.current?.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const screens = ONBOARDING_SCREENS.map(({ key, name }) => {
    const Component = onboardingComponents[name];

    return {
      key,
      component: name === 'ScreenFour' ? <Component navigation={navigation} /> : <Component />,
    };
  });

  return (
    <View style={styles.carouselContainer}>
      {currentIndex < screens.length - 1 && (
        <View style={styles.topSkipBar}>
          <TouchableOpacity
            onPress={() => navigation.navigate(APP_ROUTES.home)}
            accessibilityRole="button"
            accessibilityLabel="Skip onboarding"
            hitSlop={12}
            style={styles.skipButton}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={screens}
        renderItem={({ item }) => <>{item.component}</>}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        accessibilityRole="list"
        accessibilityLabel="Onboarding pages"
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={ONBOARDING_VIEWABILITY_CONFIG}
      />

      <View style={styles.bottomControls}>
        <View style={styles.dotsContainer}>
          {screens.map((_, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => goToIndex(i)}
              accessibilityRole="button"
              accessibilityLabel={`Go to onboarding page ${i + 1}`}
              style={[styles.dot, currentIndex === i && styles.activeDot]}
            />
          ))}
        </View>

        {currentIndex < screens.length - 1 && (
          <TouchableOpacity
            onPress={() => goToIndex(currentIndex + 1)}
            accessibilityRole="button"
            accessibilityLabel="Next slide"
            style={styles.nextPill}
          >
            <Text style={styles.nextPillText}>Next</Text>
            <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
          </TouchableOpacity>
        )}
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
  carouselContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topSkipBar: {
    position: 'absolute',
    top: 48,
    right: 24,
    zIndex: 10,
  },
  skipButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 9999,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  skipText: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '700',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 28,
    left: 24,
    right: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#CBD5E1',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4F46E5',
    width: 24,
    height: 8,
    borderRadius: 4,
  },
  nextPill: {
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4F46E5',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 9999,
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextPillText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
    marginRight: 6,
  },
});

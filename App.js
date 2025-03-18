import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import First from './Screens/First';
import Second from './Screens/Second';
import Third from './Screens/Third';
import Fourth from './Screens/Fourth';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name="First" component={First} options={{headerShown: false}}/>
        <Stack.Screen name="Second" component={Second} options={{headerShown: false}}/>
        <Stack.Screen name="Third" component={Third} options={{headerShown: false}}/>
        <Stack.Screen name="Fourth" component={Fourth} options={{headerShown: false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



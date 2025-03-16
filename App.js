import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './Screens/HomeScreen';
import About from './Screens/About';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="About" component={About}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}



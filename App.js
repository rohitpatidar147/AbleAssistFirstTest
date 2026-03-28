import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { AppNavigator } from './core';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

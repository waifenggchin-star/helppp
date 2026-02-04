import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ScenarioDetailScreen } from '../screens/ScenarioDetailScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { CategoryScreen } from '../screens/CategoryScreen';
import { useTheme } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  const { mode } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar style={mode === 'accessibility' ? 'light' : 'dark'} />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="ScenarioDetail" component={ScenarioDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

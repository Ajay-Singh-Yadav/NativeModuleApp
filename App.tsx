import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import SecureScreen from './src/screens/SecureScreen';
import SplashScreen from './src/screens/SplashScreen';
import DraggableCard from './src/screens/DraggableCard';
import ImagesScreen from './src/screens/ImagesScreen';
import AudioFilesScreen from './src/screens/AudioFilesScreen';
import ViewImageScreen from './src/screens/ViewImageScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Secure" component={SecureScreen} />
        <Stack.Screen name="Drag" component={DraggableCard} />
        <Stack.Screen name="AllImages" component={ImagesScreen} />
        <Stack.Screen name="draggable" component={DraggableCard} />
        <Stack.Screen name="AudioFiles" component={AudioFilesScreen} />
        <Stack.Screen name="ViewImage" component={ViewImageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

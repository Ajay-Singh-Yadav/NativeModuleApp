import {
  Dimensions,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const SplashScreen = () => {
  const navigation = useNavigation();
  const scale = useSharedValue(0.6);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });

    opacity.value = withTiming(1, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });

    setTimeout(() => {
      navigation.replace('Home');
    }, 1500);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#121212" barStyle="light-content" />
      <Animated.Image
        source={require('../assets/images/splashIcons.png')}
        style={[styles.logo, animatedStyle]}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
  },
});

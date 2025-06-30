import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const SplashScreen = () => {
  const flip = useSharedValue(0);

  const FrontImage = require('../assets/images/pic1.jpeg');

  const backImage = require('../assets/images/pic2.jpeg');

  const animatedFrontStyle = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${flip.value + 180}deg` }],
      opacity: flip.value < 90 ? 1 : 0,
    };
  });
  const animatedBackStyle = useAnimatedStyle(() => {
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${flip.value}deg` }],
      opacity: flip.value >= 90 ? 1 : 0,
    };
  });

  const handleFlip = () => {
    flip.value = withSpring(flip.value === 0 ? 180 : 0);
  };

  return (
    <View style={styles.container}>
      <View style={{ height: 100, width: 100, position: 'relative' }}>
        <Animated.View
          style={[
            animatedFrontStyle,
            {
              position: 'absolute',
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              width: 100,
              borderRadius: 50,
            },
          ]}
        >
          <Image
            source={FrontImage}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              resizeMode: 'cover',
            }}
          />
        </Animated.View>
        {/* second images */}
        <Animated.View
          style={[
            animatedBackStyle,
            {
              position: 'absolute',
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              height: 100,
              width: 100,
              borderRadius: 50,
            },
          ]}
        >
          <Image
            source={FrontImage}
            style={{
              height: 100,
              width: 100,
              borderRadius: 50,
              resizeMode: 'cover',
            }}
          />
        </Animated.View>
      </View>
      <TouchableOpacity onPress={handleFlip}>
        <Text>Flip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

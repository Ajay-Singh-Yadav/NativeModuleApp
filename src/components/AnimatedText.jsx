import React, { useEffect } from 'react';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  withRepeat,
  withDelay,
  withSequence,
} from 'react-native-reanimated';

const AnimatedText = ({ children, style }) => {
  const opacity = useSharedValue(0);
  const translateX = useSharedValue(60);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateX: translateX.value }],
    };
  });

  useEffect(() => {
    const animate = () => {
      opacity.value = withRepeat(
        withSequence(
          withTiming(1, { duration: 1500, easing: Easing.out(Easing.exp) }),
          withTiming(0, { duration: 500 }), // optional fade out
        ),
        -1, // infinite loop
        false,
      );

      translateX.value = withRepeat(
        withSequence(
          withTiming(0, { duration: 1500, easing: Easing.out(Easing.exp) }),
          withTiming(60, { duration: 500 }),
        ),
        -1,
        false,
      );
    };

    animate();
  }, []);

  return (
    <Animated.Text style={[style, animatedStyle]}>{children}</Animated.Text>
  );
};

export default AnimatedText;

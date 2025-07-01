import React from 'react';

import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const DraggableCard = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.startX;
      translateY.value = event.translationY + context.startY;
    },
    onEnd: (event, context) => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureHandlerRootView style={styles.contaoner}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.card, animatedStyle]} />
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};

export default DraggableCard;

const styles = StyleSheet.create({
  contaoner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: 150,
    height: 150,
    backgroundColor: 'red',
    borderRadius: 20,
  },
});

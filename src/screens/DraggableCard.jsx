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

import { useDraggable } from '../customHooks/useDraggable';

const DraggableCard = () => {
  const { gesturehandler, animatedStyle } = useDraggable();

  return (
    <GestureHandlerRootView style={styles.contaoner}>
      <PanGestureHandler onGestureEvent={gesturehandler}>
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

import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { useDraggable } from '../customHooks/useDraggable';
import Animated from 'react-native-reanimated';

const DraggableImage = ({ ImageUri, onPress }) => {
  const { gesturehandler, animatedStyle } = useDraggable();

  return (
    <PanGestureHandler onGestureEvent={gesturehandler}>
      <Animated.View style={[styles.imageWrapper, animatedStyle]}>
        <TouchableOpacity>
          <Animated.Image source={{ uri: ImageUri }} style={styles.image} />
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default DraggableImage;

const styles = StyleSheet.create({
  imageWrapper: {
    // position: 'absolute',
  },
  image: {
    width: 110,
    height: 110,
    margin: 5,
    borderRadius: 8,
  },
});

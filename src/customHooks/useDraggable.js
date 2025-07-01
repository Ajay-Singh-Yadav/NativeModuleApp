import {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  unAnimatedGestureHandler,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';

export const useDraggable = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gesturehandler = useAnimatedGestureHandler({
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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  return { gesturehandler, animatedStyle };
};

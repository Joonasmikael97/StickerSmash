import { ImageSourcePropType } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);

  // Drag
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Rotation
  const rotate = useSharedValue(0);
  const rotationOffset = useSharedValue(0);

  // Double-tap zoom
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const imageStyle = useAnimatedStyle(() => ({
    width: withSpring(scaleImage.value),
    height: withSpring(scaleImage.value),
  }));

  // Rotation gesture (two fingers)
  const rotation = Gesture.Rotation()
    .onStart(() => {
      rotationOffset.value = rotate.value;
    })
    .onUpdate((event) => {
      const rotationFactor = 2.5; // adjust sensitivity
      const degrees = ((event.rotation * 180) / Math.PI) * rotationFactor;
      rotate.value = rotationOffset.value + degrees;
    });

  // Drag gesture (one finger)
  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  // Animated styles for drag and rotation
  const dragStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const rotationStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: withSpring(`${rotate.value}deg`, {
          damping: 30,
          stiffness: 150,
          mass: 0.5,
        }),
      },
    ],
  }));

  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[dragStyle, { top: -350 }]}>
        <GestureDetector gesture={rotation}>
          <Animated.View style={rotationStyle}>
            <GestureDetector gesture={doubleTap}>
              <Animated.Image
                source={stickerSource}
                resizeMode="contain"
                style={[imageStyle, { width: imageSize, height: imageSize }]}
              />
            </GestureDetector>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}

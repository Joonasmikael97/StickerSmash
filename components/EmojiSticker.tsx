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
  const rotate = useSharedValue(0);
  const rotationOffset = useSharedValue(0);

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = Math.round(scaleImage.value / 2);
      }
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });

  const rotation = Gesture.Rotation()
    .onStart(() => {
      rotationOffset.value = rotate.value;
    })
    .onUpdate((event) => {
      const rotationFactor = 2.5; // Adjust sensitivity if needed
      const degrees = ((event.rotation * 180) / Math.PI) * rotationFactor;
      rotate.value = rotationOffset.value + degrees;
    });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withSpring(`${rotate.value}deg`, {
            damping: 30,
            stiffness: 150,
            mass: 0.5,
          }),
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={rotation}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <GestureDetector gesture={doubleTap}>
          <Animated.Image
            source={stickerSource}
            resizeMode="contain"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}

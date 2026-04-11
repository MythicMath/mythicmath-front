import { StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  children: React.ReactNode;
};

export default function CardAuth({ children }: Props) {
  const theme = useTheme();

  const translateY = useSharedValue(40);
  const opacity = useSharedValue(0.5);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 400 });
    opacity.value = withTiming(1, { duration: 600 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      className="w-full p-6 rounded-lg border gap-4"
      style={[
        animatedStyle,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}

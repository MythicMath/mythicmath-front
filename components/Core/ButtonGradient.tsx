import { Pressable, ColorValue, View, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useTheme } from "@/hooks/useTheme";

type GradientColors = readonly [ColorValue, ColorValue, ...ColorValue[]];

type Props = {
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;

  children: React.ReactNode;

  bgColored?: GradientColors;
  bgColoredPressed?: GradientColors;
};

export default function ButtonGradient({
  onPress,
  disabled = false,
  loading = false,
  bgColored,
  bgColoredPressed,
  children,
}: Props) {
  const theme = useTheme();

  const defaultBg = bgColored ?? theme.gradients.bgColored;
  const defaultBgPressed = bgColoredPressed ?? theme.gradients.bgColoredPressed;

  const isDisabled = disabled || loading;

  return (
    <Pressable testID="gradient-button" onPress={onPress} disabled={isDisabled}>
      {({ pressed }) => (
        <View
          className={`rounded-xl overflow-hidden ${
            isDisabled ? "opacity-50" : pressed ? "opacity-80" : ""
          }`}
        >
          <LinearGradient
            colors={pressed ? defaultBgPressed : defaultBg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex-row justify-center items-center p-4 gap-4"
          >
            {loading ? (
              <ActivityIndicator
                testID="loading-indicator"
                color={theme.colors.textLight}
              />
            ) : (
              children
            )}
          </LinearGradient>
        </View>
      )}
    </Pressable>
  );
}

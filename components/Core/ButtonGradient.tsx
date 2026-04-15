import { Pressable, ColorValue, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";

type GradientColors = readonly [ColorValue, ColorValue, ...ColorValue[]];

type Props = {
  onPress?: () => void;
  disabled?: boolean;
  children: React.ReactNode;

  bgColored?: GradientColors;
  bgColoredPressed?: GradientColors;
};

export default function ButtonGradient({
  onPress,
  disabled,
  bgColored,
  bgColoredPressed,
  children,
}: Props) {
  const theme = useTheme();

  const defaultBg = bgColored ?? theme.gradients.bgColored;
  const defaultBgPressed = bgColoredPressed ?? theme.gradients.bgColoredPressed;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
    >
      {({ pressed }) => (
        <View
          className={`rounded-xl overflow-hidden ${
            disabled ? "opacity-50" : pressed ? "opacity-80" : ""
          }`}
        >
          <LinearGradient
            colors={pressed ? defaultBgPressed : defaultBg}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="flex flex-row justify-center items-center p-4 gap-4"
          >
            {children}
          </LinearGradient>
        </View>
      )}
    </Pressable>
  );
}

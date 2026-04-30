import { View, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router } from "expo-router";

import { AppText } from "./AppText";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  title?: string;

  showBack?: boolean;
  onBackPress?: () => void;

  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;

  className?: string;
  color?: string;
  backgroundColor?: string;
};

export function AppHeader({
  title,
  showBack = true,
  onBackPress,
  rightIcon,
  onRightPress,
  className = "",
  color = "",
  backgroundColor = "",
}: Props) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingTop: 16 + insets.top,
        backgroundColor: backgroundColor,
      }}
      className={`w-full pb-3 px-4 flex-row items-center justify-between ${className}`}
    >
      {/* LEFT (Back) */}
      <View className="w-10">
        {showBack && (
          <Pressable
            onPress={onBackPress || (() => router.back())}
            className="p-2 rounded-full"
          >
            <Ionicons name="chevron-back" size={24} color={color} />
          </Pressable>
        )}
      </View>

      {/* TITLE */}
      <View className="flex-1 items-center">
        {title && (
          <AppText variant="title" className="text-center" color={color}>
            {title}
          </AppText>
        )}
      </View>

      {/* RIGHT ACTION */}
      <View className="w-10 items-end">
        {rightIcon && (
          <Pressable onPress={onRightPress} className="p-2 rounded-full">
            <Ionicons
              name={rightIcon}
              size={22}
              color={theme.colors.foreground}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
}

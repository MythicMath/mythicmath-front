import React from "react";
import { Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { ProgressApp } from "../Core/ProgressApp";

type Props = {
  variant?: "dark" | "light";
  progressValue?: number;
  textLeft?: string;
  textRight?: string;
};

export function ProgressBar({
  variant,
  progressValue = 0,
  textLeft = "",
  textRight = "",
}: Props) {
  const theme = useTheme();

  const textColor =
    variant === "dark" ? theme.colors.textDark : theme.colors.textLight;

  return (
    <View className="w-full">
      <View className="flex-row justify-between mb-2">
        <Text className="text-sm font-medium" style={{ color: textColor }}>
          {textLeft}
        </Text>

        <Text className="text-sm font-semibold" style={{ color: textColor }}>
          {textRight}
        </Text>
      </View>

      <ProgressApp
        value={progressValue}
        bgColor={theme.colors.muted}
        color={theme.colors.link}
      />
    </View>
  );
}

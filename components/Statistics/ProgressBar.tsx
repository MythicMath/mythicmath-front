import React from "react";
import { View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { ProgressApp } from "../Core/ProgressApp";
import { AppText } from "../Core/AppText";

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
    variant === "dark" ? theme.colors.foreground : theme.colors.textLight;

  return (
    <View className="w-full">
      <View className="flex-row justify-between mb-2">
        <AppText variant="body" className="font-medium" color={textColor}>
          {textLeft}
        </AppText>

        <AppText variant="body" className="font-semibold" color={textColor}>
          {textRight}
        </AppText>
      </View>

      <ProgressApp
        value={progressValue}
        bgColor={theme.colors.muted}
        color={theme.colors.link}
      />
    </View>
  );
}

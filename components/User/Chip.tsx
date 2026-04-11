import React from "react";
import { Text, StyleSheet, ViewStyle, ColorValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";
import { AppText } from "../Core/AppText";

type Gradient = readonly [ColorValue, ColorValue, ...ColorValue[]];

type Props = {
  label: string;
  color?: string;
  backgroundColor?: string | Gradient;
  style?: ViewStyle;
  isTransparent?: boolean;
};

export function Chip({
  label,
  color,
  backgroundColor,
  style,
  isTransparent = false,
}: Props) {
  const theme = useTheme();

  const textColor = color ?? theme.colors.card;
  const bg = backgroundColor ?? theme.gradients.bgColoredPressed;

  const isGradient = Array.isArray(bg);

  const colorsLinear: Gradient = isTransparent
    ? [theme.colors.chipTransparent, theme.colors.chipTransparent]
    : isGradient
      ? (bg as Gradient)
      : [bg as ColorValue, bg as ColorValue];

  return (
    <LinearGradient
      colors={colorsLinear}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.container, style]}
      className="px-4 py-2"
    >
      <AppText
        variant="body"
        className="font-bold text-center"
        color={textColor}
      >
        {label}
      </AppText>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 999,
  },
});

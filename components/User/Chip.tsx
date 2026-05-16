import React from "react";
import { StyleSheet, ViewStyle, ColorValue } from "react-native";
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
  className?: string;
};

export function Chip({
  label,
  color,
  backgroundColor,
  style,
  isTransparent = false,
  className = "font-bold",
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
      className="px-3 py-1"
    >
      <AppText
        variant="body"
        className={`${className} text-center`}
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

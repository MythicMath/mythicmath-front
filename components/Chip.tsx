import React from "react";
import { Text, StyleSheet, ViewStyle, ColorValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";

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

  if (isTransparent) {
    return (
      <LinearGradient
        colors={[theme.colors.chipTransparent, theme.colors.chipTransparent]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.container, style]}
      >
        <Text style={[styles.text, { color: textColor }]}>{label}</Text>
      </LinearGradient>
    );
  }

  if (isGradient) {
    return (
      <LinearGradient
        colors={bg as Gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.container, style]}
      >
        <Text style={[styles.text, { color: textColor }]}>{label}</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[bg, bg] as Gradient}
      style={[styles.container, style]}
    >
      <Text style={[styles.text, { color: textColor }]}>{label}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  text: {
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },
});

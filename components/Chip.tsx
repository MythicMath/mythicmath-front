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
};

export function Chip({ label, color, backgroundColor, style }: Props) {
  const theme = useTheme();

  const textColor = color ?? theme.colors.card;
  const bg = backgroundColor ?? theme.gradients.bgColoredPressed;

  const isGradient = Array.isArray(bg);

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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  text: {
    fontSize: 13,
    fontWeight: "bold",
  },
});
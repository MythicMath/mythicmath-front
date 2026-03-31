import React from "react";
import { Text, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  label: string;
  color?: string;
  backgroundColor?: string | [string, string]; // 👈 supports both
  style?: ViewStyle;
};

export function Chip({ label, color, backgroundColor, style }: Props) {
  const { theme } = useTheme();

  const textColor = color ?? theme.chipForeground;
  const bg = backgroundColor ?? theme.chip;

  const isGradient = Array.isArray(bg);

  if (isGradient) {
    return (
      <LinearGradient
        colors={bg}
        start={{ x: 0, y: 0 }} // 👉 right
        end={{ x: 1, y: 0 }} // 👉 left
        style={[styles.container, style]}
      >
        <Text style={[styles.text, { color: textColor }]}>{label}</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={[bg, bg]} // fallback as solid
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

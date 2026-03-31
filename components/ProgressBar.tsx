import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { useTheme } from "@/hooks/useTheme";

type Props = {
  xpCurrent: number;
  xpToNextLevel: number;
  level: number;
  color?: string;
  backgroundColor?: string;
};

export function ProgressBar({
  xpCurrent,
  xpToNextLevel,
  level,
  color,
  backgroundColor,
}: Props) {
  const { theme } = useTheme();

  const progress = Math.min(xpCurrent / xpToNextLevel, 1);
  const percentage = Math.round(progress * 100);

  const fillColor = color ?? theme.progressBarForeground;
  const bgColor = backgroundColor ?? theme.progressBar;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progresso até o nível {level + 1}</Text>
        <Text style={styles.percentage}>{percentage}%</Text>
      </View>

      <View style={[styles.barBackground, { backgroundColor: bgColor }]}>
        <View
          style={[
            styles.barFill,
            {
              width: `${percentage}%`,
              backgroundColor: fillColor,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  percentage: {
    fontSize: 14,
    fontWeight: "600",
  },
  barBackground: {
    height: 10,
    width: "100%",
    backgroundColor: "#E5E7EB", // cinza claro
    borderRadius: 999,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    backgroundColor: "#4F46E5", // roxo bonito (pode trocar pelo theme)
    borderRadius: 999,
  },
});

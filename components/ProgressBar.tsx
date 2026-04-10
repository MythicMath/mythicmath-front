import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { ProgressApp } from "./Core/ProgressApp";

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
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: textColor }]}>{textLeft}</Text>
        <Text style={[styles.percentage, { color: textColor }]}>
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

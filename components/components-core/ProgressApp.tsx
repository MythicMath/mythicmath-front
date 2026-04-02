import { View, StyleSheet } from "react-native";

type ProgressAppProps = {
  value: number;
  bgColor?: string;
  color?: string;
};

export function ProgressApp({
  value,
  bgColor = "#eee",
  color = "#3b82f6",
}: ProgressAppProps) {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <View style={[styles.bar, { width: `${value}%`, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    borderRadius: 999,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
  },
});
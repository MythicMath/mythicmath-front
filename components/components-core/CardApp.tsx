import { View, StyleSheet, ViewStyle } from "react-native";

type Props = {
  children: React.ReactNode;
  width?: number | `${number}%`;
  style?: ViewStyle;
};

export function CardApp({ children, width = 100, style }: Props) {
  return <View style={[styles.card, { width }, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
});

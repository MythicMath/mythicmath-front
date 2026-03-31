import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ children, style }: Props) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.card,
          borderColor: theme.border,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
  },
});
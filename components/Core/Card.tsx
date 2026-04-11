import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function Card({ children, style }: Props) {
  const theme = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.card,
          borderColor: theme.colors.border,
        },
        style,
      ]}
      className="p-6 rounded-md border"
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 110, // precise control that min-w-28 wouldnt do
  },
});

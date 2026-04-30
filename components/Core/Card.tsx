import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
};

export default function Card({ children, style, className = "" }: Props) {
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
      className={`p-6 rounded-md border ${className}`}
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

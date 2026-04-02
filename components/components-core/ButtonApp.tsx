import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "destructive" | "outline";
};

export function ButtonApp({
  title,
  onPress,
  variant = "primary",
}: Props) {
  const theme = useTheme();

  const styles = getStyles(theme, variant);

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const getStyles = (theme: any, variant: string) =>
  StyleSheet.create({
    button: {
      padding: theme.spacing.lg,
      borderRadius: theme.radius.lg,
      alignItems: "center",
      backgroundColor:
        variant === "primary"
          ? theme.colors.primary
          : variant === "secondary"
          ? theme.colors.secondary
          : variant === "destructive"
          ? theme.colors.destructive
          : "transparent",
      borderWidth: variant === "outline" ? 1 : 0,
      borderColor: theme.colors.border,
    },
    text: {
      color:
        variant === "primary"
          ? theme.colors.primaryForeground
          : theme.colors.foreground,
      fontWeight: "500",
    },
  });
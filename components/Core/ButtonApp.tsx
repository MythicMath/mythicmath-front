import { Pressable, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { AppText } from "./AppText";

type Props = {
  title: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "destructive" | "outline" | "ghost";
};

export function ButtonApp({ title, onPress, variant = "primary" }: Props) {
  const theme = useTheme();

  const styles = getStyles(theme, variant);

  return (
    <Pressable
      style={styles.button}
      className={`rounded-xl text-center border ${variant === "ghost" ? "" : "p-4"}`}
      onPress={onPress}
    >
      <AppText
        color={
          variant === "primary"
            ? theme.colors.primaryForeground
            : variant === "destructive"
              ? theme.colors.destructiveForeground
              : theme.colors.foreground
        }
        className="font-bold"
      >
        {title}
      </AppText>
    </Pressable>
  );
}
// style={styles.button}
const getStyles = (theme: any, variant: string) =>
  StyleSheet.create({
    button: {
      backgroundColor:
        variant === "primary"
          ? theme.colors.primary
          : variant === "secondary"
            ? theme.colors.secondary
            : variant === "destructive"
              ? theme.colors.destructive
              : "transparent",

      borderColor: variant === "outline" ? theme.colors.border : "transparent",

      borderWidth: variant === "outline" ? 1 : 0,
    },
  });

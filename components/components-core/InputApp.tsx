import { TextInput, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";

export function InputApp(props: any) {
  const theme = useTheme();

  return (
    <TextInput
      placeholderTextColor={theme.colors.mutedForeground}
      style={styles.input}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#f3f3f5",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
});
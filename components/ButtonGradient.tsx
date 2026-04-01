import { Pressable, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "@/hooks/useTheme";
import { Sparkles } from "lucide-react-native";

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
};

export default function ButtonGradient({ title, onPress, disabled }: Props) {
  const theme = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.container,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
    >
      {({ pressed }) => (
        <LinearGradient
          colors={
            pressed ? theme.gradients.bgColoredPressed : theme.gradients.bgColored
          }
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          <Sparkles size={16} color="white" />
          <Text style={styles.text}>{title}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 8,
    borderRadius: 8,
  },

  gradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    padding: 14,
    borderRadius: 10,
  },

  text: {
    color: "white",
    fontWeight: "600",
  },

  pressed: {
    opacity: 0.9,
  },

  disabled: {
    opacity: 0.5,
  },
});

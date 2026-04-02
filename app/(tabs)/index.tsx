import { View, StyleSheet, Text } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const theme = useTheme();

  return (
    <View style={{ flex: 1 }}>
      {/* 🔥 Background gradient (only top 40%) */}
      <LinearGradient
        colors={theme.gradients.bgColored}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />

      {/* ✅ Full content */}
      <View style={styles.container}>
        <Text style={{ color: theme.colors.background }}>Hello Theme</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 240,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

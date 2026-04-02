import { router } from "expo-router";
import { Button, View, StyleSheet } from "react-native";

//Hook
import { useTheme } from "@/hooks/useTheme";

//Services
import { logout } from "@/src/api/auth.api";

//Componentes Core
import { BadgeApp } from "@/components/components-core/BadgeApp";
import { ButtonApp } from "@/components/components-core/ButtonApp";
import { CardApp } from "@/components/components-core/CardApp";
import { InputApp } from "@/components/components-core/InputApp";
import { ProgressApp } from "@/components/components-core/ProgressApp";
import { LinearGradient } from "expo-linear-gradient";

export default function SettingsScreen() {
  const theme = useTheme();

  async function handleLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

  return (
    <LinearGradient
      colors={theme.gradients.bgColored}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Logout */}
        <Button title="Logout" onPress={handleLogout} />

        {/* CardApp */}
        <CardApp width="90%">
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/* BadgeApp */}
            <BadgeApp label="BadgeApp" />

            {/* ButtonApp */}
            <ButtonApp title="Button Primary" />
            <ButtonApp title="Button Secondary" variant="secondary" />
            <ButtonApp title="Button Destructive" variant="destructive" />
            <ButtonApp title="Button Outline" variant="outline" />

            {/* InputApp */}
            <InputApp />

            {/* ProgressApp */}
            <ProgressApp value={50} />
          </View>
        </CardApp>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
});

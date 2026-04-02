import { View, Button } from "react-native";
import { router } from "expo-router";

//Hook
import { useTheme } from "@/hooks/useTheme";

//Services
import { logout } from "@/src/services/authService";

//Componentes Core
import { BadgeApp } from "@/components/components-core/BadgeApp";
import { ButtonApp } from "@/components/components-core/ButtonApp";
import { CardApp } from "@/components/components-core/CardApp";
import { InputApp } from "@/components/components-core/InputApp";
import { ProgressApp } from "@/components/components-core/ProgressApp";

export default function SettingsScreen() {
  const theme = useTheme();

  async function handleLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.link,
        justifyContent: "center",
        alignItems: "center",

        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
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
  );
}

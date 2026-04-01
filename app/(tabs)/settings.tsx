import { View, Button } from "react-native";
import { router } from "expo-router";

//Hook
import { useTheme } from "@/hooks/useTheme";

//Services
import { logout } from "@/src/services/authService";

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
        backgroundColor: theme.colors.background,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Logout */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

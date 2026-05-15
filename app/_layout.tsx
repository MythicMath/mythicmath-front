import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { initI18n } from "@/i18n";
import { AlertProvider } from "../contexts/alert/AlertProvider";

import "./global.css";

export default function RootLayout() {
  useEffect(() => {
    initI18n();
  }, []);

  return (
    <SafeAreaProvider>
      <AlertProvider>
        <Stack screenOptions={{ headerShown: false, animation: "none" }} />
      </AlertProvider>
    </SafeAreaProvider>
  );
}

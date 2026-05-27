import { useEffect, useState } from "react";
import { SplashScreen, Stack, router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { i18nInitialization } from "@/i18n";

import { getToken } from "@/src/api/auth.api";
import { profile } from "@/src/api/profile.api";

import { useProfileStore } from "@/store/profile";

import { AlertProvider } from "../contexts/alert/AlertProvider";

import { ROUTES } from "@/constants/routes";

import "./global.css";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isApplicationReady, setIsApplicationReady] = useState(false);

  const setProfile = useProfileStore((state) => state.setProfile);

  useEffect(() => {
    initializeApplication();
  }, []);

  useEffect(() => {
    if (!isApplicationReady) {
      return;
    }

    SplashScreen.hideAsync();
  }, [isApplicationReady]);

  async function initializeApplication() {
    try {
       await i18nInitialization;

      const authenticationToken = await getToken();

      if (!authenticationToken) {
        redirectToLogin();

        return;
      }

      const userProfile = await profile();

      setProfile(userProfile);

      redirectToHome();
    } catch (error) {
      console.error("INITIALIZATION_ERROR", error);

      redirectToLogin();
    } finally {
      setIsApplicationReady(true);
    }
  }

  function redirectToLogin() {
    router.replace(ROUTES.AUTH.LOGIN);
  }

  function redirectToHome() {
    router.replace(ROUTES.TABS.HOME);
  }

  return (
    <SafeAreaProvider>
      <AlertProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: "none",
          }}
        />
      </AlertProvider>
    </SafeAreaProvider>
  );
}

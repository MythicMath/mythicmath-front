import { router } from "expo-router";
import { View } from "react-native";

//Hook
import { useTheme } from "@/hooks/useTheme";

//Services
import { logout } from "@/src/api/auth.api";

//Componentes Core
import { ButtonApp } from "@/components/Core/ButtonApp";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import Card from "@/components/Core/Card";
import { AppText } from "@/components/Core/AppText";
import { useAlert } from "@/contexts/alert/useAlert";

export default function SettingsScreen() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { show } = useAlert();
  const i18nToSet = i18n.language.toUpperCase() === "PT" ? "EN" : "PT";

  async function handleLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

  async function handleSetLanguage() {
    try {
      const currentLang = i18n.language;
      const newLang = currentLang === "pt" ? "en" : "pt";

      await i18n.changeLanguage(newLang);
      await AsyncStorage.setItem("lang", newLang);
    } catch {
      const translatedMessage = t(`errors.CHANGE_LANGUAGE_ERROR`);

      show({
        type: "error",
        message: translatedMessage,
      });
    }
  }

  return (
    <LinearGradient
      colors={theme.gradients.bgColored}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex flex-1"
    >
      <View className="flex flex-1 justify-between items-center p-10 mt-8">
        <AppText variant="title" color={theme.colors.textLight}>
          {t("screen.config.title")}
        </AppText>
        <Card className="p-6" style={{ width: "100%" }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <ButtonApp
              title={`${t("screen.config.setLanguage")} ${i18nToSet}`}
              variant="outline"
              onPress={handleSetLanguage}
            />

            <ButtonApp
              title={t("screen.config.logout")}
              variant="destructive"
              onPress={handleLogout}
            />
          </View>
        </Card>
      </View>
    </LinearGradient>
  );
}

import { router } from "expo-router";
import { StyleSheet, View } from "react-native";

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

export default function SettingsScreen() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
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
    } catch (error) {
      console.error("Error changing language:", error);
    }
  }

  return (
    <LinearGradient
      colors={theme.gradients.bgColored}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <View style={styles.container}>
        <AppText variant="title">{t("screen.config.title")}</AppText>
        <Card style={{ width: "100%" }}>
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

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  title: {
    marginTop: 36,
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },

  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    marginTop: 20,
  },
});

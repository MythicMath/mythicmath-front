import React from "react";
import { StyleSheet, Text, View } from "react-native";

//Components
import { LoadingApp } from "@/components/Core/LoadingApp";
import UserInfo from "@/components/Home/UserInfo";

//Services
import { AppScrollView } from "@/components/AppScrollView";
import CardStatistics from "@/components/CardStatistics";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";

//Store
import { useProfileStore } from "@/store/profile";
import { useTranslation } from "react-i18next";

export default function Home() {
  const theme = useTheme();
  const { t } = useTranslation();

  const profileData = useProfileStore((s) => s.profile);

  if (!profileData) {
    return <LoadingApp />;
  }

  return (
    <AppScrollView>
      <LinearGradient
        colors={theme.gradients.bgColored}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.background}
      />

      <View style={styles.container}>
        <UserInfo
          name={profileData.name}
          image={profileData.image || ""}
          level={profileData.level}
          xpCurrent={profileData.xpCurrent}
          xpToNextLevel={profileData.xpToNextLevel}
        />
      </View>

      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-xl font-bold text-blue-500">
          Welcome to Nativewind!!!
        </Text>
      </View>

      <View
        style={{
          marginTop: 40,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CardStatistics
          variant="vertical"
          text={t("screen.home.currentStreak")}
          icon="fire"
          quantity={profileData.day_learning_streak}
        />
        <CardStatistics
          variant="vertical"
          text={t("screen.home.rankedVictories")}
          icon="trophy"
          quantity={profileData.ranked_victories}
        />
        <CardStatistics
          variant="vertical"
          text={t("screen.home.level")}
          icon="medal"
          quantity={profileData.level}
        />
      </View>
    </AppScrollView>
  );
}

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 260,
  },

  container: {
    marginTop: 40,
  },
});

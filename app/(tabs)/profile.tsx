import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

//Components
import { AppScrollView } from "@/components/Core/AppScrollView";
import { LoadingApp } from "@/components/Core/LoadingApp";
import CardStatistics from "@/components/Statistics/CardStatistics";
import ProfileCard from "@/components/User/ProfileCard";

//Services
import { useTheme } from "@/hooks/useTheme";
import { useProfileStore } from "@/store/profile";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const profileData = useProfileStore((s) => s.profile);

  if (!profileData) {
    return <LoadingApp />;
  }

  /*
  title: {
    marginTop: 36,
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
  */

  return (
    <AppScrollView>
      <LinearGradient
        colors={theme.gradients.bgColored}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute top-0 left-0 right-0 h-[260]"
      />

      <Text
        className="mt-10 text-2xl text-center"
        style={{ color: theme.colors.textLight }}
      >
        {t("screen.profile.title")}
      </Text>

      <View className="mt-8">
        {/* Profile Card Info */}
        <ProfileCard
          name={profileData?.name || ""}
          image={profileData?.image || ""}
          level={profileData?.level || 0}
          xpCurrent={profileData?.xpCurrent || 0}
          xpToNextLevel={profileData?.xpToNextLevel || 0}
        />

        {/* Profile Card Statistics */}

        <View style={{ paddingTop: 24, display: "flex", gap: 8 }}>
          <Text style={{ paddingVertical: 12, fontSize: 20 }}>
            {t("screen.profile.stats")}
          </Text>

          <CardStatistics
            text={t("screen.profile.currentStreak")}
            icon="fire"
            quantity={profileData?.day_learning_streak || 0}
          />
          <CardStatistics
            text={t("screen.profile.rankedVictories")}
            icon="trophy"
            quantity={profileData?.ranked_victories || 0}
          />
          <CardStatistics
            text={t("screen.profile.totalXP")}
            icon="lightning"
            quantity={profileData?.xpCurrent || 0}
          />
          <CardStatistics
            text={t("screen.profile.level")}
            icon="medal"
            quantity={profileData?.level || 0}
          />
        </View>
      </View>
    </AppScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 36,
    fontSize: 24,
    textAlign: "center",
    color: "white",
  },
});

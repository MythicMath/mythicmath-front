import React from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { AppScrollView } from "@/components/Core/AppScrollView";
import CardStatistics from "@/components/Statistics/CardStatistics";
import ProfileCard from "@/components/User/ProfileCard";
import { useTheme } from "@/hooks/useTheme";
import { useProfileStore } from "@/store/profile";
import { LinearGradient } from "expo-linear-gradient";
import { AppText } from "@/components/Core/AppText";
import { LoadingScreen } from "@/components/Core/LoadingScreen";

export default function ProfileScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const profileData = useProfileStore((s) => s.profile);

  if (!profileData) {
    return <LoadingScreen />;
  }

  return (
    <AppScrollView>
      <LinearGradient
        colors={theme.gradients.bgColored}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute top-0 left-0 right-0 h-[260]"
      />

      <AppText
        variant="title"
        className="mt-10 text-center"
        color={theme.colors.textLight}
      >
        {t("screen.profile.title")}
      </AppText>

      <View className="mt-8">
        {/* Profile Card Info */}
        <ProfileCard
          name={profileData?.username || ""}
          email={profileData?.email || ""}
          image={profileData?.image || ""}
          level={profileData?.level || 0}
          xpCurrent={profileData?.xpCurrent || 0}
          xpToNextLevel={profileData?.xpToNextLevel || 0}
          className="p-6"
        />

        {/* Profile Card Statistics */}
        <View className="pt-6 gap-0">
          <AppText className="py-3 text-xl">
            {t("screen.profile.stats")}
          </AppText>

          <View className="gap-5">
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
      </View>
    </AppScrollView>
  );
}

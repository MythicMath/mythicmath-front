import React from "react";
import { View } from "react-native";

//Components
import { LoadingApp } from "@/components/Core/LoadingApp";
import UserInfo from "@/components/Home/UserInfo";

//Services
import { AppScrollView } from "@/components/Core/AppScrollView";
import CardStatistics from "@/components/Statistics/CardStatistics";
import { useTheme } from "@/hooks/useTheme";
import { LinearGradient } from "expo-linear-gradient";

//Store
import { useProfileStore } from "@/store/profile";
import { useTranslation } from "react-i18next";
import CardHome from "@/components/Home/CardHome";
import { AppText } from "@/components/Core/AppText";

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
        className="absolute top-0 left-0 right-0 h-[260]"
      />

      <View className="mt-12">
        <UserInfo
          name={profileData.username}
          image={profileData.image || ""}
          level={profileData.level}
          xpCurrent={profileData.xpCurrent}
          xpToNextLevel={profileData.xpToNextLevel}
        />
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

      {/*TODO: Status precisa ser pego do backend */}
      <View className="flex flex-col gap-4 mt-6">
        <AppText variant="title">{t("screen.home.chooseMode")}</AppText>
        <CardHome mode="daily" status="available" />
        <CardHome mode="free" status="unavailable" />
        <CardHome mode="ranked" status="unavailable" />
      </View>
    </AppScrollView>
  );
}

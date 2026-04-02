import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

//Types
import { ProfileResponse } from "@/types/profile";

//Components
import UserInfo from "@/components/Home/UserInfo";
import { LoadingApp } from "@/components/components-core/LoadingApp";

//Services
import { AppScrollView } from "@/components/AppScrollView";
import CardStatistics from "@/components/CardStatistics";
import { useTheme } from "@/hooks/useTheme";
import { profile } from "@/src/api/profile.api";
import { LinearGradient } from "expo-linear-gradient";

export default function Home() {
  const theme = useTheme();

  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profile();
        setProfileData(data);
      } catch (error) {
        console.error("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  if (loading) {
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
        {/* Profile Card Info */}
        <UserInfo
          name={profileData?.name || ""}
          image={profileData?.image || ""}
          level={profileData?.level || 0}
          xpCurrent={profileData?.xpCurrent || 0}
          xpToNextLevel={profileData?.xpToNextLevel || 0}
        />
      </View>

      <View
        style={{
          marginTop:  40,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <CardStatistics
          variant="vertical"
          text="Streak"
          icon="fire"
          quantity={profileData?.day_learning_streak || 0}
        />
        <CardStatistics
          variant="vertical"
          text="Vitórias"
          icon="trophy"
          quantity={profileData?.ranked_victories || 0}
        />

        <CardStatistics
          variant="vertical"
          text="Nível"
          icon="medal"
          quantity={profileData?.level || 0}
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

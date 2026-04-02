import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

//Types
import { ProfileResponse } from "@/types/profile";

//Components
import { AppScrollView } from "@/components/AppScrollView";
import CardStatistics from "@/components/CardStatistics";
import { LoadingApp } from "@/components/components-core/LoadingApp";
import ProfileCard from "@/components/Profile/ProfileCard";

//Services
import { useTheme } from "@/hooks/useTheme";
import { profile } from "@/src/api/profile.api";
import { LinearGradient } from "expo-linear-gradient";

export default function ProfileScreen() {
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
            Estatísticas
          </Text>

          <CardStatistics
            text="Dias Seguidos"
            icon="fire"
            quantity={profileData?.day_learning_streak || 0}
          />
          <CardStatistics
            text="Vitórias Ranqueadas"
            icon="trophy"
            quantity={profileData?.ranked_victories || 0}
          />
          <CardStatistics
            text="Experiência (XP)"
            icon="lightning"
            quantity={profileData?.xpCurrent || 0}
          />
          <CardStatistics
            text="Nível Atual"
            icon="medal"
            quantity={profileData?.level || 0}
          />
        </View>
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
    marginTop: 120,
  },
});

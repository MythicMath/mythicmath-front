import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, Button, Image, ActivityIndicator } from "react-native";

//Types
import { ProfileResponse } from "@/types/profile";

//Components
import Card from "@/components/Card";
import ProfileStatistics from "@/components/Profile/ProfileStatistics";

//Services
import { logout } from "@/src/services/authService";
import { profile } from "@/src/services/profileService";

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function handleLogout() {
    await logout();
    router.replace("/(auth)/login");
  }

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
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      {/* Profile Card Info */}
      <Card>
        <Text>Image: {profileData?.image}</Text>
        <Text>Name: {profileData?.name}</Text>
        <Text>Level: {profileData?.level}</Text>
        <Text>XP: {profileData?.xpCurrent}</Text>
        <Text>Next Level XP: {profileData?.xpToNextLevel}</Text>
      </Card>

      {/* Profile Card Statistics */}

      <View style={{ paddingTop: 24 }}>
        <Text
          style={{ paddingHorizontal: 24, paddingVertical: 12, fontSize: 20 }}
        >
          Estatísticas
        </Text>
        <Card>
          <ProfileStatistics
            text="Dias Seguidos"
            icon="fire"
            quantity={profileData?.day_learning_streak || 0}
          />
        </Card>
        <Card>
          <ProfileStatistics
            text="Vitórias Ranqueadas"
            icon="trophy"
            quantity={profileData?.ranked_victories || 0}
          />
        </Card>
        <Card>
          <ProfileStatistics
            text="Experiência (XP)"
            icon="lightning"
            quantity={profileData?.xpCurrent || 0}
          />
        </Card>
        <Card>
          <ProfileStatistics
            text="Nível Atual"
            icon="medal"
            quantity={profileData?.level || 0}
          />
        </Card>
      </View>

      {/* Optional image */}
      {profileData?.image && (
        <Image
          source={{ uri: profileData.image }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
        />
      )}

      {/* Logout */}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

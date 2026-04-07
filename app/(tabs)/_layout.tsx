import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "@/hooks/useTheme";
import { profile } from "@/src/api/profile.api";
import { useEffect, useState } from "react";
import { LoadingApp } from "@/components/components-core/LoadingApp";
import { useProfileStore } from "@/store/profile";

export default function TabsLayout() {
  const [loading, setLoading] = useState(true);

  const theme = useTheme();
  const insets = useSafeAreaInsets();

  const setProfile = useProfileStore((s) => s.setProfile);

  const loadUser = async () => {
    try {
      setLoading(true);
      const data = await profile();
      setProfile(data);
    } catch (error: any) {
      if (error?.response?.status !== 401) {
        console.error("Profile load error:", error);
      }
    }
  };

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        await loadUser();
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <LoadingApp />;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom,
          paddingTop: 8,
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

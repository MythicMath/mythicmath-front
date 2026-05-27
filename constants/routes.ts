export const ROUTES = {
  AUTH: {
    LOGIN: "/(auth)/login",
    REGISTER: "/(auth)/register",
  },

  TABS: {
    HOME: "/(tabs)",
    PROFILE: "/(tabs)/profile",
    SETTINGS: "/(tabs)/settings",
  },

  PROFILE: {
    EDIT: "/profile/edit-profile",
  },
} as const;
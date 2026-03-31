//Icons
import EvilIcons from "@expo/vector-icons/EvilIcons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export const StatisticIcons = {
  fire: {
    icon: FontAwesome6,
    iconName: "fire",
    colorKey: "fire",
  },
  trophy: {
    icon: EvilIcons,
    iconName: "trophy",
    colorKey: "fire",
  },
  lightning: {
    icon: MaterialCommunityIcons,
    iconName: "lightning-bolt-outline",
    colorKey: "blue",
  },
  medal: {
    icon: MaterialCommunityIcons,
    iconName: "medal-outline",
    colorKey: "green",
  },
} as const;

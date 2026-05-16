import { useTheme } from "@/hooks/useTheme";
import { StatisticIcons } from "@/icons/StatisticIcons";
import { View } from "react-native";
import Card from "../Core/Card";
import { AppText } from "../Core/AppText";

type IconKey = keyof typeof StatisticIcons;

type Props = {
  variant?: "vertical" | "horizontal";
  text: string;
  quantity: number;
  icon: IconKey;
};

export default function CardStatistics({
  variant,
  text,
  quantity,
  icon,
}: Props) {
  const theme = useTheme();

  const IconConfig = StatisticIcons[icon];
  const IconComponent = IconConfig.icon;

  const color = theme.colors[IconConfig.colorKey];

  const isVertical = variant === "vertical";

  return (
    <Card
      className="p-6"
      style={{
        // iOS shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,

        // Android shadow
        elevation: 6,
      }}
    >
      {isVertical ? (
        <View className="flex-col justify-center items-center gap-3">
          <View className="flex-col items-center gap-3">
            <View className="w-10 h-9 rounded-xl justify-center items-center">
              <IconComponent
                name={IconConfig.iconName}
                size={20}
                color={color}
              />
            </View>

            <View className="justify-center">
              <AppText
                className="font-bold text-lg text-center"
                color={theme.colors.foreground}
              >
                {quantity}
              </AppText>
            </View>
          </View>

          <View className="justify-center max-w-[80]">
            <AppText
              className="text-base text-center"
              color={theme.colors.foreground}
            >
              {text}
            </AppText>
          </View>
        </View>
      ) : (
        <View className="flex-row justify-between pr-4">
          <View className="flex-row gap-3">
            <View
              className="w-10 h-10 rounded-xl justify-center items-center"
              style={{ backgroundColor: theme.colors.muted }}
            >
              <IconComponent
                name={IconConfig.iconName}
                size={20}
                color={color}
              />
            </View>

            <View className="justify-center">
              <AppText className="text-base" color={theme.colors.foreground}>
                {text}
              </AppText>
            </View>
          </View>

          <View className="justify-center">
            <AppText
              className="font-bold text-lg"
              color={theme.colors.foreground}
            >
              {quantity}
            </AppText>
          </View>
        </View>
      )}
    </Card>
  );
}

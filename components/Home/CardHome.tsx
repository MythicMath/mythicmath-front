import { Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
// Theme and Translation
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

//Components
import { AppText } from "../Core/AppText";
import { StatisticIcons } from "@/icons/StatisticIcons";
import { Chip } from "../User/Chip";
import Card from "../Core/Card";

type Props = {
  mode: "daily" | "free" | "ranked";
  status: "available" | "unavailable";
};

export default function CardHome({ mode, status }: Props) {
  const { t } = useTranslation();
  const theme = useTheme();

  const cards: Record<
    Props["mode"],
    {
      title: string;
      info_one: string;
      info_two?: string;
      background: readonly [string, string, ...string[]];
      icon: keyof typeof StatisticIcons;
    }
  > = {
    daily: {
      title: "screen.home.gameModes.daily.title",
      info_one: "screen.home.gameModes.daily.infoOne",
      background: theme.gradients.daily,
      icon: "calendar",
    },

    free: {
      title: "screen.home.gameModes.free.title",
      info_one: "screen.home.gameModes.free.infoOne",
      info_two: "screen.home.gameModes.free.infoTwo",
      background: theme.gradients.free,
      icon: "heart",
    },

    ranked: {
      title: "screen.home.gameModes.ranked.title",
      info_one: "screen.home.gameModes.ranked.infoOne",
      info_two: "screen.home.gameModes.ranked.infoTwo",
      background: theme.gradients.ranked,
      icon: "trophy",
    },
  };

  const currCard = cards[mode];

  const IconConfig = StatisticIcons[currCard.icon];
  const IconComponent = IconConfig.icon;

  return (
    <Pressable className="active:opacity-80 active:scale-[0.98]">
      <Card className="pt-4 p-6 rounded-2xl flex flex-row gap-6 shadow-sm">
        <LinearGradient
          colors={[...currCard.background]}
          style={{ borderRadius: 12 }}
          className="w-14 h-14 justify-center items-center flex my-auto"
        >
          <IconComponent
            name={IconConfig.iconName}
            size={24}
            color={theme.colors.background}
          />
        </LinearGradient>

        <View>
          <AppText variant="card-title">{t(currCard.title)}</AppText>

          <View className="mt-2 mb-4 gap-1 flex flex-row">
            <AppText>{t(currCard.info_one)}</AppText>
            {currCard.info_two && (
              <View className="flex flex-row">
                <AppText className="pr-1"> • </AppText>
                <AppText>{t(currCard.info_two)}</AppText>
              </View>
            )}
          </View>

          <View className="self-start">
            {status === "available" && (
              <Chip
                label={t("screen.home.gameModes.available")}
                className="text-center"
                color={theme.colors.availableForeground}
                backgroundColor={theme.colors.available}
              />
            )}
          </View>
        </View>
      </Card>
    </Pressable>
  );
}

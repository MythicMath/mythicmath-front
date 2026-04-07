import { Text, View } from "react-native";

//Theme
import { Chip } from "../Chip";
import { ProgressBar } from "../ProgressBar";
import { Avatar } from "../Avatar";
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";

type Props = {
  image: string;
  name: string;

  level: number;
  xpCurrent: number;
  xpToNextLevel: number;
};

export default function UserInfo({
  name,
  image,
  level,
  xpCurrent,
  xpToNextLevel,
}: Props) {
  const { t } = useTranslation();

  const levelText = `${t("screen.home.level")} ${level}`;
  const theme = useTheme();

  const progress = Math.min(xpCurrent / xpToNextLevel, 1);

  const progressValue = progress * 100;

  return (
    <View>
      <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
        <Avatar size={56} uri={image} name={name} />

        <View style={{ display: "flex", paddingBottom: 20 }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              color: theme.colors.textLight,
              marginBottom: 5,
            }}
          >
            {name}
          </Text>

          <Chip
            label={levelText}
            style={{ width: 70 }}
            color="white"
            isTransparent
          />
        </View>
      </View>

      <ProgressBar
        variant="light"
        progressValue={progressValue}
        textLeft={`XP:  ${xpCurrent}`}
        textRight={`${t("screen.home.progressUntil")} ${xpToNextLevel}`}
      />
    </View>
  );
}

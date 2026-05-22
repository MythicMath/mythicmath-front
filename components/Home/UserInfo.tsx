import { View } from "react-native";

//Theme
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { AppText } from "../Core/AppText";
import { ProgressBar } from "../Statistics/ProgressBar";
import { AvatarProfile } from "../User/AvatarProfile";
import { Chip } from "../User/Chip";
import { AvatarKey } from "@/constants/avatars";

type Props = {
  image: AvatarKey;
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
      <View className="flex flex-row gap-3">
        <AvatarProfile size={56} source={image} name={name} />

        <View className="flex pb-5">
          <AppText
            variant="title"
            className="mb-2"
            color={theme.colors.textLight}
          >
            {name}
          </AppText>

          <Chip
            label={levelText}
            style={{ width: 70 }}
            color={theme.colors.textLight}
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

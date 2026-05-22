import { router } from "expo-router";
import { View } from "react-native";

//Theme
import { useTheme } from "@/hooks/useTheme";
import { useTranslation } from "react-i18next";
import { AppText } from "../Core/AppText";
import { ButtonApp } from "../Core/ButtonApp";
import Card from "../Core/Card";
import { ProgressBar } from "../Statistics/ProgressBar";
import { AvatarProfile } from "./AvatarProfile";
import { Chip } from "./Chip";
import { AvatarKey } from "@/constants/avatars";

type Props = {
  image: AvatarKey;
  name: string;
  email: string;

  level: number;
  xpCurrent: number;
  xpToNextLevel: number;

  className?: string;
};

export default function ProfileCard({
  name,
  email,
  image,
  level,
  xpCurrent,
  xpToNextLevel,
  className = "",
}: Props) {
  const theme = useTheme();
  const { t } = useTranslation();

  const levelText = `${t("screen.profile.level")} ${level}`;

  const progress = Math.min(xpCurrent / xpToNextLevel, 1);

  const progressValue = progress * 100;

  const percentage = Math.round(progress * 100);

  return (
    <Card
      className={className}
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
      <View
        style={{
          alignItems: "center",
          gap: 12,
        }}
      >
        <AvatarProfile size={86} source={image} name={name} />

        <View className="absolute top-3 right-3">
          <ButtonApp
            title={t("screen.profile.editProfile.buttonLink")}
            variant="ghost"
            onPress={() => router.push("/profile/edit-profile")}
          />
        </View>

        <AppText className="text-center font-bold" variant="title">
          {name}
        </AppText>
        <AppText
          className="text-center font-bold"
          variant="body"
          color={theme.colors.textSoftDark}
        >
          {email}
        </AppText>

        <Chip label={levelText} style={{ marginBottom: 16 }} />
      </View>

      <ProgressBar
        variant="dark"
        progressValue={progressValue}
        textLeft={`${t("screen.profile.progressUntil")} ${level + 1}`}
        textRight={`${percentage}%`}
      />
    </Card>
  );
}

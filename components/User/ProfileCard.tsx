import { View } from "react-native";
import { router } from "expo-router";

//Theme
import { useTranslation } from "react-i18next";
import Card from "../Core/Card";
import { ProgressBar } from "../Statistics/ProgressBar";
import { Avatar } from "./Avatar";
import { Chip } from "./Chip";
import { AppText } from "../Core/AppText";
import { useTheme } from "@/hooks/useTheme";
import { ButtonApp } from "../Core/ButtonApp";

type Props = {
  image: string;
  name: string;

  level: number;
  xpCurrent: number;
  xpToNextLevel: number;

  className?: string;
};

export default function ProfileCard({
  name,
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

  const handleUpload = async () => {
    console.info(
      "TODO: Add logica para selecionar uma imagem da própria aplicação ou usar avatar dependedndo do tipo de login feito",
    );
  };

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
        <Avatar size={86} uri={image} name={name} onEditPress={handleUpload} />

        <View className="absolute top-3 right-3">
          <ButtonApp
            title={t("screen.profile.editProfile.buttonLink")}
            variant="ghost"
            onPress={() => router.push("/profile/edit-profile")}
          />
        </View>

        <AppText
          className="text-center font-bold"
          variant="title"
          color={theme.colors.textDark}
        >
          {name}
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

import { Text, View } from "react-native";

//Theme

import Card from "../Card";
import { Chip } from "../Chip";
import { ProgressBar } from "../ProgressBar";
import { Avatar } from "../Avatar";
import { useTranslation } from "react-i18next";

type Props = {
  image: string;
  name: string;

  level: number;
  xpCurrent: number;
  xpToNextLevel: number;
};

export default function ProfileCard({
  name,
  image,
  level,
  xpCurrent,
  xpToNextLevel,
}: Props) {
  const { t } = useTranslation();

  const levelText = `${t("screen.profile.level")} ${level}`;

  const progress = Math.min(xpCurrent / xpToNextLevel, 1);

  const progressValue = progress * 100;

  const percentage = Math.round(progress * 100);

  const handleUpload = async () => {
    console.log(
      "TODO: Add logica para selecionar uma imagem da própria aplicação ou usar avatar dependedndo do tipo de login feito",
    );
  };

  return (
    <Card
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

        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          {name}
        </Text>

        <Chip label={levelText} />
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

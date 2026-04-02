import { StatisticIcons } from "@/icons/StatisticIcons";
import { Text, View } from "react-native";

//Theme

import Card from "../Card";
import { ProgressBar } from "../ProgressBar";
import { Chip } from "../Chip";
import { Avatar } from "./Avatar";
import * as ImagePicker from "expo-image-picker";
import { updateAvatar } from "@/src/services/profileService";

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
  const levelText = `Nível ${level}`;

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
        xpCurrent={xpCurrent}
        xpToNextLevel={xpToNextLevel}
        level={level}
      />
    </Card>
  );
}

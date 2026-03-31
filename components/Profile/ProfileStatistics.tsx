import { StatisticIcons } from "@/icons/StatisticIcons";
import { Text, View } from "react-native";

//Theme
import { useTheme } from "@/hooks/useTheme";
import Card from "../Card";

type IconKey = keyof typeof StatisticIcons;

type Props = {
  text: string;
  quantity: number;
  icon: IconKey;
};

export default function ProfileStatistics({ text, quantity, icon }: Props) {
  const Icon = StatisticIcons[icon];
  const { theme } = useTheme();

  const color = theme[Icon.colorKey];

  return (
    <Card>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
          }}
        >
          <View
            style={{
              backgroundColor: theme.muted,
              width: 40,
              height: 40,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <Icon.icon name={Icon.iconName} size={20} color={color} />
          </View>

          <View style={{ marginVertical: "auto" }}>
            <Text style={{ fontSize: 18, color: theme.text }}>{text}</Text>
          </View>
        </View>

        <View style={{ marginVertical: "auto" }}>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: theme.text }}>
            {quantity}
          </Text>
        </View>
      </View>
    </Card>
  );
}

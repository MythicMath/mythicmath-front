import { StatisticIcons } from "@/icons/StatisticIcons";
import { Text, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import Card from "../Card";

type IconKey = keyof typeof StatisticIcons;

type Props = {
  text: string;
  quantity: number;
  icon: IconKey;
};

export default function ProfileStatistics({
  text,
  quantity,
  icon,
}: Props) {
  const theme = useTheme();

  const IconConfig = StatisticIcons[icon];
  const IconComponent = IconConfig.icon;

  const color = theme.colors[IconConfig.colorKey];

  return (
    <Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 12,
          }}
        >
          <View
            style={{
              backgroundColor: theme.colors.muted,
              width: 40,
              height: 40,
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconComponent
              name={IconConfig.iconName}
              size={20}
              color={color}
            />
          </View>

          <View style={{ justifyContent: "center" }}>
            <Text
              style={{
                fontSize: 16,
                color: theme.colors.foreground,
              }}
            >
              {text}
            </Text>
          </View>
        </View>

        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              color: theme.colors.foreground,
            }}
          >
            {quantity}
          </Text>
        </View>
      </View>
    </Card>
  );
}
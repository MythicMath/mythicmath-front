import { useTheme } from "@/hooks/useTheme";
import { StatisticIcons } from "@/icons/StatisticIcons";
import { Text, View } from "react-native";
import Card from "../Core/Card";

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
        <View
          style={{
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 12,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <View
              style={{
                width: 40,
                height: 36,
                borderRadius: 12,
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
                  fontWeight: "bold",
                  fontSize: 18,
                  color: theme.colors.foreground,
                  textAlign: "center",
                }}
              >
                {quantity}
              </Text>
            </View>
          </View>

          <View style={{ justifyContent: "center", maxWidth: 80 }}>
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
      ) : (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingRight: 16,
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
                borderRadius: 12,
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
      )}
    </Card>
  );
}

import React from "react";
import { View, Image, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { AppText } from "../Core/AppText";

type Props = {
  uri?: string;
  name?: string;
  size?: number;
  onEditPress?: () => void;
};

export function Avatar({
  uri,
  name = "default",
  size = 100,
  onEditPress,
}: Props) {
  const theme = useTheme();

  const getInitials = () => {
    if (!name) return "?";

    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0][0]?.toUpperCase();
    }

    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const showImage = !!uri;

  return (
    <View style={{ width: size, height: size }}>
      {/* Avatar */}
      {showImage ? (
        <Image
          source={{ uri }}
          className="rounded-full"
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      ) : (
        <View
          className="justify-center items-center rounded-full"
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.colors.muted,
          }}
        >
          <Text
            style={{
              fontSize: size / 2.5,
              fontWeight: "bold",
              color: theme.colors.textDark,
            }}
          >
            {getInitials()}
          </Text>
        </View>
      )}

      {/* Edit Button */}
      {onEditPress && (
        <Pressable
          onPress={onEditPress}
          className="absolute bottom-0 right-0 w-7 h-7 rounded-full justify-center items-center border-2"
          style={{
            backgroundColor: theme.colors.primary,
            borderColor: theme.colors.background,
          }}
        >
          <Ionicons name="camera" size={16} color="#fff" />
        </Pressable>
      )}
    </View>
  );
}

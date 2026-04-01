import React from "react";
import { View, Image, StyleSheet, Pressable, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";

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

  // ✅ Generate initials
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
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
          }}
        />
      ) : (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: theme.colors.muted,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: size / 2.5,
              fontWeight: "bold",
              color: theme.colors.text,
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
          style={[
            styles.editButton,
            {
              backgroundColor: theme.colors.primary,
              borderColor: theme.colors.background,
            },
          ]}
        >
          <Ionicons name="camera" size={16} color="#fff" />
        </Pressable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
});

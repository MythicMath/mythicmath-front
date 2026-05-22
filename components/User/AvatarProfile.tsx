import React, { useState } from "react";
import { View, Image, Pressable, Text, Modal } from "react-native";

import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";

import { useTheme } from "@/hooks/useTheme";

import { AvatarList } from "./AvatarList";
import { AvatarKey, avatars } from "../../constants/avatars";
import { useTranslation } from "react-i18next";

type Props = {
  source?: AvatarKey;
  name?: string;
  size?: number;
  onChange?: (avatar: AvatarKey) => void;
};

export function AvatarProfile({
  source,
  name = "default",
  size = 100,
  onChange,
}: Props) {
  const theme = useTheme();
  const { t } = useTranslation();

  const [showAvatarModal, setShowAvatarModal] = useState(false);

  const getInitials = () => {
    if (!name) return "?";

    const parts = name.trim().split(" ");

    if (parts.length === 1) {
      return parts[0][0]?.toUpperCase();
    }

    return (parts[0][0] + parts[1][0]).toUpperCase();
  };

  const showImage = !!source && !!avatars[source];

  function handleSelectAvatar(avatar: AvatarKey) {
    onChange?.(avatar);
    
    console.log("TODO: SENT TO API NEW AVATAR: " + avatar);
    setShowAvatarModal(false);
  }

  return (
    <>
      <View className="items-center">
        {/* Avatar */}
        <View style={{ width: size, height: size }}>
          {showImage ? (
            <Image
              source={avatars[source]}
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
                  color: theme.colors.foreground,
                }}
              >
                {getInitials()}
              </Text>
            </View>
          )}

          {/* Edit Button */}
          <Pressable
            onPress={() => setShowAvatarModal(true)}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full justify-center items-center border-2"
            style={{
              backgroundColor: theme.colors.link,
              borderColor: theme.colors.background,
            }}
          >
            <Entypo name="edit" size={12} color={theme.colors.textLight} />
          </Pressable>
        </View>
      </View>

      {/* Modal */}
      <Modal
        visible={showAvatarModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAvatarModal(false)}
      >
        <View
          className="flex-1 justify-center items-center px-6"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            className="w-full rounded-3xl p-6"
            style={{
              backgroundColor: theme.colors.background,
            }}
          >
            {/* Header */}
            <View className="flex-row justify-between items-center mb-5">
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: theme.colors.foreground,
                }}
              >
                {t("screen.profile.editProfile.chooseAvatar")}
              </Text>

              <Pressable
                onPress={() => setShowAvatarModal(false)}
                className="w-8 h-8 rounded-full justify-center items-center"
                style={{
                  backgroundColor: theme.colors.secondary,
                }}
              >
                <Ionicons
                  name="close"
                  size={18}
                  color={theme.colors.foreground}
                />
              </Pressable>
            </View>

            {/* Avatar List */}
            <AvatarList
              images={avatars}
              selected={source}
              onSelect={handleSelectAvatar}
            />
          </View>
        </View>
      </Modal>
    </>
  );
}

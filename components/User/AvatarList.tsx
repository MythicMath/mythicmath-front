import React from "react";
import { FlatList, Image, Pressable } from "react-native";

import { useTheme } from "@/hooks/useTheme";
import { AvatarKey } from "@/constants/avatars";

type Props = {
  images: Record<string, any>;
  selected?: string;
  onSelect: (image: AvatarKey) => void;
};

export function AvatarList({ images, selected, onSelect }: Props) {
  const theme = useTheme();

  return (
    <FlatList
      data={Object.entries(images)}
      keyExtractor={(_, index) => String(index)}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        justifyContent: "space-between",
        marginBottom: 16,
      }}
      contentContainerStyle={{
        paddingBottom: 8,
      }}
      renderItem={({ item }) => {
        const [key, image] = item;

        const isSelected = selected === key;

        return (
          <Pressable
            onPress={() => onSelect(key as AvatarKey)}
            className="items-center justify-center"
            style={{
              width: 90,
              height: 90,
              borderRadius: 999,
              borderWidth: isSelected ? 3 : 0,
              borderColor: theme.colors.link,
              padding: 3,
            }}
          >
            <Image
              source={image}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 999,
              }}
            />
          </Pressable>
        );
      }}
    />
  );
}

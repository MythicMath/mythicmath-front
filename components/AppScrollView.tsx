import React from "react";
import { ScrollView, ScrollViewProps, StyleProp, ViewStyle } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = ScrollViewProps & {
  contentStyle?: StyleProp<ViewStyle>;
};

export function AppScrollView({
  children,
  contentStyle,
  ...rest
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      {...rest}
      contentContainerStyle={[
        {
          paddingBottom: 20, // 👈 IF NEEDED, CHANGE THIS VALUE TO (80 + insets.bottom)
          paddingTop: 16,
          paddingHorizontal: 16,
        },
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
}
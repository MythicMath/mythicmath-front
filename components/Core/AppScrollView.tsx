import React from "react";
import {
  ScrollView,
  ScrollViewProps,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

type Props = ScrollViewProps & {
  contentStyle?: StyleProp<ViewStyle>;
};

export function AppScrollView({ children, contentStyle, ...rest }: Props) {
  return (
    <ScrollView {...rest} showsVerticalScrollIndicator={false}>
      <View className="p-6">{children}</View>
    </ScrollView>
  );
}

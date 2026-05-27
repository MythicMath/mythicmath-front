import { ActivityIndicator, View, Text } from "react-native";

export function LoadingScreen() {
  return (
    <View className="flex flex-1 justify-center items-center">
      <Text>TODO: MELHORAR DESIGN LOADING MYTHIC MATH PAGE</Text>
      <ActivityIndicator />
    </View>
  );
}

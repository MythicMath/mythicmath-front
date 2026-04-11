import { ActivityIndicator, View } from "react-native";

export function LoadingApp() {
  return (
    <View className="flex flex-1 justify-center items-center">
      <ActivityIndicator />
    </View>
  );
}

import { View } from "react-native";

type ProgressAppProps = {
  value: number;
  bgColor?: string;
  color?: string;
};

export function ProgressApp({
  value,
  bgColor = "#eee",
  color = "#3b82f6",
}: ProgressAppProps) {
  return (
    <View
      className="h-2 rounded-full overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      <View
        className="h-full"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </View>
  );
}

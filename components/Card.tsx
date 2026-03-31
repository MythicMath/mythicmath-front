import { StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";

type Props = {
  children: React.ReactNode;
};

export default function Card({ children }: Props) {
  const { theme } = useTheme();

  return (
    <View style={{ paddingHorizontal: 24, paddingVertical: 5, width: "100%" }}>
      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.card,
            borderColor: theme.border,
          },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    gap: 16,
  },
});

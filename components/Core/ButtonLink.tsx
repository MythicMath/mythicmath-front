import { Pressable, Text, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Href, Link } from "expo-router";

type Props = {
  title: string;
  href: Href;
};

export function ButtonLink({ title, href }: Props) {
  const theme = useTheme();

  return (
    <Link href={href} asChild>
      <Pressable
        style={({ pressed }) => [
          styles.container,
          { opacity: pressed ? 0.6 : 1 },
        ]}
      >
        <Text
          style={[
            styles.text,
            { color: theme.colors.link },
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "none",
  },
});
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
        style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
        className="mt-4"
      >
        <Text
          style={{ color: theme.colors.link }}
          className="text-center font-bold text-md no-underline"
        >
          {title}
        </Text>
      </Pressable>
    </Link>
  );
}

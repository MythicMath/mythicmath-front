import { Pressable } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { Href, Link } from "expo-router";
import { AppText } from "./AppText";

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
        <AppText
          className="text-center font-bold text-base"
          color={theme.colors.link}
        >
          {title}
        </AppText>
      </Pressable>
    </Link>
  );
}

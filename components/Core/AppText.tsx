import { Text } from "react-native";

type Props = {
  children: React.ReactNode;
  variant?: "title" | "card-title" | "body" | "caption";
  className?: string;
  color?: string;
};

export function AppText({
  children,
  variant = "body",
  className = "",
  color,
}: Props) {
  const variants = {
    title: "text-2xl font-semibold",
    "card-title": "text-lg font-semibold",
    body: "text-sm",
    caption: "text-xs",
  };

  return (
    <Text
      className={`${variants[variant]} ${className}`}
      style={color ? { color } : undefined}
    >
      {children}
    </Text>
  );
}

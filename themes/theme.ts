export type ThemeColors = {
  background: string;
  foreground: string;
  text: string;
  textSecondary: string;
  backgroundAuthDarker: [string, string];
  backgroundAuthClearer: [string, string];
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  error: string;
  purple: string;
  purpleDarker: string;
  blue: string;
  blueDarker: string;
  green: string;
  greenDarker: string;
  fire: string;
  fireDarker: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  border: string;
  input: string;
  inputBackground: string;
  switchBackground: string;
  ring: string;
};

export const lightTheme: ThemeColors = {
  background: "#ffffff",
  foreground: "#202020",

  text: "#202020",
  textSecondary: "#3e3e3e",

  backgroundAuthDarker: ["#7e22ce", "#1d4ed8"],
  backgroundAuthClearer: ["#9333ea", "#2563eb"],

  card: "#ffffff",
  cardForeground: "#202020",

  popover: "#ffffff",
  popoverForeground: "#202020",

  primary: "#030213",
  error: "#ff4d4f",

  purple: "#9333ea",
  purpleDarker: "#7e22ce",

  blue: "#2563eb",
  blueDarker: "#1d4ed8",

  green: "#71eb25",
  greenDarker: "#0b8b1a",

  fire: "#eb9f25",
  fireDarker: "#b31313",

  secondary: "#f4f4f5",
  secondaryForeground: "#030213",

  muted: "#ececf0",
  mutedForeground: "#717182",

  accent: "#e9ebef",
  accentForeground: "#030213",

  destructive: "#d4183d",
  destructiveForeground: "#ffffff",

  border: "rgba(0,0,0,0.1)",
  input: "transparent",
  inputBackground: "#f3f3f5",
  switchBackground: "#cbced4",

  ring: "#b4b4b4",
};
export const darkTheme: ThemeColors = {
  background: "#202020",
  foreground: "#fafafa",

  text: "#202020",
  textSecondary: "#2f2f2f",

  backgroundAuthDarker: ["#7e22ce", "#1d4ed8"],
  backgroundAuthClearer: ["#9333ea", "#2563eb"],

  card: "#202020",
  cardForeground: "#fafafa",

  popover: "#202020",
  popoverForeground: "#fafafa",

  primary: "#fafafa",
  error: "#ff4d4f",

  purple: "#9333ea",
  purpleDarker: "#7e22ce",

  blue: "#2563eb",
  blueDarker: "#1d4ed8",

  green: "#71eb25",
  greenDarker: "#0b8b1a",

  fire: "#eb9f25",
  fireDarker: "#b31313",

  secondary: "#3f3f46",
  secondaryForeground: "#fafafa",

  muted: "#3f3f46",
  mutedForeground: "#b4b4b4",

  accent: "#3f3f46",
  accentForeground: "#fafafa",

  destructive: "#b91c1c",
  destructiveForeground: "#fecaca",

  border: "#3f3f46",
  input: "#3f3f46",
  inputBackground: "#3f3f46",
  switchBackground: "#cbced4",

  ring: "#737373",
};

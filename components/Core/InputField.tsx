import { TextInput, Text, View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { AppText } from "./AppText";

type Props = {
  placeholder: string;
  value: string;
  onChange: (text: string) => void;
  error?: string;
  secureTextEntry?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  isFocused?: boolean;
};

export default function InputField({
  placeholder,
  value,
  onChange,
  error,
  secureTextEntry,
  onFocus,
  onBlur,
  isFocused,
}: Props) {
  const theme = useTheme();

  return (
    <View>
      <AppText>{placeholder}</AppText>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        autoCapitalize="none"
        className={`border rounded-xl p-4 ${isFocused && "border-2"}`}
        style={{
          borderColor: theme.colors.border,
          color: theme.colors.foreground,
          backgroundColor: theme.colors.inputBackground,
        }}
        placeholderTextColor={theme.colors.mutedForeground}
      />

      {error && (
        <AppText
          variant="caption"
          className="mt-1"
          color={theme.colors.destructive}
        >
          {error}
        </AppText>
      )}
    </View>
  );
}

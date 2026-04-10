import { TextInput, Text, View, StyleSheet } from "react-native";
import { useTheme } from "@/hooks/useTheme";

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
      <Text>{placeholder}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        secureTextEntry={secureTextEntry}
        onFocus={onFocus}
        onBlur={onBlur}
        autoCapitalize="none"
        style={[
          styles.input,
          {
            borderColor: theme.colors.border,
            color: theme.colors.foreground,
            backgroundColor: theme.colors.inputBackground,
          },
          isFocused && styles.focused,
        ]}
        placeholderTextColor={theme.colors.mutedForeground}
      />

      {error && (
        <Text style={[styles.error, { color: theme.colors.destructive }]}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
  },
  focused: {
    borderWidth: 2,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
  },
});

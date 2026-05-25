import { TextInput, View, Pressable } from "react-native";
import { useState } from "react";

import { useTheme } from "@/hooks/useTheme";
import { AppText } from "./AppText";

import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

type Props = {
  placeholder: string;
  value?: string;
  onChange: (text: string) => void;
  error?: string;

  secureTextEntry?: boolean;
  disabled?: boolean;

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
  disabled = false,
  onFocus,
  onBlur,
  isFocused,
}: Props) {
  const theme = useTheme();
  const { t } = useTranslation();

  const [isHidden, setIsHidden] = useState(secureTextEntry);

  return (
    <View>
      <AppText>{placeholder}</AppText>

      <View className="relative">
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChange}
          secureTextEntry={isHidden}
          editable={!disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          autoCapitalize="none"
          className={`border rounded-xl p-4 pr-12 ${
            isFocused ? "border-2" : ""
          } ${disabled ? "opacity-50" : ""}`}
          style={{
            borderColor: theme.colors.border,
            color: theme.colors.foreground,
            backgroundColor: theme.colors.inputBackground,
          }}
          placeholderTextColor={theme.colors.mutedForeground}
        />

        {secureTextEntry && (
          <Pressable
            disabled={disabled}
            onPress={() => setIsHidden((prev) => !prev)}
            className="absolute right-4 top-1/2 -translate-y-1/2"
          >
            <Ionicons
              name={isHidden ? "eye-off" : "eye"}
              size={20}
              color={theme.colors.mutedForeground}
            />
          </Pressable>
        )}
      </View>

      {error && (
        <AppText
          variant="caption"
          className="mt-1"
          color={theme.colors.destructive}
        >
          {t(`errors.${error}`)}
        </AppText>
      )}
    </View>
  );
}
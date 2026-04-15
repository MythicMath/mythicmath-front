import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import CardAuth from "@/components/User/CardAuth";
import ButtonGradient from "@/components/Core/ButtonGradient";
import InputField from "@/components/Core/InputField";
import { AppText } from "@/components/Core/AppText";
import { AppHeader } from "@/components/Core/AppHeader";

import { useTheme } from "@/hooks/useTheme";

// API
import { updateUser } from "@/src/api/profile.api";

// Schema
import { FormDataUpdateUser, updateUserSchema } from "@/helper/zodSchema/user";
import { useProfileStore } from "@/store/profile";

export default function EditProfileScreen() {
  const theme = useTheme();
  const { t } = useTranslation();

  // Aguardando o profile retornar email
  const profileData = useProfileStore((s) => s.profile);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataUpdateUser>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleUpdate(data: FormDataUpdateUser) {
    try {
      await updateUser({
        userId: 1,
        email: data.email,
        password: data.password || undefined,
      });

      alert("Profile updated successfully");

      router.back();
    } catch (error: any) {
      console.error(error);

      const message =
        error?.response?.data?.detail ||
        error?.message ||
        "Error updating profile";

      alert(message);
    }
  }

  return (
    <LinearGradient
      colors={theme.gradients.bgColored}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <AppHeader
        title={t("screen.profile.editProfile.title")}
        onBackPress={() => router.replace("/(tabs)/profile")}
        color={theme.colors.secondary}
      />

      <View className="flex-1 justify-center items-center p-6 pb-60">
        <AppText
          variant="body"
          className="text-center mb-4"
          color={theme.colors.secondary}
        >
          {t("screen.profile.editProfile.message")}
        </AppText>

        <CardAuth>
          {/* EMAIL */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder={t("screen.profile.editProfile.email")}
                value={value}
                onChange={onChange}
                error={errors.email?.message}
                isFocused={focusedInput === "email"}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
              />
            )}
          />

          {/* PASSWORD */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder={t("screen.profile.editProfile.password")}
                value={value}
                onChange={onChange}
                secureTextEntry
                error={errors.password?.message}
                isFocused={focusedInput === "password"}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
              />
            )}
          />

          <ButtonGradient onPress={handleSubmit(handleUpdate)}>
            <Sparkles size={16} color={theme.colors.textLight} />
            <AppText className="font-semibold" color={theme.colors.textLight}>
              {t("screen.profile.editProfile.saveButton")}
            </AppText>
          </ButtonGradient>
        </CardAuth>
      </View>
    </LinearGradient>
  );
}

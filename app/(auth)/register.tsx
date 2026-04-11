import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

// Components
import ButtonGradient from "@/components/Core/ButtonGradient";
import { ButtonLink } from "@/components/Core/ButtonLink";
import CardAuth from "@/components/User/CardAuth";

//Hook
import { useTheme } from "@/hooks/useTheme";

//API
import { FormDataRegister, registerSchema } from "@/helper/zodSchema/user";
import { register } from "@/src/api/auth.api";
import { Sparkles } from "lucide-react-native";
import InputField from "@/components/Core/InputField";

export default function RegisterScreen() {
  const theme = useTheme();
  const { t } = useTranslation();

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleRegister(data: FormDataRegister) {
    try {
      await register(data);
      router.replace("/(tabs)");
    } catch (error: any) {
      const message =
        error?.response?.data?.detail || error?.message || t("error.common");

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
      <View className="flex-1 justify-center items-center p-6">
        <Image
          source={require("@/assets/images/logo_transparent.png")}
          className="w-28 h-28 rounded-full mb-4"
        />

        <Text
          className="text-2xl font-semibold mb-1"
          style={{ color: theme.colors.secondary }}
        >
          {t("screen.register.title")}
        </Text>

        <Text
          className="text-sm text-center mb-4"
          style={{ color: theme.colors.secondary }}
        >
          {t("screen.register.description")}
        </Text>

        <CardAuth>
          {/* NAME */}
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder={t("screen.register.fields.name") + "*"}
                value={value}
                onChange={onChange}
                error={errors.name?.message}
                isFocused={focusedInput === "name"}
                onFocus={() => setFocusedInput("name")}
                onBlur={() => setFocusedInput(null)}
              />
            )}
          />

          {/* EMAIL */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder={t("screen.register.fields.email") + "*"}
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
                placeholder={t("screen.register.fields.password") + "*"}
                value={value}
                onChange={onChange}
                error={errors.password?.message}
                isFocused={focusedInput === "password"}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
              />
            )}
          />

          {/* CONFIRM PASSWORD */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder={t("screen.register.fields.confirmPassword") + "*"}
                value={value}
                onChange={onChange}
                error={errors.confirmPassword?.message}
                isFocused={focusedInput === "confirmPassword"}
                onFocus={() => setFocusedInput("confirmPassword")}
                onBlur={() => setFocusedInput(null)}
              />
            )}
          />

          <ButtonGradient onPress={handleSubmit(handleRegister)}>
            <Sparkles size={16} color="white" />
            <Text className="font-semibold" style={{ color: "white" }}>
              {t("screen.register.button.login")}
            </Text>
          </ButtonGradient>

          <ButtonLink
            title={t("screen.register.button.goToLogin")}
            href="/login"
          />
        </CardAuth>

        <View className="flex-row items-center gap-2 mt-4">
          <Text
            className="text-xs text-center"
            style={{ color: theme.colors.secondary }}
          >
            {t("screen.register.footer")}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

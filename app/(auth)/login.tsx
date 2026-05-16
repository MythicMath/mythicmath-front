import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";

// Components
import CardAuth from "@/components/User/CardAuth";
import ButtonGradient from "@/components/Core/ButtonGradient";
import { ButtonLink } from "@/components/Core/ButtonLink";

//Hook
import { useTheme } from "@/hooks/useTheme";

//API
import { login } from "@/src/api/auth.api";

//Zod Schema
import { FormDataLogin, loginSchema } from "@/helper/zodSchema/user";
import InputField from "@/components/Core/InputField";
import { AppText } from "@/components/Core/AppText";
import { useAlert } from "@/contexts/alert/useAlert";

export default function LoginScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { show } = useAlert();

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "analins1",
      password: "analins1",
    },
  });

  async function handleLogin(data: FormDataLogin) {
    const payload = {
      identifier: data.identifier,
      password: data.password,
    };

    try {
      await login(payload);
      router.replace("/(tabs)");
    } catch (error: any) {
      const translatedMessage = t(`errors.${error.friendlyMessage}`);

      show({
        type: "error",
        message: translatedMessage,
      });
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
          source={require("@/assets/images/icon_transparent.png")}
          className="w-28 h-28 rounded-full mb-4"
        />

        <AppText
          variant="title"
          className="mb-1"
          color={theme.colors.secondary}
        >
          {t("screen.login.title")}
        </AppText>

        <AppText
          variant="body"
          className="text-center mb-4"
          color={theme.colors.secondary}
        >
          {t("screen.login.description")}
        </AppText>

        <CardAuth>
          {/* IDENTIFIER */}
          <Controller
            control={control}
            name="identifier"
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder={t("screen.login.fields.nameEmail") + "*"}
                value={value}
                onChange={onChange}
                error={errors.identifier?.message}
                isFocused={focusedInput === "identifier"}
                onFocus={() => setFocusedInput("identifier")}
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
                placeholder={t("screen.login.fields.password") + "*"}
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

          <ButtonGradient onPress={handleSubmit(handleLogin)}>
            <Sparkles size={16} color={theme.colors.textLight} />
            <AppText className="font-semibold" color={theme.colors.textLight}>
              {t("screen.login.button.login")}
            </AppText>
          </ButtonGradient>

          <ButtonLink
            title={t("screen.login.button.goToRegister")}
            href="/register"
          />
        </CardAuth>

        <View className="flex-row items-center gap-2 mt-4">
          <AppText
            variant="caption"
            className="text-center"
            color={theme.colors.secondary}
          >
            {t("screen.login.footer")}
          </AppText>
        </View>
      </View>
    </LinearGradient>
  );
}

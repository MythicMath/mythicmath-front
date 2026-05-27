import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";

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
import { AppText } from "@/components/Core/AppText"; // 👈 add
import { useAlert } from "@/contexts/alert/useAlert";
import { profile } from "@/src/api/profile.api";
import { useProfileStore } from "@/store/profile";

export default function RegisterScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { show } = useAlert();
  const setProfile = useProfileStore((state) => state.setProfile);

  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function handleRegister(data: FormDataRegister) {
    try {
      setIsLoading(true);
      await register(data);

      const userProfile = await profile();

      setProfile(userProfile);

      router.replace("/(tabs)");
    } catch (error: any) {
      const translatedMessage = t(`errors.${error.friendlyMessage}`);

      show({
        type: "error",
        message: translatedMessage,
      });
    } finally {
      setIsLoading(false);
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
          source={require("@/assets/images/icon-transparent.png")}
          className="w-28 h-28 rounded-full mb-4"
        />

        <AppText
          variant="title"
          className="mb-1"
          color={theme.colors.secondary}
        >
          {t("screen.register.title")}
        </AppText>

        <AppText
          variant="body"
          className="text-center mb-4"
          color={theme.colors.secondary}
        >
          {t("screen.register.description")}
        </AppText>

        <CardAuth>
          {/* NAME */}
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <InputField
                placeholder={t("screen.register.fields.username") + "*"}
                value={value}
                disabled={isLoading}
                onChange={onChange}
                error={errors.username?.message}
                isFocused={focusedInput === "username"}
                onFocus={() => setFocusedInput("username")}
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
                disabled={isLoading}
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
                disabled={isLoading}
                onChange={onChange}
                secureTextEntry
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
                disabled={isLoading}
                onChange={onChange}
                secureTextEntry
                error={errors.confirmPassword?.message}
                isFocused={focusedInput === "confirmPassword"}
                onFocus={() => setFocusedInput("confirmPassword")}
                onBlur={() => setFocusedInput(null)}
              />
            )}
          />

          <ButtonGradient
            onPress={handleSubmit(handleRegister)}
            loading={isLoading}
          >
            <Sparkles size={16} color={theme.colors.textLight} />
            <AppText className="font-semibold" color={theme.colors.textLight}>
              {t("screen.register.button.login")}
            </AppText>
          </ButtonGradient>

          <ButtonLink
            title={t("screen.register.button.goToLogin")}
            href="/login"
          />
        </CardAuth>

        <View className="flex-row items-center gap-2 mt-4">
          <AppText
            variant="caption"
            className="text-center"
            color={theme.colors.secondary}
          >
            {t("screen.register.footer")}
          </AppText>
        </View>
      </View>
    </LinearGradient>
  );
}

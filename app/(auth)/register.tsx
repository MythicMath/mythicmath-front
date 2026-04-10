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
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo_transparent.png")}
          style={styles.logo}
        />

        <Text style={[styles.title, { color: theme.colors.secondary }]}>
          {t("screen.register.title")}
        </Text>

        <Text style={[styles.message, { color: theme.colors.secondary }]}>
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
            <Text style={{ color: "white", fontWeight: 600 }}>
              {t("screen.register.button.login")}
            </Text>
          </ButtonGradient>

          <ButtonLink
            title={t("screen.register.button.goToLogin")}
            href="/login"
          />
        </CardAuth>

        <View style={styles.messageRow}>
          <Text
            style={[styles.messageBottom, { color: theme.colors.secondary }]}
          >
            {t("screen.register.footer")}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  logo: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 4,
  },

  message: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },

  messageBottom: {
    fontSize: 12,
    textAlign: "center",
  },

  messageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 16,
  },

  input: {
    width: "100%",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },

  focused: {
    borderWidth: 2,
  },

  error: {
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
  },
});

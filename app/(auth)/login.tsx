import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { Sparkles } from "lucide-react-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

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

export default function LoginScreen() {
  const theme = useTheme();
  const { t } = useTranslation();

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataLogin>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "ana",
      password: "password",
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
      console.error(error);

      const message =
        error?.response?.data?.detail || error?.message || "Erro ao logar";

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
          {t("screen.login.title")}
        </Text>

        <Text style={[styles.message, { color: theme.colors.secondary }]}>
          {t("screen.login.description")}
        </Text>

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
            <Sparkles size={16} color="white" />
            <Text style={{ color: "white", fontWeight: 600 }}>
              {t("screen.login.button.login")}
            </Text>
          </ButtonGradient>

          <ButtonLink
            title={t("screen.login.button.goToRegister")}
            href="/register"
          />
        </CardAuth>

        <View style={styles.messageRow}>
          <Text
            style={[styles.messageBottom, { color: theme.colors.secondary }]}
          >
            {t("screen.login.footer")}
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
    borderRadius: 10,
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

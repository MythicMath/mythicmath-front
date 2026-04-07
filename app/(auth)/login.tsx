import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

// Components
import ButtonGradient from "@/components/ButtonGradient";
import { ButtonLink } from "@/components/ButtonLink";
import CardAuth from "@/components/CardAuth";

//Hook
import { useTheme } from "@/hooks/useTheme";

//API
import { login } from "@/src/api/auth.api";

//Zod Schema
import { FormDataLogin, loginSchema } from "@/helper/zodSchema/user";

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
      console.log(error);

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
              <>
                <TextInput
                  placeholder={t("screen.login.fields.nameEmail") + "*"}
                  value={value}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  onFocus={() => setFocusedInput("identifier")}
                  onBlur={() => setFocusedInput(null)}
                  style={[
                    styles.input,
                    {
                      borderColor: theme.colors.border,
                      color: theme.colors.foreground,
                      backgroundColor: theme.colors.inputBackground,
                    },
                    focusedInput === "identifier" && styles.focused,
                  ]}
                  placeholderTextColor={theme.colors.mutedForeground}
                />

                {errors.identifier && (
                  <Text
                    style={[styles.error, { color: theme.colors.destructive }]}
                  >
                    {errors.identifier.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* PASSWORD */}
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder={t("screen.login.fields.password") + "*"}
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => setFocusedInput("password")}
                  onBlur={() => setFocusedInput(null)}
                  style={[
                    styles.input,
                    {
                      borderColor: theme.colors.border,
                      color: theme.colors.foreground,
                      backgroundColor: theme.colors.inputBackground,
                    },
                    focusedInput === "password" && styles.focused,
                  ]}
                  placeholderTextColor={theme.colors.mutedForeground}
                />

                {errors.password && (
                  <Text
                    style={[styles.error, { color: theme.colors.destructive }]}
                  >
                    {errors.password.message}
                  </Text>
                )}
              </>
            )}
          />

          <ButtonGradient
            title={t("screen.login.button.login")}
            onPress={handleSubmit(handleLogin)}
          />

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

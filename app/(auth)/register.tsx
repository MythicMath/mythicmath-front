import { zodResolver } from "@hookform/resolvers/zod";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

// Components
import ButtonGradient from "@/components/ButtonGradient";
import { ButtonLink } from "@/components/ButtonLink";
import CardAuth from "@/components/CardAuth";

//Hook
import { useTheme } from "@/hooks/useTheme";

//API
import { FormDataRegister, registerSchema } from "@/helper/zodSchema/user";
import { register } from "@/src/api/auth.api";

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
              <>
                <TextInput
                  placeholder={t("screen.register.fields.name") + "*"}
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => setFocusedInput("name")}
                  onBlur={() => setFocusedInput(null)}
                  style={[
                    styles.input,
                    {
                      borderColor: theme.colors.border,
                      color: theme.colors.foreground,
                      backgroundColor: theme.colors.inputBackground,
                    },
                    focusedInput === "name" && styles.focused,
                  ]}
                  placeholderTextColor={theme.colors.mutedForeground}
                />

                {errors.name && (
                  <Text
                    style={[styles.error, { color: theme.colors.destructive }]}
                  >
                    {errors.name.message}
                  </Text>
                )}
              </>
            )}
          />

          {/* EMAIL */}
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder={t("screen.register.fields.email") + "*"}
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setFocusedInput("email")}
                  onBlur={() => setFocusedInput(null)}
                  style={[
                    styles.input,
                    {
                      borderColor: theme.colors.border,
                      color: theme.colors.foreground,
                      backgroundColor: theme.colors.inputBackground,
                    },
                    focusedInput === "email" && styles.focused,
                  ]}
                  placeholderTextColor={theme.colors.mutedForeground}
                />

                {errors.email && (
                  <Text
                    style={[styles.error, { color: theme.colors.destructive }]}
                  >
                    {errors.email.message}
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
                  placeholder={t("screen.register.fields.password") + "*"}
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

          {/* CONFIRM PASSWORD */}
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder={
                    t("screen.register.fields.confirmPassword") + "*"
                  }
                  secureTextEntry
                  value={value}
                  onChangeText={onChange}
                  onFocus={() => setFocusedInput("confirmPassword")}
                  onBlur={() => setFocusedInput(null)}
                  style={[
                    styles.input,
                    {
                      borderColor: theme.colors.border,
                      color: theme.colors.foreground,
                      backgroundColor: theme.colors.inputBackground,
                    },
                    focusedInput === "confirmPassword" && styles.focused,
                  ]}
                  placeholderTextColor={theme.colors.mutedForeground}
                />

                {errors.confirmPassword && (
                  <Text
                    style={[styles.error, { color: theme.colors.destructive }]}
                  >
                    {errors.confirmPassword.message}
                  </Text>
                )}
              </>
            )}
          />

          <ButtonGradient
            title={t("screen.register.button.login")}
            onPress={handleSubmit(handleRegister)}
          />

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

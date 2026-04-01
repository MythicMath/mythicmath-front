import { View, StyleSheet, TextInput, Text, Image } from "react-native";
import { router } from "expo-router";
import { useTheme } from "@/hooks/useTheme";
import { ButtonLink } from "@/components/ButtonLink";
import ButtonGradient from "@/components/ButtonGradient";
import CardAuth from "@/components/CardAuth";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { login } from "@/src/services/authService";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, "Nome ou e-mail é obrigatório")
    .refine((value) => {
      if (!value) return true;

      if (value.includes("@")) {
        return emailRegex.test(value);
      }

      return value.length >= 2;
    }, "Digite um nome ou e-mail válido"),

  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type FormData = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const theme = useTheme();

  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: "ana",
      password: "password",
    },
  });

  async function handleLogin(data: FormData) {
    const payload = {
      identifier: data.identifier,
      password: data.password,
    };

    try {
      await login(payload);
      alert("Logado!");
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
          MythicMath
        </Text>

        <Text style={[styles.message, { color: theme.colors.secondary }]}>
          Transforme seu treino de matemática em diversão
        </Text>

        <CardAuth>
          {/* IDENTIFIER */}
          <Controller
            control={control}
            name="identifier"
            render={({ field: { onChange, value } }) => (
              <>
                <TextInput
                  placeholder="Nome ou Email*"
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
                  placeholder="Senha*"
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

          <ButtonGradient title="Entrar" onPress={handleSubmit(handleLogin)} />

          <ButtonLink title="Não tem conta? Cadastre-se" href="/register" />
        </CardAuth>

        <View style={styles.messageRow}>
          <Text
            style={[
              styles.messageBottom,
              { color: theme.colors.secondary },
            ]}
          >
            🎮 Ganhe XP • 🏆 Conquiste rankings • ⚡ Desafie amigos
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

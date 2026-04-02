// auth.service.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY } from "../constants/auth.constants";

export async function setToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function clearAuth() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}
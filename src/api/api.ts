import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { PUBLIC_ROUTES, TOKEN_KEY } from "../constants/auth.constants";

import { navigateToLogin } from "../services/navigation.service";
import { clearAuth } from "../services/auth.service";

let isLoggingOut = false;

const api = axios.create({
  baseURL: "http://10.0.2.2:8000",
});

api.interceptors.request.use(
  async (config) => {
    const url = config.url ?? "";
    const isPublic = PUBLIC_ROUTES.some((route) => url.startsWith(route));

    if (!isPublic) {
      const token = await AsyncStorage.getItem(TOKEN_KEY);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const url = error.config?.url ?? "";

    const isLoginRoute = url.includes("/login");

    if (status === 401 && !isLoginRoute && !isLoggingOut) {
      try {
        isLoggingOut = true;
        await clearAuth();
        navigateToLogin();
      } finally {
        isLoggingOut = false;
      }
    }

    return Promise.reject(error);
  },
);

export default api;

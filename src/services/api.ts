import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOKEN_KEY, PUBLIC_ROUTES } from "../constants/auth.constants";
const api = axios.create({
  baseURL: "http://10.0.2.2:8000",
  //baseURL: "http://SEU_IP:8000",
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
  async (error) => {
    if (error.response?.status === 401) {
      await AsyncStorage.removeItem(TOKEN_KEY);
    }

    return Promise.reject(error);
  },
);

export default api;

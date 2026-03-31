import api from "./api";
import { ProfileResponse } from "../../types/profile";
import { ApiEndpoints } from "../constants/api.endpoints";

// ENDPOINTS __________

// Get profile info MOCKADO
export const profile = async (): Promise<ProfileResponse> => {
  /*
  const response = await api.get<ProfileResponse>(ApiEndpoints.PROFILE);
  console.log("response:", response.data);
  return response.data;
  */
  return {
    userId: 11,
    name: "Maria José",
    image: null,
    day_learning_streak: 12,
    ranked_victories: 13,
    xpCurrent: 14,
    xpToNextLevel: 15,
    level: 16,
  };
};

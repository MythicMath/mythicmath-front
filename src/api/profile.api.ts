import {
  EditUserRequest,
  ProfileResponse,
  UpdateAvatarResponse,
} from "../../types/profile";
import { ApiEndpoints } from "../constants/api.endpoints";
import api from "./api";

// ENDPOINTS __________

// Get profile info
export const profile = async (): Promise<ProfileResponse> => {
  const response = await api.get<ProfileResponse>(ApiEndpoints.PROFILE);
  return response.data;
};

//Update Avatar
export const updateAvatar = async (
  formData: FormData,
): Promise<UpdateAvatarResponse> => {
  const response = await api.put<UpdateAvatarResponse>(
    ApiEndpoints.CHANGE_AVATAR,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

// Update profile
export const updateUser = async (
  data: EditUserRequest,
): Promise<ProfileResponse> => {
  const { userId, ...userData } = data;
  const payload = {
    email: userData.email,
    password: userData.password,
    current_password: userData.currentPassword,
  };

  const response = await api.patch<ProfileResponse>(
    `${ApiEndpoints.EDIT_USER}/${userId}`,
    payload,
  );
  return response.data;
};

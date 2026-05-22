import { AvatarKey } from "@/constants/avatars";

export interface ProfileResponse {
  userId: number;
  username: string;
  email: string;
  image: AvatarKey;
  day_learning_streak: number;
  ranked_victories: number;
  xpCurrent: number;
  xpToNextLevel: number;
  level: number;
}

export interface UpdateAvatarResponse {
  result: boolean;
  image: string;
}

export interface EditUserRequest {
  userId: number,
  email?: string;
  password?: string;
  currentPassword: string;
}
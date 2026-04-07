import { ProfileResponse } from "@/types/profile";
import { create } from "zustand";

type ProfileStore = {
  profile: ProfileResponse | null;
  setProfile: (data: ProfileResponse) => void;
  clearProfile: () => void;
};

export const useProfileStore = create<ProfileStore>((set) => ({
  profile: null,
  setProfile: (data) => set({ profile: data }),
  clearProfile: () => set({ profile: null }),
}));

import { type CreatePlaylist } from "@/types/playlist";
import { type Stages } from "@/types/stages";
import { type UserProfile } from "@spotify/web-api-ts-sdk";
import { create } from "zustand";

const testPlaylist: CreatePlaylist = {
  name: "Testing awsome playlist",
  description: "This playlist is the perfect test playlist",
  trackIds: ["4RsL2ZlU4P0CIKDrOwQkzz"],
};

interface Store {
  stage: Stages;
  file?: File;
  trackIds: string[];
  localPlaylist: CreatePlaylist;
  user?: UserProfile;

  setStage: (stage: Stages) => void;
  setCurrentUser: (user: UserProfile) => void;
  setLocalPlaylist: (localPlaylist: CreatePlaylist) => void;
  setTrackIds: (trackIds: string[]) => void;
  setFile: (file: File) => void;
  removeFile: () => void;
}

export const useGlobalStore = create<Store>((set) => ({
  stage: "landing",
  file: undefined,
  trackIds: [],
  localPlaylist: testPlaylist,
  currentUser: undefined,

  setTrackIds: (trackIds) => set({ trackIds }),
  setCurrentUser: (user) => set({ user }),
  setLocalPlaylist: (localPlaylist) => set({ localPlaylist }),
  setFile: (file) => set({ file }),
  setStage: (stage) => set({ stage }),
  removeFile: () => set({ file: undefined }),
}));

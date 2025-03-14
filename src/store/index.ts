import { type CreatePlaylist } from "@/types/playlist";
import { type Stages } from "@/types/stages";
import { type UserProfile } from "@spotify/web-api-ts-sdk";
import { create } from "zustand";

const defaultPlaylist: CreatePlaylist = {
  name: "",
  description: "",
  trackIds: [],
};

interface Store {
  stage: Stages;
  file?: File;
  trackIds: string[];
  localPlaylist: CreatePlaylist;
  user?: UserProfile;
  stageProgress: Record<Stages, boolean>;

  setStage: (stage: Stages) => void;
  setCurrentUser: (user: UserProfile) => void;
  setLocalPlaylist: (localPlaylist: CreatePlaylist) => void;
  setTrackIds: (trackIds: string[]) => void;
  removeTrackId: (trackId: string) => void;
  addTrackId: (trackId: string) => void;
  setFile: (file: File) => void;
  removeFile: () => void;
  completeStage: (stage: Stages) => void;
  resetData: () => void;
}

export const useGlobalStore = create<Store>((set) => ({
  stage: "landing",
  file: undefined,
  trackIds: [],
  localPlaylist: defaultPlaylist,
  currentUser: undefined,
  stageProgress: {
    landing: true,
    upload: false,
    processing: false,
    selecting: false,
    complete: false,
    summary: false
  },

  setTrackIds: (trackIds) => set({ trackIds }),
  removeTrackId: (trackId) => set(({ localPlaylist }) => ({
    localPlaylist: { ...localPlaylist, trackIds: localPlaylist.trackIds.filter((id) => id !== trackId) }
  })),
  addTrackId: (trackId) =>
    set(({ localPlaylist }) => {
      return {
        localPlaylist: { ...localPlaylist, trackIds: [...localPlaylist.trackIds, trackId] }
      };
    }),
  setCurrentUser: (user) => set({ user }),
  setLocalPlaylist: (localPlaylist) => set({ localPlaylist }),
  setFile: (file) => set({ file }),
  setStage: (stage) => set({ stage }),
  removeFile: () => set({ file: undefined }),
  completeStage: (stage) => set((state) => ({
    stageProgress: { ...state.stageProgress, [stage]: true }
  })),
  resetData: () => set({
    file: undefined,
    trackIds: [],
    localPlaylist: defaultPlaylist,
    stageProgress: {
      landing: true,
      upload: false,
      processing: false,
      selecting: false,
      complete: false,
      summary: false
    }
  })
}));

import { type PlaylistDetails, type Stages } from "@/types/stages";
import { create } from "zustand";

interface Store {
  stage: Stages;
  file?: File;
  trackIds: string[];
  playlistDetails: PlaylistDetails;

  setPlaylistDetails: (playlistDetails: {
    playlistName: string;
    playlistDescription?: string;
  }) => void;
  setStage: (stage: Stages) => void;
  setTrackIds: (trackIds: string[]) => void;
  setFile: (file: File) => void;
  removeFile: () => void;
}

export const useGlobalStore = create<Store>((set) => ({
  stage: "authentication",
  file: undefined,
  trackIds: [],
  playlistDetails: { playlistName: "", playlistDescription: "" },

  setPlaylistDetails: (playlistDetails) => set({ playlistDetails }),
  setTrackIds: (trackIds) => set({ trackIds }),
  setFile: (file) => set({ file }),
  setStage: (stage) => set({ stage }),
  removeFile: () => set({ file: undefined }),
}));

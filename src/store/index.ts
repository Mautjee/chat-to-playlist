import { type Stages } from "@/types/stages";
import { create } from "zustand";

interface Store {
  stage: Stages;
  file?: File;
  trackIds: string[];

  setStage: (stage: Stages) => void;
  setTrackIds: (trackIds: string[]) => void;
  setFile: (file: File) => void;
  removeFile: () => void;
}

export const useGlobalStore = create<Store>((set) => ({
  stage: "landing",
  file: undefined,
  trackIds: [],

  setTrackIds: (trackIds) => set({ trackIds }),
  setFile: (file) => set({ file }),
  setStage: (stage) => set({ stage }),
  removeFile: () => set({ file: undefined }),
}));

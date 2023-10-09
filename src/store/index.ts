import { type Stages } from "@/types/stages";
import { create } from "zustand";

interface Store {
  stage: Stages;

  setStage: (stage: Stages) => void;
}

export const useGlobalStore = create<Store>((set) => ({
  stage: "authentication",
  setStage: (stage) => set({ stage }),
}));

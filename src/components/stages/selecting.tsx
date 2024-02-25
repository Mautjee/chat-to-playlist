import { useGlobalStore } from "@/store";
import { useState } from "react";

export const Selecting = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const setPlaylistDetails = useGlobalStore(
    (state) => state.setPlaylistDetails,
  );
  const setStage = useGlobalStore((state) => state.setStage);

  async function onSubmit() {
    if (!playlistName || !playlistDescription) return;
    setPlaylistDetails({ playlistName, playlistDescription });
    setStage("summary");
  }

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold text-white">
          What will the name of the playist be
        </p>
        <input
          id="playlist-name"
          className="rounded-md bg-gray-800 p-2 text-white"
          type="text"
          placeholder="Playlist name"
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <input
          id="playlist-description"
          className="rounded-md bg-gray-800 p-2 text-white"
          type="text"
          placeholder="Playlist description"
          onChange={(e) => setPlaylistDescription(e.target.value)}
        />
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={onSubmit}
        >
          Summary
        </button>
      </div>
    </div>
  );
};

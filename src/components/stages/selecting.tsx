import { useGlobalStore } from "@/store";
import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const Selecting = () => {
  const trackIds = useGlobalStore((state) => state.trackIds);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const setLocalPlaylist = useGlobalStore((state) => state.setLocalPlaylist);
  const setStage = useGlobalStore((state) => state.setStage);
  const completeStage = useGlobalStore((state) => state.completeStage);

  const onSubmit = () => {
    setLocalPlaylist({
      name: playlistName,
      description: playlistDescription,
      trackIds: trackIds,
    });
    completeStage("selecting");
    setStage("summary");
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <div className="flex h-full w-1/2 flex-col items-center justify-center gap-4">
        <p>What will the name of the playist be:</p>
        <Input
          id="playlist-name"
          type="text"
          placeholder="Playlist name"
          onChange={(e) => setPlaylistName(e.target.value)}
        />
        <Input
          id="playlist-description"
          type="text"
          placeholder="Playlist description"
          onChange={(e) => setPlaylistDescription(e.target.value)}
        />
        <Button 
          onClick={onSubmit}
          disabled={!playlistName.trim()}
        >
          Create playlist
        </Button>
      </div>
    </div>
  );
};

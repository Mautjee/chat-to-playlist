import { useGlobalStore } from "@/store";
import { SongCard } from "../song-card";
import spotify from "@/lib/spotify-sdk/ClientInstance";
import { useState } from "react";
import { Button } from "../ui/button";

export const Summary = () => {
  const localPlaylist = useGlobalStore((state) => state.localPlaylist);
  const user = useGlobalStore((state) => state.user);
  const setLocalPlaylist = useGlobalStore((state) => state.setLocalPlaylist);
  const setStage = useGlobalStore((state) => state.setStage);
  const [isSucces, setIsSucces] = useState(false);

  const getSongCard = () => {
    return localPlaylist.trackIds.map((song, key) => {
      return <SongCard key={key} song={song} />;
    });
  };

  const createUri = (id: string) => {
    return `spotify:track:${id}`;
  };

  const handleMakePlaylist = async () => {
    if (!user || isSucces) return;
    const response = await spotify.playlists.createPlaylist(user.id, {
      name: localPlaylist.name,
      description: localPlaylist.description,
      public: true,
      collaborative: false,
    });
    if (localPlaylist.trackIds.length > 100) {
      const ids = localPlaylist.trackIds;
      const chunks = [];
      while (ids.length > 99) {
        chunks.push(ids.splice(0, 99));
      }
      void chunks.map(async (chunk) => {
        await spotify.playlists.addItemsToPlaylist(response.id, chunk);
      });
      setIsSucces(true);
    } else {
      await spotify.playlists.addItemsToPlaylist(
        response.id,
        localPlaylist.trackIds.map(createUri),
      );
      setIsSucces(true);
    }

    console.log("Playlist created!");
  };

  const handleStartOver = () => {
    setLocalPlaylist({ name: "", description: "", trackIds: [] });
    setStage("upload");
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      {isSucces ? (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h1>The playlists is created</h1>

          <Button onClick={() => void handleStartOver()}>Start Over</Button>
        </div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
          <h1>This is the playlist that will be created!</h1>
          <div className="flex h-full w-full flex-row">
            <div className="flex h-40 w-40 flex-col border-black">
              <div className="flex h-20 w-full flex-col ">
                <h3 className="">Playlist Name</h3>
                <p className="">{localPlaylist?.name}</p>
              </div>
              <div className="flex h-20 w-full flex-col">
                <h3 className="">Description</h3>
                <p className="">{localPlaylist?.description}</p>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex h-40 w-60 flex-col flex-wrap items-center gap-4">
                {getSongCard()}
              </div>
            </div>
          </div>
          <Button onClick={() => void handleMakePlaylist()}>
            Create Playlist
          </Button>
        </div>
      )}
    </div>
  );
};

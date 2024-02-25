import { useGlobalStore } from "@/store";
import { api } from "@/utils/api";

export const Summary = () => {
  const trackIds = useGlobalStore((state) => state.trackIds);
  const { playlistName, playlistDescription } = useGlobalStore(
    (state) => state.playlistDetails,
  );

  const mutation = api.playlist.createPlaylist.useMutation();
  const { mutate, isSuccess, error, isLoading, data } = mutation;

  const handleCreatePlaylist = () => {
    mutate({ trackIds, playlistName, playlistDescription });
  };

  if (error) {
    return <p>Error creating playlist</p>;
  }
  if (isSuccess) {
    return (
      <div className="flex h-full w-full flex-col justify-between">
        <a
          href={data.newPlaylist.href}
          className="flex h-full w-full flex-col items-center justify-center gap-4"
        >
          <p className="text-2xl font-bold">Playlist Created!</p>
          <p className="text-lg">Click here to view your playlist</p>
        </a>
      </div>
    );
  }
  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold text-white">Summary</p>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-bold text-white">Playlist Name</p>
          <p className="text-lg text-white">{playlistName}</p>
          <p className="text-lg font-bold text-white">Playlist Description</p>
          <p className="text-lg text-white">{playlistDescription}</p>
          <p className="text-lg font-bold text-white">Number of Tracks</p>
          <p className="text-lg text-white">{trackIds.length}</p>
        </div>
        {isLoading && <p className="text-lg font-bold">Creating playlist...</p>}
        <button
          className="rounded-md bg-green-500 px-4 py-2 text-white"
          onClick={handleCreatePlaylist}
        >
          Create playlist
        </button>
      </div>
    </div>
  );
};

import { type FC } from "react";
import { type CreatePlaylist, type Song } from "@/types/playlist";

interface PlaylistDetailsProps {
  playlist: CreatePlaylist;
  songs: Song[] | undefined;
}

export const PlaylistDetails: FC<PlaylistDetailsProps> = ({ playlist, songs }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-4 shadow-sm">
      <h2 className="text-xl md:text-2xl font-bold mb-4">Playlist Details</h2>

      <div className="flex flex-row justify-between mb-6">
        <h3 className="text-sm font-medium text-gray-500">NAME</h3>
        <p className="text-sm font-medium">{playlist?.name ?? "Untitled Playlist"}</p>
      </div>
      
      <div className="flex flex-row justify-between mb-6">
        <h3 className="text-sm font-medium text-gray-500">DESCRIPTION</h3>
        <p className="text-gray-700">{playlist?.description ?? "No description"}</p>
      </div>
      
      <div className="mt-6">
        <p className="text-sm text-gray-500">
          {songs?.length ?? 0} songs · {songs?.length ? Math.round(songs.reduce((acc, song) => acc + (song.duration || 0), 0) / 60000) : 0} minutes
        </p>
      </div>
    </div>
  );
};

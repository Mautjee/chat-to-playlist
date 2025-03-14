import { useGlobalStore } from "@/store";
import { useState, useEffect } from "react";
import { api } from "@/utils/api";
import { PlaylistDetails } from "../summary/playlist-details";
import { SongListSection } from "../summary/song-list-section";
import { SuccessMessage } from "../summary/success-message";
import { LoadingState, ErrorState } from "../summary/loading-error-states";
import { CreatePlaylistButton } from "../summary/create-playlist-button";
import { usePlaylistCreation } from "@/hooks/usePlaylistCreation";

export const Summary = () => {
  const localPlaylist = useGlobalStore((state) => state.localPlaylist);
  const resetData = useGlobalStore((state) => state.resetData);
  const user = useGlobalStore((state) => state.user);
  const setStage = useGlobalStore((state) => state.setStage);

  // Temporary state for song list management
  const [tempTrackIds, setTempTrackIds] = useState<string[]>([]);
  const [lastDeletedSong, setLastDeletedSong] = useState<{id: string, index: number} | null>(null);
  
  // Use the playlist creation hook
  const { 
    createPlaylist, 
    isCreating, 
    isSuccess, 
    error: playlistError 
  } = usePlaylistCreation();
  
  // Query for song details using the temporary track IDs
  const { data: songs, isLoading, error: songsError } = api.songs.getSongDetails.useQuery(tempTrackIds, {
    enabled: tempTrackIds.length > 0,
  });

  // Initialize temporary track IDs from global state
  useEffect(() => {
    setTempTrackIds(localPlaylist.trackIds);
  }, [localPlaylist.trackIds]);

  const handleDeleteSong = (id: string) => {
    // Find the index of the song to be deleted
    const index = tempTrackIds.indexOf(id);
    if (index !== -1) {
      // Save the deleted song for potential undo
      setLastDeletedSong({ id, index });
      
      // Update temporary track IDs
      const newTrackIds = [...tempTrackIds];
      newTrackIds.splice(index, 1);
      setTempTrackIds(newTrackIds);
    }
  };

  const handleUndoDelete = () => {
    if (lastDeletedSong) {
      const { id, index } = lastDeletedSong;
      // Insert the song back at its original position
      const newTrackIds = [...tempTrackIds];
      newTrackIds.splice(index, 0, id);
      setTempTrackIds(newTrackIds);
      setLastDeletedSong(null);
    }
  };

  const handleMakePlaylist = async () => {
    if (!user) return;
    await createPlaylist(user, localPlaylist, tempTrackIds);
  };

  const handleStartOver = () => {
    resetData();
    setStage("upload");
  };

  if (isLoading) {
    return <LoadingState />;
  }

  const error = songsError || playlistError;
  if (error) {
    return <ErrorState message={error.message} onRetry={handleStartOver} />;
  }

  if (isSuccess) {
    return <SuccessMessage playlistName={localPlaylist.name} onStartOver={handleStartOver} />;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6 h-full">
        {/* Playlist Info Section */}
        <div className="w-full md:w-1/3 flex flex-col">
          <PlaylistDetails playlist={localPlaylist} songs={songs} />
          <CreatePlaylistButton 
            isCreating={isCreating} 
            hasSongs={!!songs?.length} 
            onCreatePlaylist={() => void handleMakePlaylist()} 
          />
        </div>
        
        {/* Songs List Section */}
        <SongListSection 
          songs={songs} 
          lastDeletedSong={lastDeletedSong}
          onDeleteSong={handleDeleteSong}
          onUndoDelete={handleUndoDelete}
        />
      </div>
    </div>
  );
};

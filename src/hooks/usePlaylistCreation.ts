import { useState } from "react";
import { createClientSideClient } from "@/lib/spotify-sdk/ClientInstance";
import { UserProfile } from "@spotify/web-api-ts-sdk";
import { CreatePlaylist } from "@/types/playlist";

interface PlaylistCreationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

/**
 * Custom hook for creating Spotify playlists
 * 
 * @param options Optional callbacks for success and error handling
 * @returns Functions and state for playlist creation
 */
export const usePlaylistCreation = (options?: PlaylistCreationOptions) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Converts a track ID to a Spotify URI
   * @param id Track ID
   * @returns Spotify URI for the track
   */
  const createUri = (id: string) => {
    return `spotify:track:${id}`;
  };

  /**
   * Creates a playlist on Spotify with the provided details and tracks
   * 
   * @param user Current user profile
   * @param playlist Playlist details (name, description)
   * @param trackIds Array of track IDs to add to the playlist
   * @returns Promise that resolves when playlist creation is complete
   */
  const createPlaylist = async (
    user: UserProfile,
    playlist: CreatePlaylist,
    trackIds: string[]
  ): Promise<void> => {
    if (!user || isSuccess || isCreating || trackIds.length === 0) {
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const spotify = createClientSideClient();
      
      // Create the playlist
      const response = await spotify.playlists.createPlaylist(user.id, {
        name: playlist.name,
        description: playlist.description,
        public: true,
        collaborative: false,
      });
      
      // Handle large playlists by chunking (Spotify API has limits)
      if (trackIds.length > 100) {
        const ids = [...trackIds]; // Create a copy to avoid mutating the original
        const chunks = [];
        while (ids.length > 0) {
          chunks.push(ids.splice(0, 99));
        }
        
        for (const chunk of chunks) {
          await spotify.playlists.addItemsToPlaylist(
            response.id,
            chunk.map(createUri)
          );
        }
      } else {
        await spotify.playlists.addItemsToPlaylist(
          response.id,
          trackIds.map(createUri)
        );
      }
      
      setIsSuccess(true);
      console.log("Playlist created successfully!");
      
      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (err) {
      console.error("Error creating playlist:", err);
      const error = err instanceof Error ? err : new Error("Failed to create playlist");
      setError(error);
      
      if (options?.onError) {
        options.onError(error);
      }
    } finally {
      setIsCreating(false);
    }
  };

  /**
   * Resets the playlist creation state
   */
  const resetState = () => {
    setIsCreating(false);
    setIsSuccess(false);
    setError(null);
  };

  return {
    createPlaylist,
    resetState,
    isCreating,
    isSuccess,
    error
  };
};

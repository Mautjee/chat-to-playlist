import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { createClientSideClient } from "@/lib/spotify-sdk/ClientInstance";
import { useGlobalStore } from "@/store";
import type { UserProfile } from "@spotify/web-api-ts-sdk";

interface UseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
  displayName: string | undefined;
  user: UserProfile | null;
  spotifyClient: ReturnType<typeof createClientSideClient> | null;
}

export function useAuth(): UseAuthReturn {
  const { data: sessionData, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [spotifyClient, setSpotifyClient] = useState<ReturnType<typeof createClientSideClient> | null>(null);
  
  const setCurrentUser = useGlobalStore((state) => state.setCurrentUser);
  const setStage = useGlobalStore((state) => state.setStage);

  // Create a memoized function to get the profile
  const getProfile = useCallback(async () => {
    // If we already have the user data, don't fetch again
    if (user) return;
    
    try {
      setIsLoading(true);
      const spotify = createClientSideClient();
      setSpotifyClient(spotify);
      
      const profile = await spotify.currentUser.profile();
      setDisplayName(profile.display_name);
      setUser(profile);
      setCurrentUser(profile);
    } catch (error) {
      console.error("Error fetching Spotify profile:", error);
    } finally {
      setIsLoading(false);
    }
  }, [setCurrentUser, user]);

  useEffect(() => {
    // If the session is loading, just wait
    if (status === "loading") return;
    
    // If we have a session, get the profile
    if (sessionData?.user) {
      void getProfile();
    } else {
      // Reset everything if we don't have a session
      setStage("landing");
      setIsLoading(false);
      setDisplayName(undefined);
      setUser(null);
      setSpotifyClient(null);
      
      // Only set current user to null if we previously had a user
      if (user) {
        setCurrentUser(null as unknown as UserProfile); // Type assertion to satisfy TypeScript
      }
    }
  }, [sessionData, status, getProfile, setCurrentUser, user, setStage]);

  return {
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading" || isLoading,
    displayName,
    user,
    spotifyClient
  };
}
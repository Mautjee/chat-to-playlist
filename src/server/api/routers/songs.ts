import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { createServerSideClient } from "@/lib/spotify-sdk/ClientInstance";

export const songRouter = createTRPCRouter({
  getSongDetails: protectedProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      // Get the access token from the session
      const accessToken = ctx.session.user.accessToken;
      
      if (!accessToken) {
        throw new Error("No access token available. Please sign in again.");
      }
      
      // Create a server-side Spotify client with the access token
      const spotify = createServerSideClient(accessToken);
      
      try {
        const tracks = await spotify.tracks.get(input);
        return tracks.map((track) => ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          album: track.album.name,
          duration: track.duration_ms,
          image: track.album.images[0]?.url,
        }));
      } catch (error) {
        console.error("Error fetching tracks from Spotify:", error);
        throw new Error("Failed to fetch track details from Spotify. You may need to sign in again if your session has expired.");
      }
    }),
});

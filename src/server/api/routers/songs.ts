import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import spotify from "@/lib/spotify-sdk/ClientInstance";

export const songRouter = createTRPCRouter({
  getSongDetails: protectedProcedure
    .input(z.array(z.string()))
    .query(async ({ ctx, input }) => {
      const tracks = await spotify.tracks.get(input);
      return tracks.map((track) => ({
        id: track.id,
        name: track.name,
        artists: track.artists.map((artist) => artist.name),
        album: track.album.name,
        duration: track.duration_ms,
        image: track.album.images[0]?.url,
      }));
    }),
});

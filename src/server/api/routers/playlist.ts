import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import sdk from "@/lib/spotify-sdk/ClientInstance";

export const playlistRouter = createTRPCRouter({
  getPlaylists: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.session) throw new Error("no session available");

    return await sdk.playlists.getUsersPlaylists(ctx.session.user.id);
  }),

  createPlaylist: protectedProcedure
    .input(
      z.object({
        trackIds: z.array(z.string()),
        playlistName: z.string(),
        playlistDescription: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { trackIds, playlistName, playlistDescription } = input;

      const newPlaylist = await sdk.playlists.createPlaylist(
        ctx.session.user.id,
        { name: playlistName, description: playlistDescription },
      );
      if (trackIds.length >= 100) {
        const arr = [];
        arr.push(trackIds.splice(0, 99));
        arr.push(trackIds);
        arr.map(async (list) => {
          await sdk.playlists.addItemsToPlaylist(newPlaylist.id, list);
        });
      } else {
        await sdk.playlists.addItemsToPlaylist(newPlaylist.id, trackIds);
      }
      return { newPlaylist };
    }),
});

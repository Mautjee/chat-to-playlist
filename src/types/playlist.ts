import { z } from "zod";

export const createPlaylistSchema = z.object({
  name: z.string(),
  description: z.string(),
  trackIds: z.array(z.string()),
});

export type CreatePlaylist = z.infer<typeof createPlaylistSchema>;

export const songSchema = z.object({
  id: z.string(),
  name: z.string(),
  artists: z.array(z.string()),
  album: z.string(),
  duration: z.number(),
  image: z.string().optional(),
});

export type Song = z.infer<typeof songSchema>;

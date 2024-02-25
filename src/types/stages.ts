export type Stages =
  | "authentication"
  | "upload"
  | "backup"
  |  "start"
  | "processing"
  | "selecting"
  | "summary"
  | "complete";

export type PlaylistDetails = {
  playlistName: string;
  playlistDescription?: string;
};

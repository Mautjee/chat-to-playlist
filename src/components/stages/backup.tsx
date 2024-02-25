import { api } from "@/utils/api";
import { type FC } from "react";

export const Backup: FC = () => {
  const { isError, data } = api.playlist.getPlaylists.useQuery();

  if (isError) return <>Somethig went wrong</>;

  return <>{data}</>;
};

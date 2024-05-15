import { type FC } from "react";
import { Card } from "./ui/card";

interface SongCardProps {
  song: string;
}

export const SongCard: FC<SongCardProps> = ({ song }) => {
  return (
    <Card>
      <p>{song}</p>
    </Card>
  );
};

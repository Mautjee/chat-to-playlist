import { FC } from "react";
import type React from "react"
import { Button } from "@/components/ui/button"
import { Undo2 } from "lucide-react"
import { SongCard } from "./song-card";
import { Song } from "@/types/playlist";

interface ScrollableSongListProps {
  songs: Song[]
  onDeleteSong: (id: string) => void
  onUndoDelete: () => void
  canUndo: boolean
}

export const ScrollableSongList: FC<ScrollableSongListProps> = ({ songs, onDeleteSong, onUndoDelete, canUndo }) => {
  return (
    <div className="w-full max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Playlist</h2>
        {canUndo && (
          <Button variant="outline" size="sm" onClick={onUndoDelete}>
            <Undo2 className="h-4 w-4 mr-2" />
            Undo
          </Button>
        )}
      </div>
      <div className="border border-gray-200 rounded-lg overflow-y-auto h-[50rem] bg-white p-4">
        {songs.map((song) => (
          <SongCard
            key={song.id}
            id={song.id}
            coverArt={song.image}
            artist={song.artists.join(", ")}
            title={song.name}
            onDelete={onDeleteSong}
          />
        ))}
      </div>
    </div>
  )
}

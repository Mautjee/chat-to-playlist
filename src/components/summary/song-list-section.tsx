import { type FC } from "react";
import { type Song } from "@/types/playlist";
import { SongCard } from "../song-card";
import { Button } from "../ui/button";
import { Music, Undo2 } from "lucide-react";

interface SongListSectionProps {
  songs: Song[] | undefined;
  lastDeletedSong: {id: string, index: number} | null;
  onDeleteSong: (id: string) => void;
  onUndoDelete: () => void;
}

export const SongListSection: FC<SongListSectionProps> = ({ 
  songs, 
  lastDeletedSong, 
  onDeleteSong, 
  onUndoDelete 
}) => {
  const renderSongCards = () => {
    if (!songs || songs.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center text-gray-500">
          <Music size={48} className="mb-4 opacity-50" />
          <p>No songs in your playlist yet.</p>
        </div>
      );
    }
    
    return songs.map((song, key) => (
      <SongCard 
        key={key} 
        id={song.id} 
        coverArt={song.image} 
        artist={song.artists.join(", ")} 
        title={song.name} 
        onDelete={onDeleteSong} 
      />
    ));
  };

  return (
    <div className="w-full md:w-2/3 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Songs ({songs?.length ?? 0})</h2>
        
        {lastDeletedSong && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onUndoDelete}
            className="flex items-center gap-1"
          >
            <Undo2 size={16} />
            Undo Delete
          </Button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto rounded-lg bg-white min-h-[300px] max-h-full">
        {renderSongCards()}
      </div>
    </div>
  );
};

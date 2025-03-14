import { type FC } from "react";
import { Button } from "../ui/button";

interface CreatePlaylistButtonProps {
  isCreating: boolean;
  hasSongs: boolean;
  onCreatePlaylist: () => void;
}

export const CreatePlaylistButton: FC<CreatePlaylistButtonProps> = ({ 
  isCreating, 
  hasSongs, 
  onCreatePlaylist 
}) => {
  return (
    <div className="mt-4 mb-4">
      <Button 
        onClick={onCreatePlaylist} 
        disabled={isCreating || !hasSongs} 
        className="w-full py-6 text-lg"
      >
        {isCreating ? "Creating..." : "Create Playlist on Spotify"}
      </Button>
    </div>
  );
};

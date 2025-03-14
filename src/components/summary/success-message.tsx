import { FC } from "react";
import { Button } from "../ui/button";
import { Check } from "lucide-react";

interface SuccessMessageProps {
  playlistName: string;
  onStartOver: () => void;
}

export const SuccessMessage: FC<SuccessMessageProps> = ({ playlistName, onStartOver }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6 text-center p-4">
      <div className="bg-green-100 rounded-full p-4 mb-2">
        <Check size={48} className="text-green-600" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold">Playlist Created Successfully!</h1>
      <p className="text-gray-600 max-w-md">Your playlist "{playlistName}" has been created on Spotify.</p>
      <Button 
        onClick={onStartOver} 
        size="lg" 
        className="mt-4"
      >
        Create Another Playlist
      </Button>
    </div>
  );
};

import { signOut, signIn } from "next-auth/react";
import { Button } from "./ui/button";
import { useGlobalStore } from "@/store";
import { type Stages } from "@/types/stages";
import { Music } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export const TopBar = () => {
  const { isAuthenticated } = useAuth();
  const setStage = useGlobalStore((state) => state.setStage);

  const handleMenuClick = (stage: Stages) => {
    setStage(stage);
  };

  return (
    <div className="flex w-5/6 border-b border-gray-200 p-4 flex-row items-center justify-between">
      <div 
        className="flex items-center cursor-pointer" 
        onClick={() => handleMenuClick("landing")}
      >
        <div className="flex items-center mr-2 text-primary">
          <Music size={24} />
        </div>
        <div className="font-bold text-xl">
          <span className="text-primary">Chat</span>
          <span className="text-gray-400">2</span>
          <span className="text-primary">Playlist</span>
        </div>
      </div>


      {isAuthenticated ? (
        <Button onClick={() => void signOut()}>Sign out</Button>
      ) : (
        <Button onClick={() => void signIn()}>Sign in</Button>
      )}
    </div>
  );
};

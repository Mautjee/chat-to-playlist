import { useGlobalStore } from "@/store";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";

export function Landing() {
  const setStage = useGlobalStore((state) => state.setStage);
  const { isLoading, displayName } = useAuth();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-6 text-center">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
          <p className="text-lg">Loading your profile...</p>
        </div>
      ) : displayName ? (
        <>
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
            Welcome {displayName}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Ready to extract songs you send to your friends and turn them into a playlist?
          </p>
          <Button 
            onClick={() => setStage("upload")} 
            size="lg" 
            className="mt-6"
          >
            Get Started
          </Button>
        </>
      ) : (
        <>
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
            Welcome to Chat-to-Playlist
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Please log in with Spotify to use the app
          </p>
        </>
      )}
    </div>
  );
}

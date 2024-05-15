import { useGlobalStore } from "@/store";
import { useSession } from "next-auth/react";
import spotify from "@/lib/spotify-sdk/ClientInstance";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export function Landing() {
  const { data: sessionData } = useSession();
  const setStage = useGlobalStore((state) => state.setStage);
  const setUser = useGlobalStore((state) => state.setCurrentUser);
  const [displayName, setDisplayName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getProfile = async () => {
      const name = await spotify.currentUser.profile();
      setDisplayName(name.display_name);
      setUser(name);
    };

    if (sessionData) {
      getProfile().catch((err) => console.error(err));
    }
  }, [sessionData, setStage, setUser]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      {displayName ? (
        <>
          <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
            Welcome {displayName}
          </h1>
          <Button onClick={() => setStage("upload")}>Start</Button>
        </>
      ) : (
        <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
          Welcome plaease log in to use the app
        </h1>
      )}
    </div>
  );
}

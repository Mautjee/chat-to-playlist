import { useGlobalStore } from "@/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export function Landing() {
  const { data: sessionData } = useSession();
  const setStage = useGlobalStore((state) => state.setStage);

  useEffect(() => {
    if (sessionData) {
      setStage("upload");
    }
  }, [sessionData, setStage]);

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
        Welcome plaease log in to use the app
      </h1>
    </div>
  );
}

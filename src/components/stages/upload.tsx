import { useSession, signOut } from "next-auth/react";

export const Upload = () => {
  const { data: sessionData } = useSession();

  const handleUpload = () => {
    console.log("uploading");
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex w-full flex-row items-center justify-between ">
        <p className="text-center text-2xl text-white">
          {sessionData && <span>{sessionData.user?.name}</span>}
        </p>
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => handleUpload()}
        >
          Upload
        </button>
      </div>
    </div>
  );
};

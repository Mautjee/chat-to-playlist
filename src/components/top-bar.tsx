import { useSession, signOut } from "next-auth/react";

export const TopBar = () => {
  const { data: sessionData } = useSession();
  return (
    <div className="flex w-full flex-row items-center justify-between ">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>{sessionData.user?.name}</span>}
      </p>
      {sessionData && (
        <button
          className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      )}
    </div>
  );
};

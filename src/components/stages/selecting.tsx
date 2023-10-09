import { useGlobalStore } from "@/store";
import { FormEvent } from "react";

export const Selecting = () => {
  const trackIds = useGlobalStore((state) => state.trackIds);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("submitting");
  }

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold text-white">
          What will the name of the playist be:
        </p>
        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <input
            id="playlist-name"
            className="rounded-md bg-gray-800 p-2 text-white"
            type="text"
            placeholder="Playlist name"
          />
          <input
            id="playlist-description"
            className="rounded-md bg-gray-800 p-2 text-white"
            type="text"
            placeholder="Playlist description"
          />
          <input
            className="rounded-md bg-green-500 p-2 text-white"
            type="submit"
            value="Create playlist"
          />
        </form>
      </div>
    </div>
  );
};

import { useGlobalStore } from "@/store";
import { decodeFileContent } from "@/utils/file-handling";
import { useState } from "react";

export const Processing = () => {
  const file = useGlobalStore((state) => state.file);
  const setTrackIds = useGlobalStore((state) => state.setTrackIds);
  const trackIds = useGlobalStore((state) => state.trackIds);

  const [doneProcessing, setDoneProcessing] = useState(false);

  const processFile = async () => {
    if (!file) return;
    const decodedFile = await decodeFileContent(file);
    const regex =
      /https?:\/\/(?:open\.spotify\.com\/track\/|spotify\.link\/)(\w+)\b/g;

    const matches = decodedFile.match(regex);
    if (!matches) return;
    const stringArray = new Set(matches.map((match) => match.split("/").pop()));
    console.log(stringArray);
    setDoneProcessing(true);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        {doneProcessing ? (
          <>
            <h1 className="text-4xl font-bold text-white">
              Your songs have been extracted!
            </h1>
            <p className="text-xl text-white">
              We found a total of <span className="font-bold">{}</span> songs
            </p>
          </>
        ) : (
          <>
            <h3 className="text-4xl font-bold text-white">
              Start extracting your shared songs from the file
            </h3>
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={processFile}
            >
              Start
            </button>
          </>
        )}
      </div>
    </div>
  );
};

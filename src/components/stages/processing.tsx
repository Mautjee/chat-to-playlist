import { useGlobalStore } from "@/store";
import { decodeFileContent } from "@/utils/file-handling";
import { useState } from "react";

export const Processing = () => {
  const file = useGlobalStore((state) => state.file);
  const setTrackIds = useGlobalStore((state) => state.setTrackIds);
  const setStage = useGlobalStore((state) => state.setStage);
  const trackIds = useGlobalStore((state) => state.trackIds);

  const [doneProcessing, setDoneProcessing] = useState(false);

  const processFile = async () => {
    if (!file) return;
    const decodedFile = await decodeFileContent(file);
    const regex =
      /https?:\/\/(?:open\.spotify\.com\/track\/|spotify\.link\/)(\w+)\b/g;

    const matches = decodedFile.match(regex);
    if (!matches) return;
    const trackIdSet = new Set<string>();
    matches.forEach((match) => {
      const id = match.split("/").pop();
      if (id) trackIdSet.add(id);
    });

    setTrackIds(Array.from(trackIdSet));
    setDoneProcessing(true);
  };
  const handleNext = () => {
    setStage("selecting");
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
              We found a total of{" "}
              <span className="font-bold">{trackIds.length}</span> songs
            </p>
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={handleNext}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <h3 className="text-4xl font-bold text-white">Start extracting</h3>
            <p className="text-xl text-white">
              Extract all the songs from your WhatsApp chat
            </p>
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

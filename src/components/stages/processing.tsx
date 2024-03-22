import { useGlobalStore } from "@/store";
import { decodeFileContent } from "@/utils/file-handling";
import { useState } from "react";
import { Button } from "../ui/button";

export const Processing = () => {
  const file = useGlobalStore((state) => state.file);
  const setTrackIds = useGlobalStore((state) => state.setTrackIds);
  const setStage = useGlobalStore((state) => state.setStage);
  const trackIds = useGlobalStore((state) => state.trackIds);

  const [doneProcessing, setDoneProcessing] = useState(false);

  const processFile = async () => {
    if (!file) return;
    const decodedFile = await decodeFileContent(file);
    const regex = /https:\/\/open\.spotify\.com\/track\/(\w+)/gm;

    //Regex incliding spotify.link
    //const regex = /https?:\/\/(?:open\.spotify\.com\/track\/|spotify\.link\/)(\w+)\b/g;

    const matches = decodedFile.match(regex);
    console.log(matches);
    if (!matches) return;
    const trackIdSet = new Set<string>();

    matches.forEach((match) => {
      const trackId = match.split("/").pop();
      trackId && trackIdSet.add(trackId);
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
            <h1>Your songs have been extracted!</h1>
            <p>
              We found a total of{" "}
              <span className="font-bold">{trackIds.length}</span> songs
            </p>
            <Button onClick={handleNext}>Next</Button>
          </>
        ) : (
          <>
            <h3>Start extracting</h3>
            <p>Extract all the songs from your WhatsApp chat</p>
            <Button onClick={processFile}>Start</Button>
          </>
        )}
      </div>
    </div>
  );
};

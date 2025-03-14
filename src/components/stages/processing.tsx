import { useGlobalStore } from "@/store";
import { decodeFileContent } from "@/utils/file-handling";
import { useState, useEffect } from "react";
import { ExtractionProgress } from "../extraction-progress";

export const Processing = () => {
  const file = useGlobalStore((state) => state.file);
  const setTrackIds = useGlobalStore((state) => state.setTrackIds);
  const setStage = useGlobalStore((state) => state.setStage);
  const completeStage = useGlobalStore((state) => state.completeStage);
  const trackIds = useGlobalStore((state) => state.trackIds);

  const [doneProcessing, setDoneProcessing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedCount, setExtractedCount] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [progressValue, setProgressValue] = useState(0);

  // Start processing automatically when component mounts
  useEffect(() => {
    void processFile();
  }, []);

  const processFile = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setExtractedCount(0);
    setProgressValue(0);
    
    // Simulate initial delay for file reading
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const decodedFile = await decodeFileContent(file);
    const regex = /https:\/\/open\.spotify\.com\/track\/(\w+)/gm;

    //Regex incliding spotify.link
    //const regex = /https?:\/\/(?:open\.spotify\.com\/track\/|spotify\.link\/)(\w+)\b/g;

    const matches = decodedFile.match(regex);
    if (!matches) {
      setIsProcessing(false);
      return;
    }
    
    const trackIdSet = new Set<string>();
    matches.forEach((match) => {
      const trackId = match.split("/").pop();
      trackId && trackIdSet.add(trackId);
    });

    const uniqueTrackIds = Array.from(trackIdSet);
    setTotalMatches(uniqueTrackIds.length);
    
    // Let the animation run through the useEffect in ExtractionProgress
    setTimeout(() => {
      setTrackIds(uniqueTrackIds);
      setDoneProcessing(true);
      completeStage("processing");
      setIsProcessing(false);
    }, uniqueTrackIds.length * 50 + 500); // Give enough time for animation to complete
  };
  
  const handleNext = () => {
    setStage("selecting");
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-6">
        <ExtractionProgress 
          isProcessing={isProcessing}
          isDone={doneProcessing}
          extractedCount={extractedCount}
          totalCount={totalMatches}
          progressValue={progressValue}
          setExtractedCount={setExtractedCount}
          setProgressValue={setProgressValue}
          onNext={handleNext}
          onStart={() => void processFile()}
        />
      </div>
    </div>
  );
};

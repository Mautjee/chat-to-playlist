import { useEffect } from "react";
import { Loader2, Music } from "lucide-react";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";

interface ExtractionProgressProps {
  isProcessing: boolean;
  isDone: boolean;
  extractedCount: number;
  totalCount: number;
  progressValue: number;
  setExtractedCount: (count: number) => void;
  setProgressValue: (value: number) => void;
  onNext: () => void;
  onStart: () => void;
}

export const ExtractionProgress = ({
  isProcessing,
  isDone,
  extractedCount,
  totalCount,
  progressValue,
  setExtractedCount,
  setProgressValue,
  onNext,
}: ExtractionProgressProps) => {

  useEffect(() => {
    if (isProcessing && extractedCount < totalCount) {
      const timer = setTimeout(() => {
        if (extractedCount < totalCount) {
          setExtractedCount(Math.min(extractedCount + 1, totalCount));
          setProgressValue(Math.min(progressValue + (100 / totalCount), 100));
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isProcessing, extractedCount, totalCount, progressValue, setExtractedCount, setProgressValue]);

  if (isDone) {
    return (
      <div className="text-center space-y-4 max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-50 text-green-500 mb-2">
          <Music size={32} />
        </div>
        <h1 className="text-2xl font-semibold">Your songs have been extracted!</h1>
        <p className="text-gray-600">
          We found a total of{" "}
          <span className="font-bold">{totalCount}</span> unique songs in your chat
        </p>
        <Button 
          className="mt-4 px-8" 
          onClick={onNext}
        >
          Continue
        </Button>
      </div>
    );
  }

  return (
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-2">
          <Loader2 size={32} className="animate-spin" />
        </div>
        <h3 className="text-xl font-medium">Extracting songs</h3>
        <div className="space-y-2 w-full max-w-sm">
          <Progress value={progressValue} className="h-2" />
          <div className="flex justify-between text-sm text-gray-500">
            <span>Found {extractedCount} songs</span>
            {totalCount > 0 && <span>{Math.round(progressValue)}%</span>}
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-4">
          Scanning your chat for Spotify links...
        </p>
      </div>
    );
};



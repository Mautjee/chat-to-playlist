import { type FC } from "react";
import { Button } from "../ui/button";
import { AlertCircle } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  subMessage?: string;
}

export const LoadingState: FC<LoadingStateProps> = ({ 
  message = "Loading your songs...", 
  subMessage = "This may take a moment" 
}) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="animate-pulse text-center">
        <p className="text-lg font-medium">{message}</p>
        <p className="text-sm text-gray-500">{subMessage}</p>
      </div>
    </div>
  );
};

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export const ErrorState: FC<ErrorStateProps> = ({ message, onRetry }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
      <AlertCircle size={48} className="mb-4 text-red-500" />
      <h3 className="text-xl font-bold mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      <Button onClick={onRetry}>Start Over</Button>
    </div>
  );
};

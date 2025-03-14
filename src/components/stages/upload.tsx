"use client";

import { type ChangeEvent, type MouseEvent, useState } from "react";
import { useGlobalStore } from "@/store/";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ShieldCheck, ChevronDown, ChevronUp, Github } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

export const Upload = () => {
  const file = useGlobalStore((state) => state.file);
  const setFile = useGlobalStore((state) => state.setFile);
  const removeFile = useGlobalStore((state) => state.removeFile);
  const setStage = useGlobalStore((state) => state.setStage);
  const completeStage = useGlobalStore((state) => state.completeStage);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  // The actual regex pattern used to extract Spotify track IDs
  const spotifyRegexPattern = "https:\\/\\/open\\.spotify\\.com\\/track\\/([a-zA-Z0-9]+)";

  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert("no file was choosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert("no file was choosen");
      return;
    }

    const file = fileInput.files[0];
    if (!file) return;

    if (!file.type.startsWith("text/plain")) {
      alert("file is not a text file");
    }
    setFile(file);
    setUploaded(true);
  };

  const handleNext = () => {
    if (!file) {
      setUploaded(false);
      return;
    }
    completeStage("upload");
    setStage("processing");
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFile();
    setUploaded(false);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between p-4 md:p-6">
      <div className="flex h-full w-full flex-col items-center justify-center gap-6">
        <div className="w-full max-w-md">
          
              {/* Privacy Information */}
              <div className="bg-blue-50 rounded-lg p-4 text-left mt-4">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">Your Privacy is Protected</h4>
                    <p className="text-sm text-blue-700">
                      Your chat data is processed entirely in your browser and is never sent to any server. 
                      This app only extract Spotify track IDs from the text using regular expressions.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Technical Details Collapsible */}
              <Collapsible 
                open={isDetailsOpen} 
                onOpenChange={setIsDetailsOpen}
                className="bg-gray-50 rounded-lg text-left"
              >
                <div className="p-4">
                  <CollapsibleTrigger className="flex w-full items-center justify-between text-sm font-medium text-gray-600">
                    <span>Technical Details</span>
                    {isDetailsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent className="pt-4 space-y-3">
                    <div>
                      <h5 className="text-xs font-medium text-gray-500 mb-1">REGEX PATTERN USED</h5>
                      <code className="block p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                        {spotifyRegexPattern}
                      </code>
                      <p className="text-xs text-gray-500 mt-1">
                        This pattern extracts Spotify track IDs from links in your chat.
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                      <span className="text-xs text-gray-500">Open source project</span>
                      <a 
                        href="https://github.com/Mautjee/chat-to-playlist" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
                      >
                        <Github size={14} />
                        <span>View on GitHub</span>
                      </a>
                    </div>
                  </CollapsibleContent>
                </div>
              </Collapsible>

          <p className="text-gray-600 mb-6 text-center">
            Upload your chat export to extract Spotify links and create a playlist
          </p>
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 w-full">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="file" className="text-sm font-medium">
                  Chat history file (.txt)
                </Label>
                <Input
                  type="file"
                  name="file"
                  id="file"
                  accept=".txt"
                  onChange={handleUpload}
                  className="cursor-pointer"
                />
              </div>
              
              {uploaded && (
                <div className="text-sm text-green-600 flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  File uploaded: {file?.name}
                </div>
              )}
              
              
              <div className="flex flex-row gap-4 pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleCancel} 
                  className="flex-1"
                  disabled={!uploaded}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={!uploaded}
                  className="flex-1"
                >
                  Extract Songs
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

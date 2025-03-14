"use client";

import { type ChangeEvent, type MouseEvent, useState } from "react";
import { useGlobalStore } from "@/store/";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ShieldCheck } from "lucide-react";
import { TechnicalDetails, WhatsAppExportGuide } from "../dropdowns";

export const Upload = () => {
  const file = useGlobalStore((state) => state.file);
  const setFile = useGlobalStore((state) => state.setFile);
  const removeFile = useGlobalStore((state) => state.removeFile);
  const setStage = useGlobalStore((state) => state.setStage);
  const completeStage = useGlobalStore((state) => state.completeStage);
  const [uploaded, setUploaded] = useState<boolean>(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  


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
              
              {/* Add the WhatsApp Export Guide component here */}
              <WhatsAppExportGuide />
              {/* Technical Details Collapsible */}
              <TechnicalDetails />

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

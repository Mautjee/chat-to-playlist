"use client";

import { type ChangeEvent, type MouseEvent, useState } from "react";
import { useGlobalStore } from "@/store/";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export const Upload = () => {
  const file = useGlobalStore((state) => state.file);
  const setFile = useGlobalStore((state) => state.setFile);
  const removeFile = useGlobalStore((state) => state.removeFile);
  const setStage = useGlobalStore((state) => state.setStage);
  const [uploaded, setUploaded] = useState<boolean>(false);

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
    setStage("processing");
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    removeFile();
    setUploaded(false);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <form>
          <Label htmlFor="file">Chat history</Label>
          <Input
            type="file"
            name="file"
            id="file"
            accept=".txt"
            onChange={handleUpload}
          />
        </form>
        <div className="flex flex-row gap-4">
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handleNext} disabled={!uploaded}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

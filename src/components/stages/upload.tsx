"use client";

import { type ChangeEvent, type MouseEvent, useState } from "react";
import { useGlobalStore } from "@/store/";

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
          <input
            type="file"
            name="file"
            accept=".txt"
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onChange={handleUpload}
          />
        </form>
        <div className="flex flex-row gap-4">
          <button
            className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20 enabled:rounded-full disabled:opacity-10"
            onClick={handleNext}
            disabled={!uploaded}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

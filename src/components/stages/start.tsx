
import { useGlobalStore } from "@/store";

export const Start = ()=> {

  const setStage = useGlobalStore((state) => state.setStage);
  
  

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {"What do you want to do"}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={()=> setStage("backup")}
      >
        {"Backup playlist "}
      </button>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={() =>setStage("upload")}
      >
        {"playlist from chat"}
      </button>
    </div>
  );

};

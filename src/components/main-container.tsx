import { Authentication, Backup, Processing, Selecting, Start, Summary } from "./stages";
import { useGlobalStore } from "../store";
import { Upload } from "./stages/upload";
import { TopBar } from "./top-bar";

export const MainContainer = () => {
  const stage = useGlobalStore((state) => state.stage);

  const presentState = () => {
    switch (stage) {
      case "authentication":
        return <Authentication />;
      case "backup":
        return <Backup/>;
      case "start":
        return <Start/>;
      case "upload":
        return <Upload />;
      case "processing":
        return <Processing />;
      case "selecting":
        return <Selecting />;
      case "summary":
        return <Summary />;
    }
  };
  return (
    <div className=" flex h-5/6 w-3/4 flex-col items-center justify-center rounded border border-dashed border-black p-4 ">
      <TopBar />
      {presentState()}
    </div>
  );
};

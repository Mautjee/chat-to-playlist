import { Authentication, Processing, Selecting } from "./stages";
import { useGlobalStore } from "../store";
import { Upload } from "./stages/upload";
import { TopBar } from "./top-bar";

export const MainContainer = () => {
  const stage = useGlobalStore((state) => state.stage);

  const presentState = () => {
    switch (stage) {
      case "authentication":
        return <Authentication />;
      case "upload":
        return <Upload />;
      case "processing":
        return <Processing />;
      case "selecting":
        return <Selecting />;
    }
  };
  return (
    <div className=" flex h-5/6 w-3/4 flex-col items-center justify-center rounded border border-dashed border-black p-4 ">
      <TopBar />
      {presentState()}
    </div>
  );
};

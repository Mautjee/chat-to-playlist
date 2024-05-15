import { Landing, Processing, Selecting } from "./stages";
import { useGlobalStore } from "../store";
import { Upload } from "./stages/upload";
import { TopBar } from "./top-bar";
import { Summary } from "./stages/summary";
import { StageBar } from "./stage-bar";

export const MainContainer = () => {
  const stage = useGlobalStore((state) => state.stage);

  const presentState = () => {
    switch (stage) {
      case "landing":
        return <Landing />;
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
    <div className=" flex h-5/6 w-3/4 flex-col items-center justify-between p-4 ">
      <TopBar />
      <StageBar />
      {presentState()}
    </div>
  );
};

import { Landing, Processing, Selecting } from "./stages";
import { useGlobalStore } from "../store";
import { Upload } from "./stages/upload";
import { TopBar } from "./top-bar";
import { Summary } from "./stages/summary";
import { StageBar } from "./stage-bar";
import { useAuth } from "@/hooks/useAuth";

export const MainContainer = () => {
  const stage = useGlobalStore((state) => state.stage);
  const { isAuthenticated } = useAuth();

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
    <div className="flex h-5/6 w-full md:w-2/3 flex-col items-center justify-between">
      <TopBar />
      <StageBar />
      <div className="w-full flex-1">
        {presentState()}
      </div>
    </div>
  );
};

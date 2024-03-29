import { Authentication } from "./stages";
import { useGlobalStore } from "../store";
import { Upload } from "./stages/upload";

export const MainContainer = () => {
  const stage = useGlobalStore((state) => state.stage);

  const presentState = () => {
    switch (stage) {
      case "authentication":
        return <Authentication />;
      case "upload":
        return <Upload />;
      case "processing":
        return <div>Processing</div>;
      default:
        return <div>Authentication</div>;
    }
  };
  return (
    <div className=" flex h-5/6 w-3/4 flex-col items-center justify-center rounded border border-dashed border-black p-4 ">
      {presentState()}
    </div>
  );
};

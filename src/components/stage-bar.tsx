import { useGlobalStore } from "@/store";
import { stages, type Stages } from "@/types/stages";

export const StageBar = () => {
  const currentStage = useGlobalStore((state) => state.stage);
  const setStage = useGlobalStore((state) => state.setStage);

  const handleStageChange = (stage: Stages) => {
    setStage(stage);
  };

  const getStages = () => {
    const stagess = stages.map((stage, index) => {
      const isCurrentStage = currentStage === stage;
      return (
        <div
          key={index}
          onClick={() => handleStageChange(stage)}
          className="h-full"
        >
          {isCurrentStage ? (
            <a className="font-bold"> {stage}</a>
          ) : (
            <a className="h-full">{stage}</a>
          )}
        </div>
      );
    });
    return stagess;
  };

  return (
    <div className="flex h-4 w-full flex-row items-center justify-center gap-3">
      {getStages()}
    </div>
  );
};

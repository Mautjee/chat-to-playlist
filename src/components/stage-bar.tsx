import { useGlobalStore } from "@/store";
import { stages, type Stages } from "@/types/stages";
import { 
  Home, 
  Upload, 
  Loader2, 
  CheckSquare, 
  CheckCircle, 
  ListMusic
} from "lucide-react";
import { useSession } from "next-auth/react";

export const StageBar = () => {
  const currentStage = useGlobalStore((state) => state.stage);
  const setStage = useGlobalStore((state) => state.setStage);
  const stageProgress = useGlobalStore((state) => state.stageProgress);
  const { data: sessionData } = useSession();

  const handleStageChange = (stage: Stages) => {
    // Only allow navigation to stages if user is logged in and has completed previous stages
    if (!sessionData && stage !== "landing") return;
    
    // Check if the stage is accessible based on progress
    const stageIndex = stages.findIndex(s => s === stage);
    const currentIndex = stages.findIndex(s => s === currentStage);
    
    // Allow navigation to previous stages or the next stage if current is completed
    const canNavigate = stageIndex <= currentIndex || 
                        (stageIndex === currentIndex + 1 && stageProgress[currentStage]);
    
    if (canNavigate) {
      setStage(stage);
    }
  };

  // Map stages to icons for visual representation
  const stageIcons: Record<Stages, React.ReactNode> = {
    landing: <Home size={16} />,
    upload: <Upload size={16} />,
    processing: <Loader2 size={16} />,
    selecting: <CheckSquare size={16} />,
    summary: <ListMusic size={16} />
  };

  // Get human-readable stage names
  const stageNames: Record<Stages, string> = {
    landing: "Home",
    upload: "Upload",
    processing: "Processing",
    selecting: "Select",
    summary: "Summary"
  };

  // Find the current stage index
  const currentStageIndex = stages.findIndex(stage => stage === currentStage);

  return (
    <>
      {/* Desktop version - horizontal steps */}
      <div className="hidden pt-3 md:flex w-full max-w-3xl flex-row items-center justify-center my-2">
        {stages.map((stage, index) => {
          const isCurrentStage = currentStage === stage;
          const isPastStage = index < currentStageIndex;
          const isCompleted = stageProgress[stage];
          const isDisabled = !sessionData && stage !== "landing";
          const isAccessible = index <= currentStageIndex || 
                              (index === currentStageIndex + 1 && stageProgress[currentStage]);
          
          return (
            <div key={index} className="flex flex-1 items-center">
              {/* Stage connector line - only show if not first item */}
              {index > 0 ? (
                <div 
                  className={`h-[1px] flex-1 ${
                    index <= currentStageIndex ? "bg-primary/40" : "bg-gray-200"
                  }`}
                />
              ) : <div className="h-[1px] flex-1 " />}
              
              {/* Stage indicator */}
              <div 
                onClick={() => isAccessible && !isDisabled && handleStageChange(stage)}
                className={`flex flex-col items-center mx-2 ${
                  isAccessible && !isDisabled ? "cursor-pointer" : "cursor-default opacity-50"
                }`}
              >
                <div 
                  className={`flex items-center justify-center w-7 h-7 rounded-full border ${
                    isCurrentStage 
                      ? "border-primary bg-primary text-white" 
                      : isPastStage || isCompleted
                        ? "border-primary/70 bg-white text-primary/70" 
                        : "border-gray-200 bg-white text-gray-300"
                  }`}
                >
                  {stageIcons[stage]}
                </div>
                <span 
                  className={`text-xs mt-1 ${
                    isCurrentStage 
                      ? "font-medium text-primary" 
                      : isPastStage || isCompleted
                        ? "text-gray-500" 
                        : "text-gray-300"
                  }`}
                >
                  {stageNames[stage]}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Mobile version - subtle current stage indicator */}
      <div className="flex pt-3 md:hidden w-full items-center justify-center my-2">
        <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-50 border border-gray-100">
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary mr-2">
            {stageIcons[currentStage]}
          </div>
          <span className="text-sm font-medium text-gray-700">
            {stageNames[currentStage]}
          </span>
        </div>
      </div>
    </>
  );
};

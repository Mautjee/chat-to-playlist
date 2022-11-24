import { FC } from "react";
import { getStepText } from "../../util/text";
import { StepText } from "../atoms";
import { Circle } from "./styles";

interface StepCirleProps {
  id: number;
  handleClick: (stepNumber: number) => void;
  currentStep: number;
}
const variants = {
  start: { x: 0 },
  current: { x: 0 },
  idle: { y: "160%" },
};

export const StepCircle: FC<StepCirleProps> = ({
  id,
  handleClick,
  currentStep,
}) => {
  const handleAnimation = (): string => {
    if (currentStep === 0) return "start";
    if (currentStep === id) return "current";
    if (currentStep !== 0 && currentStep !== id) return "idle";
    return "start";
  };
  return (
    <Circle
      animate={handleAnimation()}
      transition={{ duration: 0.7 }}
      variants={variants}
      whileHover={{ scale: 0.85 }}
      onClick={() => {
        handleClick(id);
      }}
    >
      <StepText>{getStepText(id)}</StepText>
    </Circle>
  );
};

import { FC, useEffect, useState } from "react";
import { GeneralText, TitleText } from "../../components/atoms";
import { HomeWrapper, InfoSection, StepsSection } from "./styles";
import { text } from "../../assets/text";
import { StepCircle } from "../../components/step-circle";
import { AMOUNT_OF_STEPS } from "../../assets";

export const Home: FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleClick = (stepNumber: number) => {
    if (stepNumber === currentStep) {
      setCurrentStep(0);
    } else {
      setCurrentStep(stepNumber);
    }
  };
  return (
    <HomeWrapper>
      <InfoSection>
        <TitleText>{text.general.title}</TitleText>
        <GeneralText>{text.general.intro1}</GeneralText>
        <GeneralText>{text.general.intro2}</GeneralText>
      </InfoSection>
      <StepsSection>
        {AMOUNT_OF_STEPS.map((id, index) => {
          return (
            <StepCircle
              key={index}
              id={id}
              handleClick={handleClick}
              currentStep={currentStep}
            />
          );
        })}
      </StepsSection>
    </HomeWrapper>
  );
};

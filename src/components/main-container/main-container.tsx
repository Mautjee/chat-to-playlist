import { FC, ReactNode } from "react";
import { useViewport } from "../../hooks";
import { MainWrap } from "./styles";

interface MainContainerProps {
  children: ReactNode;
}
export const MainContainer: FC<MainContainerProps> = ({ children }) => {
  const { height, width } = useViewport();

  return (
    <MainWrap height={height} width={width}>
      {children}
    </MainWrap>
  );
};

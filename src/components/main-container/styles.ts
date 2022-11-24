import styled from "@emotion/styled";

interface MainProps {
  height: number;
  width: number;
}
export const MainWrap = styled.div<MainProps>`
  height: ${({ height }) => `${height}px`};
  width: ${({ width }) => `${width}px`};
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
`;

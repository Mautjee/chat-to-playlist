import styled from "@emotion/styled";
import { TitleText } from "../../components/atoms";

export const HomeWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const InfoSection = styled.section`
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  h2 {
    margin-top: 102px;
    margin-bottom: 20px;
  }
`;
export const StepsSection = styled.section`
  height: 70%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 150px;
`;

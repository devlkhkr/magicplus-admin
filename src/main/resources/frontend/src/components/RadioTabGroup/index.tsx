import { Divider } from "antd";
import { PropsWithChildren } from "react";
import styled from "styled-components";

const RadioTabStyled = styled.div`
  > div {
    width: 100%;
    display: flex;
    label {
      width: 100%;
      text-align: center;
    }
  }
`;

const RadioTabGroup: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <RadioTabStyled>{children}</RadioTabStyled>
      <Divider />
    </>
  );
};

export default RadioTabGroup;

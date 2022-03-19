import React from "react";
import { Container, Img } from "./Elements";
import { truck } from "assets";

interface Props {
  reverse?: boolean;
  content: React.ReactNode;
  logo?: () => void;
}

export const Navbar: React.FC<Props> = ({ content, reverse, logo }) => {
  return (
    <Container
      justify="space-between"
      align="center"
      width="100%"
      padding="0px 10px"
      heigh="30px"
      direction={reverse ? "row-reverse" : "row"}
    >
      <Container justify="space-between" align="center" width="auto">
        <Img width="30px" src={truck} alt="truck-logo" pointer onClick={logo} />
      </Container>
      <Container justify="center" align="center" width="auto">
        {content}
      </Container>
    </Container>
  );
};

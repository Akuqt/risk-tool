import React from "react";
import { Container, Img } from "./Elements";

interface Props {
  reverse?: boolean;
  content: React.ReactNode;
  logoHandler?: () => void;
  logo: string;
}

export const Navbar: React.FC<Props> = ({
  content,
  reverse,
  logoHandler,
  logo,
}) => {
  return (
    <Container
      justify="space-between"
      align="center"
      width="100%"
      padding="0px 10px"
      heigh="30px"
      direction={reverse ? "row-reverse" : "row"}
    >
      <Container
        justify="space-between"
        align="center"
        width="auto"
        heigh="30px"
      >
        <Img
          width="30px"
          src={logo}
          alt="truck-logo"
          pointer
          onClick={logoHandler}
        />
      </Container>
      <Container justify="center" align="center" width="auto" heigh="30px">
        {content}
      </Container>
    </Container>
  );
};

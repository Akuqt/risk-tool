import React from "react";
import { Container, Txt } from "./Elements";

interface SemiBoldProps {
  main: string;
  secondary: string;
  fs: string;
  color: string;
  width: string;
  margin?: string;
}

export const SemiBold: React.FC<SemiBoldProps> = ({
  main,
  secondary,
  fs,
  color,
  width,
  margin,
}) => {
  return (
    <Container
      width={width}
      justify="flex-start"
      align="center"
      margin={margin}
    >
      <Txt fs={fs} color={color} bold margin="0px 4px 0px 0px">
        {main}
      </Txt>
      <Txt fs={fs} color={color}>
        {secondary}
      </Txt>
    </Container>
  );
};

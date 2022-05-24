import React from "react";
import { Container } from "./Elements";

interface Props {
  show?: boolean;
  bg?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  height?: string;
  up?: boolean;
}

export const CustomModal: React.FC<Props> = ({
  show,
  bg,
  bottom,
  children,
  left,
  right,
  top,
  height,
  up,
}) => {
  return (
    <Container
      width="100%"
      heigh={height || "100%"}
      justify="center"
      align={up ? "flex-start" : "center"}
      padding="10px"
      bg={bg}
      style={{
        position: "absolute",
        top: top || "0",
        left: left || "0",
        right: right || "0",
        bottom: bottom || "0",
        zIndex: "9999",
        opacity: show ? "1" : "0",
        transition: "opacity 0.15s ease-in-out",
        display: show ? "flex" : "none",
      }}
    >
      {children}
    </Container>
  );
};

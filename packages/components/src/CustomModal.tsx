import React from "react";
import { Container } from "./Elements";

interface Props {
  show?: boolean;
  bg?: string;
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
}

export const CustomModal: React.FC<Props> = ({
  show,
  bg,
  bottom,
  children,
  left,
  right,
  top,
}) => {
  return (
    <Container
      width="100%"
      heigh="100%"
      align="center"
      justify="center"
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

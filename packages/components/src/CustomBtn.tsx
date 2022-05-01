import React from "react";
import { MdLockOpen, MdLockOutline } from "react-icons/md";
import { Container, Btn, Txt } from "./Elements";

interface BtnProps {
  onClick?: () => void;
  margin?: string;
  padding?: string;
  bg?: string;
  label: string;
  lock?: boolean;
}

export const CustomBtn: React.FC<BtnProps> = (props) => {
  return (
    <Btn
      bg={props.bg}
      width="100%"
      borderRadius="4px"
      padding={props.padding}
      margin={props.margin}
      onClick={props.onClick}
      hover={props.lock}
      style={{
        position: "relative",
      }}
      disabled={props.lock}
    >
      <Txt color="black" fs="18px" pointer>
        {props.label}
      </Txt>
      <Container
        width="fit-content"
        align="center"
        justify="center"
        style={{ position: "absolute", left: "calc(100% - 24px)" }}
      >
        {props.lock ? (
          <MdLockOutline size={20} color="black" />
        ) : (
          <MdLockOpen size={20} color="black" />
        )}
      </Container>
    </Btn>
  );
};

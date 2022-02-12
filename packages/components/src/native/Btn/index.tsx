import React from "react";
import { Button, Label } from "./Elements";

interface Props {
  label: string;
  bg: string;
  onPress: () => void;
  disabled?: boolean;
  width?: string;
  fz?: string;
  bold?: boolean;
}

export const Btn: React.FC<Props> = (props) => {
  return (
    <Button
      width={props.width ? props.width : "150px"}
      bg={props.bg}
      onPress={props.onPress}
      disabled={props.disabled}
    >
      <Label
        bold={props.bold}
        fz={props.fz}
        color={props.disabled ? "#5f5f5f" : "#000000"}
      >
        {props.label}
      </Label>
    </Button>
  );
};

import React, { useState, useEffect } from "react";
import { Container, TextInput, Btn, AniRotation } from "./Elements";
import { MdPinDrop, MdClear, MdLoop } from "react-icons/md";

interface Props {
  value: string;
  onChange: (v: string) => void;
  margin?: string;
  loading?: boolean;
  onClick?: (c: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const CustomInput: React.FC<Props> = (props) => {
  const [click, setClick] = useState(false);

  useEffect(() => {
    if (props.value) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [props.value]);

  return (
    <Container
      width="100%"
      align="center"
      justify="center"
      margin={props.margin}
      style={{
        position: "relative",
      }}
    >
      <Container
        width="fit-content"
        align="center"
        justify="center"
        style={{
          position: "absolute",
          left: "calc(100% - 24px)",
        }}
      >
        <Btn
          disabled={props.disabled}
          onClick={() => {
            if (click) {
              props.onChange("");
            }
            setClick((c) => !c);
            props.onClick && props.onClick(!click);
          }}
        >
          {props.loading ? (
            <AniRotation>
              <MdLoop size={20} color="black" />
            </AniRotation>
          ) : click ? (
            <MdClear size={20} color="black" />
          ) : (
            <MdPinDrop size={20} color="black" />
          )}
        </Btn>
      </Container>
      <TextInput
        disabled={props.disabled}
        padding="6px 10px"
        placeholder={props.placeholder}
        color={props.disabled ? "gray" : "black"}
        fs="18px"
        width="100%"
        borderBottom
        borderBottomColor="black"
        value={props.value}
        onChange={(e) => {
          props.onChange(e.target.value);
        }}
      />
    </Container>
  );
};

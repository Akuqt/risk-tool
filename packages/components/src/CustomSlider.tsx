import React, { useState } from "react";
import { Container, Slider, Txt } from "./Elements";

interface Props {
  color: string;
  max: number;
  labels: string[];
  onChange: (v: number) => void;
  placeholder: string;
}

export const CustomSlider: React.FC<Props> = ({
  color,
  labels,
  max,
  onChange,
  placeholder,
}) => {
  const [value, setValue] = useState("0");
  return (
    <Container
      width="100%"
      align="flex-start"
      justify="center"
      direction="column"
    >
      <Txt color="#000000" fs="16px" margin="4px">
        {placeholder}
      </Txt>
      <Container width="100%" align="center" justify="flex-start">
        <Slider
          color={color}
          type="range"
          min={0}
          max={max}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onChange(parseInt(e.target.value, 10));
          }}
          style={{
            width: "80%",
          }}
        />
        <Txt color="#000000" fs="16px" margin="0px 10px">
          {labels[parseInt(value, 10)]}
        </Txt>
      </Container>
    </Container>
  );
};

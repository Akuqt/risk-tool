import React, { useState, useEffect } from "react";
import { Container, Txt } from "./Elements";

interface Props {
  group: string;
  length: number;
  onChange: (index: number) => void;
  reset?: boolean;
}

export const RadioGroup: React.FC<Props> = ({
  group,
  length,
  onChange,
  reset,
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reset) {
      setIndex(0);
    }
  }, [reset]);

  return (
    <Container
      direction="column"
      align="flex-start"
      justify="center"
      width="100%"
    >
      <Txt fs="15px" color="#000000" bold>
        {group}
      </Txt>
      <Container
        width="100%"
        align="center"
        justify="flex-start"
        padding="0px 4px"
      >
        {new Array(length).fill("").map((_, i) => (
          <input
            type="radio"
            key={i * 2 + 1}
            name={group}
            value={i}
            style={{
              margin: "4px",
              cursor: "pointer",
            }}
            checked={i === index}
            onChange={() => {
              setIndex(i);
              onChange(i);
            }}
          />
        ))}
      </Container>
    </Container>
  );
};

import React, { useEffect, useState, useRef } from "react";
import { Btn, Container, Txt, Spinner } from "components/src/Elements";
import { CustomSlider } from "components";
import { MdClose } from "react-icons/md";
import { Post } from "services";

interface Props {
  close: (risk: number | null) => void;
  url: string;
}

export const Risk: React.FC<Props> = ({ close, url }) => {
  const mounted = useRef(false);
  const [risk, setRisk] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    nBicycles: "0",
    nMotorcycles: "0",
    nPedestrians: "0",
    road: "0",
    glide: "0",
    speed: "0",
    time: "0",
    lighting: "0",
    splitRoad: "0",
    roadWorks: "0",
    separator: "0",
  });

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return (
    <Container
      width="30%"
      padding="10px"
      align="center"
      justify="center"
      bg="#ffffffdd"
      borderRadius="4px"
      direction="column"
      shadow
    >
      <Container align="center" justify="space-between" width="100%">
        <Container width="fit-content" justify="center" align="center">
          <Txt color="#000000" fs="16" bold margin="0px 4px 0px 0px">
            Risk:
          </Txt>
          {loading ? (
            <Spinner color="#000000" borderHeight="2px" radius="20px" />
          ) : (
            <Txt color="#000000" fs="16">
              {risk || "--"} %
            </Txt>
          )}
        </Container>
        <Btn
          onClick={() => {
            close(risk);
            setRisk(null);
          }}
        >
          <MdClose color="#000000" size={30} />
        </Btn>
      </Container>
      <CustomSlider
        placeholder="Bicycles"
        max={2}
        labels={["Few", "Moderate", "Full"]}
        color="tomato"
        onChange={(v) => {
          setValues((c) => ({ ...c, nBicycles: (v * 5).toString() }));
        }}
      />
      <CustomSlider
        placeholder="Motorcycles"
        max={2}
        labels={["Few", "Moderate", "Full"]}
        color="tomato"
        onChange={(v) => {
          setValues((c) => ({ ...c, nMotorcycles: (v * 5).toString() }));
        }}
      />
      <CustomSlider
        placeholder="Pedestrians"
        max={2}
        labels={["Few", "Moderate", "Full"]}
        color="tomato"
        onChange={(v) => {
          setValues((c) => ({ ...c, nPedestrians: (v * 5).toString() }));
        }}
      />
      <CustomSlider
        placeholder="Road condition"
        max={2}
        labels={["Bad", "Normal", "Excelent"]}
        color="tomato"
        onChange={(v) => {
          setValues((c) => ({ ...c, road: (v * 5).toString() }));
        }}
      />
      <CustomSlider
        placeholder="Road glide"
        max={4}
        labels={["SPD", "SPA", "PD", "PR", "PB"]}
        color="tomato"
        onChange={(v) => {
          setValues((c) => ({ ...c, glide: (v * 2 + 2).toString() }));
        }}
      />
      <CustomSlider
        placeholder="Speed"
        max={2}
        labels={["Low", "Moderate", "High"]}
        color="tomato"
        onChange={(v) => {
          setValues((c) => ({ ...c, speed: (v * 5).toString() }));
        }}
      />
      <CustomSlider
        placeholder="Time"
        max={2}
        labels={["Morning", "Noon", "Night"]}
        color="tomato"
        onChange={(v) => {
          setValues((c) => ({ ...c, time: (v * 5).toString() }));
        }}
      />
      <CustomSlider
        placeholder="Road lighting"
        max={2}
        labels={["Bad", "Normal", "Excelent"]}
        color="tomato"
        onChange={(v) => {
          setValues((c) => ({ ...c, lighting: (v * 5).toString() }));
        }}
      />
      <CustomSlider
        placeholder="Split road"
        max={1}
        labels={["Yes", "No"]}
        color="tomato"
        onChange={(v) => {
          setValues((c) => ({ ...c, splitRoad: (v * 10).toString() }));
        }}
      />
      <CustomSlider
        placeholder="Road Works"
        max={1}
        labels={["Low", "High"]}
        color="tomato"
        onChange={(v) => {
          setValues((c) => ({ ...c, roadWorks: (v * 10).toString() }));
        }}
      />
      <CustomSlider
        placeholder="Road separator quality"
        max={2}
        labels={["Bad", "Normal", "Excelent"]}
        color="tomato"
        onChange={(v) => {
          setValues((c) => ({ ...c, separator: (v * 5).toString() }));
        }}
      />
      <Btn
        margin="50px 0px 0px 0px"
        width="50%"
        bg="#FF6347"
        borderRadius="4px"
        padding="4px"
        onClick={async () => {
          setLoading(true);
          const res = await Post<{ result: number | null }>(url, "/risk", {
            values: Object.values(values),
          });
          if (mounted.current) {
            setRisk(res.data.result);
            setLoading(false);
          }
        }}
      >
        <Container
          width="100%"
          align="center"
          justify="center"
          padding="0px 4px"
        >
          <Txt fs="16px" color="#000000">
            Calculate Risk
          </Txt>
        </Container>
      </Btn>
    </Container>
  );
};

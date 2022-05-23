import React, { useState, useEffect } from "react";
import { Container, TxtBtn } from "./Elements";
import { SemiBold } from "./SemiBold";
import { FLog2 } from "types";

interface Props {
  data: FLog2;
  width: string;
  bg?: string;
  margin?: string;
  getDriver: (id: string) => string;
  getAddress: (lat: number, lng: number) => Promise<string>;
  actions: {
    dismiss: () => void;
    view: (address: string) => void;
    recalculate: () => void;
  };
}

export const LogCard: React.FC<Props> = ({
  data,
  width,
  bg,
  margin,
  getDriver,
  actions,
  getAddress,
}) => {
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (data.lat && data.lng) {
      getAddress(data.lat, data.lng).then((res) => {
        setAddress(res);
      });
    }
  }, [data.lat, data.lng, getAddress]);

  return (
    <Container
      width={width}
      justify="center"
      align="center"
      margin={margin}
      bg={bg}
      direction="column"
      shadow
      padding="20px"
      borderRadius="5px"
    >
      <Container width="100%" justify="space-between" align="center">
        <SemiBold
          width="20%"
          main="Reason:"
          secondary={data.alert.reason}
          fs="18px"
          color="#000000"
        />
        <SemiBold
          width="20%"
          main="Driver:"
          secondary={getDriver(data.driver)}
          fs="18px"
          color="#000000"
        />

        <Container
          width="30%"
          justify="center"
          direction="column"
          align="flex-end"
        >
          <SemiBold
            width="fit-content"
            main="Destination:"
            secondary={data.destination.address}
            fs="18px"
            color="#000000"
          />
          <SemiBold
            width="fit-content"
            main="Near:"
            secondary={address}
            fs="18px"
            color="#000000"
          />
        </Container>
        <Container
          width="30%"
          justify="center"
          direction="column"
          align="flex-end"
        >
          <SemiBold
            width="fit-content"
            main="Created at:"
            secondary={new Date(data.createdAt).toLocaleString()}
            fs="18px"
            color="#000000"
          />
          <SemiBold
            width="fit-content"
            main="Updated at:"
            secondary={new Date(data.updatedAt).toLocaleString()}
            fs="18px"
            color="#000000"
          />
        </Container>
      </Container>
      <Container
        width="100%"
        justify="space-between"
        align="center"
        borderBottom
        borderBottomColor="#000000"
        padding="0px 0px 15px 0px"
        margin="0px 0px 15px 0px"
      >
        <SemiBold
          width="fit-content"
          main="Description:"
          secondary={data.alert.description || "Not provided"}
          fs="18px"
          color="#000000"
        />
      </Container>
      <Container width="100%" justify="space-between" align="center">
        <Container width="50%" justify="space-between" align="center">
          <SemiBold
            width="fit-content"
            main="Action:"
            secondary={data.action}
            fs="18px"
            color="#000000"
          />
        </Container>
        <Container width="50%" justify="flex-end" align="center">
          <TxtBtn
            color={data.action === "None" ? "#0094FF" : "gray"}
            margin="0px 5px"
            disabled={data.action !== "None"}
            onClick={() => actions.dismiss()}
          >
            Dismiss
          </TxtBtn>
          <TxtBtn
            color={data.action === "None" ? "#0094FF" : "gray"}
            margin="0px 5px"
            disabled={data.action !== "None"}
            onClick={() => actions.view(address)}
          >
            View
          </TxtBtn>
          <TxtBtn
            color={data.action === "None" ? "#0094FF" : "gray"}
            margin="0px 5px"
            disabled={data.action !== "None"}
            onClick={() => actions.recalculate()}
          >
            Recalculate
          </TxtBtn>
        </Container>
      </Container>
    </Container>
  );
};

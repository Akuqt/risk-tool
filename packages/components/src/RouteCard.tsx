import React from "react";
import { Container, TxtBtn } from "./Elements";
import { SemiBold } from "./SemiBold";
import { BestRoute } from "types";

interface Props {
  data: BestRoute;
  width: string;
  bg?: string;
  margin?: string;
  getDriver: (id: string) => string;
  formatNumber: (num: number) => string;
  origin: string;
  actions: {
    view: () => void;
  };
}

export const RouteCard: React.FC<Props> = ({
  data,
  width,
  bg,
  margin,
  getDriver,
  actions,
  origin,
  formatNumber,
}) => {
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
          main="Driver:"
          secondary={getDriver(data.driver)}
          fs="18px"
          color="#000000"
        />
        <SemiBold
          width="20%"
          main="Material:"
          secondary={data.material}
          fs="18px"
          color="#000000"
        />
        <SemiBold
          width="30%"
          main="Origion:"
          secondary={origin}
          fs="18px"
          color="#000000"
        />
        <SemiBold
          width="30%"
          main="Created at:"
          secondary={new Date(data.createdAt).toLocaleString()}
          fs="18px"
          color="#000000"
        />
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
          width="20%"
          main="Distance:"
          secondary={formatNumber(data.distance / 1000) + " km"}
          fs="18px"
          color="#000000"
        />
        <SemiBold
          width="20%"
          main="Risk:"
          secondary={formatNumber(data.risk) + "%"}
          fs="18px"
          color="#000000"
        />
        <SemiBold
          width="30%"
          main="Destination:"
          secondary={data.address}
          fs="18px"
          color="#000000"
        />
        <SemiBold
          width="30%"
          main="Updated at:"
          secondary={new Date(data.updatedAt).toLocaleString()}
          fs="18px"
          color="#000000"
        />
      </Container>
      <Container width="100%" justify="flex-end" align="center">
        <Container width="50%" justify="space-between" align="center">
          <SemiBold
            width="fit-content"
            main="Status:"
            secondary={data.active ? "Active" : "Inactive"}
            fs="18px"
            color="#000000"
          />
        </Container>
        <Container width="50%" justify="flex-end" align="center">
          <TxtBtn
            color="#0094FF"
            margin="0px 5px"
            onClick={() => actions.view()}
          >
            View
          </TxtBtn>
        </Container>
      </Container>
    </Container>
  );
};

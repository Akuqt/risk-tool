import React from "react";
import Image from "../RemoteSvg";
import {
  Container,
  Information,
  Label,
  AvatarContainer,
  MainLabels,
} from "./Elements";

interface Props {
  onPress: () => void;
  name: string;
  lastname: string;
  role: string;
  id: string;
  img: string;
}

export const UserCard: React.FC<Props> = (props) => {
  return (
    <Container onPress={props.onPress}>
      <Information>
        <MainLabels>
          <Label>
            {props.name.replace(/^\w/, (c) => c.toUpperCase())}{" "}
            {props.lastname.replace(/^\w/, (c) => c.toUpperCase())}
          </Label>
          <Label>{props.role.replace(/^\w/, (c) => c.toUpperCase())}</Label>
        </MainLabels>
        <AvatarContainer>
          <Image
            source={{ uri: props.img }}
            style={{ width: 600, height: 60 }}
          />
        </AvatarContainer>
      </Information>
      <Label>ID: {props.id}</Label>
    </Container>
  );
};

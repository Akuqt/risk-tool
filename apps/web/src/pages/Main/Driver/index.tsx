import React, { useEffect, useState } from "react";
import { Container, Btn, Txt, TextInput, Slct } from "components/src/Elements";
import { Modal } from "components";

const driversBackend = [
  {
    name: "Nombre1",
    lastname: "Apellido1",
    plate: "AAA111",
    gender: "F",
    username: "username",
  },
  {
    name: "Nombre2",
    lastname: "Apellido2",
    plate: "BBB222",
    gender: "M",
    username: "napellido",
  },
  {
    name: "Nombre3",
    lastname: "Apellido3",
    plate: "CCC333",
    gender: "F",
    username: "nombrea",
  },
  {
    name: "Nombre4",
    lastname: "Apellido4",
    plate: "DDD444",
    gender: "M",
    username: "myuser",
  },
  {
    name: "Nombre5",
    lastname: "Apellido5",
    plate: "EEE555",
    gender: "F",
    username: "myname",
  },
];

export const Driver: React.FC = () => {
  const [modalState, changeModalState] = useState(false);
  const [drivers, setDrivers] = useState<typeof driversBackend>([]);

  useEffect(() => {
    setDrivers(driversBackend);
  }, []);

  return (
    <Container
      width="100%"
      justify="center"
      align="center"
      heigh="calc(100% - 30px)"
      bg="#FFFFFF"
      direction="column"
    >
      <Container
        width="100%"
        justify="center"
        align="center"
        heigh="100%"
        bg="#FFFFFF"
        direction="column"
      >
        <Txt fs="28px" bold color="#000000" margin="0px 0px 20px 0px">
          Drivers
        </Txt>
        <Container
          bg="#FFFFFF"
          justify="center"
          heigh="5%"
          width="45%"
          align="center"
          borderRadius="8px"
          padding="10px"
          direction="column"
          shadow
        >
          <Container justify="space-around" align="center" width="100%">
            <Txt fs="20px" color="#000000" margin="0px 0px 5px 0px">
              Name
            </Txt>
            <Txt fs="20px" color="#000000" margin="0px 0px 5px 0px">
              Lastname
            </Txt>
            <Txt fs="20px" color="#000000" margin="0px 0px 5px 0px">
              Plate
            </Txt>
            <Txt fs="20px" color="#000000" margin="0px 0px 5px 0px">
              Gender
            </Txt>
            <Txt fs="20px" color="#000000" margin="0px 0px 5px 0px">
              Username
            </Txt>
          </Container>
        </Container>
        <CardsDrivers />
        <Btn
          onClick={() => changeModalState(!modalState)}
          type="submit"
          bg="#FF0000"
          width="20%"
          height="30px"
          borderRadius="4px"
          margin="30px 0px 0px 0px"
        >
          <Txt color="#000000" fs="16px" pointer>
            Add New Driver
          </Txt>
        </Btn>
      </Container>
      <Modal stt={modalState} changeState={changeModalState}>
        <FormDriver
          ModalState
          changeModalState={changeModalState}
          listDrivers={drivers}
          addDriver={setDrivers}
        />
      </Modal>
    </Container>
  );
};

export const CardsDrivers: React.FC = () => {
  return (
    <Container
      bg="#FFFFFF"
      justify="center"
      heigh="5%"
      width="45%"
      align="center"
      borderRadius="8px"
      padding="10px"
      margin="15px 0px 0px 0px"
      direction="column"
      shadow
    >
      <Container justify="space-around" align="center" width="100%">
        <Txt fs="20px" color="#000000" margin="0px 0px 5px 0px">
          Name
        </Txt>
        <Txt fs="20px" color="#000000" margin="0px 0px 5px 0px">
          Lastname
        </Txt>
        <Txt fs="20px" color="#000000" margin="0px 0px 5px 0px">
          Plate
        </Txt>
        <Txt fs="20px" color="#000000" margin="0px 0px 5px 0px">
          Gender
        </Txt>
        <Txt fs="20px" color="#000000" margin="0px 0px 5px 0px">
          Username
        </Txt>
      </Container>
    </Container>
  );
};

interface IState {
  ModalState: boolean;
  changeModalState: React.Dispatch<React.SetStateAction<boolean>>;
  listDrivers: typeof driversBackend;
  addDriver: React.Dispatch<React.SetStateAction<typeof driversBackend>>;
}

export const FormDriver: React.FC<IState> = ({
  ModalState,
  changeModalState,
}) => {
  return (
    <Container
      width="100%"
      justify="center"
      align="center"
      heigh="100%"
      bg="#FFFFFF"
      direction="column"
    >
      <form>
        <TextInput
          margin="60px 0px 5px 0px"
          type="text"
          color="#000000"
          fs="16px"
          width="100%"
          borderBottom
          borderBottomColor="#FF6347"
          placerholderColor="#a3a3a3"
          placeholder="Name"
          name="name"
        />
        <TextInput
          margin="20px 0px 5px 0px"
          type="text"
          color="#000000"
          fs="16px"
          width="100%"
          borderBottom
          borderBottomColor="#FF6347"
          placerholderColor="#a3a3a3"
          placeholder="Lastname"
          name="lastname"
        />
        <TextInput
          margin="20px 0px 5px 0px"
          type="text"
          color="#000000"
          fs="16px"
          width="100%"
          borderBottom
          borderBottomColor="#FF6347"
          placerholderColor="#a3a3a3"
          placeholder="Plate"
          name="plate"
        />
        <Slct name="gender" defaultValue={0}>
          <option disabled value={0}>
            Gender
          </option>
          <option>M</option>
          <option>F</option>
        </Slct>
        <TextInput
          margin="20px 0px 5px 0px"
          type="text"
          color="#000000"
          fs="16px"
          width="100%"
          borderBottom
          borderBottomColor="#FF6347"
          placerholderColor="#a3a3a3"
          placeholder="Username"
          name="username"
        />
        <TextInput
          margin="20px 0px 5px 0px"
          type="password"
          color="#000000"
          fs="16px"
          width="100%"
          borderBottom
          borderBottomColor="#FF6347"
          placerholderColor="#a3a3a3"
          placeholder="Password"
          name="password"
        />
        <Btn
          type="submit"
          onClick={() => changeModalState(!ModalState)}
          bg="#FF0000"
          width="100%"
          height="30px"
          borderRadius="4px"
          margin="30px 0px 0px 0px"
        >
          <Txt color="#000000" fs="16px" pointer>
            Save Driver
          </Txt>
        </Btn>
      </form>
    </Container>
  );
};

import React, { useEffect, useState, useReducer } from "react";
import { Modal } from "components";
import {
  Txt,
  Btn,
  Card,
  Slct,
  CardCtnr,
  TextInput,
  Container,
} from "components/src/Elements";

const driversBackend = [
  {
    name: "Laura",
    lastname: "Arango",
    plate: "AAA111",
    gender: "Female",
    username: "lmarangoc",
  },
  {
    name: "Italo",
    lastname: "Alfaro",
    plate: "BBB222",
    gender: "Male",
    username: "ialfaro",
  },
  {
    name: "Laura",
    lastname: "Correa",
    plate: "CCC333",
    gender: "Female",
    username: "lmcorrea",
  },
  {
    name: "Carlos",
    lastname: "Gonzalez",
    plate: "AAD444",
    gender: "Male",
    username: "cgonzalez",
  },
  {
    name: "Laura",
    lastname: "Villegas",
    plate: "EEE555",
    gender: "Female",
    username: "lvillegas",
  },
];

export const Driver: React.FC = () => {
  const [modalState, changeModalState] = useState(false);
  const [drivers, setDrivers] = useState<typeof driversBackend>([]);
  const [search, setSearch] = useState("");
  const [filterD, setFilterD] = useState(drivers);

  useEffect(() => {
    setDrivers(driversBackend);
  }, []);

  useEffect(() => {
    setFilterD(
      drivers.filter((elemento) =>
        JSON.stringify(elemento).toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, drivers]);

  return (
    <Container
      width="100%"
      heigh="calc(100% - 30px)"
      justify="center"
      align="center"
      direction="column"
    >
      <Container
        width="100%"
        justify="center"
        align="center"
        heigh="100%"
        direction="column"
      >
        <Txt fs="28px" bold color="#000000" margin="0px 0px 30px 0px">
          Drivers
        </Txt>
        <Container width="100%" justify="center" align="center" direction="row">
          <TextInput
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ border: "1px solid #FF6347", height: "30px" }}
            margin="0px 0px 20px 0px"
            padding="0px 0px 0px 10px"
            type="text"
            color="#000000"
            fs="16px"
            width="25%"
            placerholderColor="#a3a3a3"
            borderRadius="4px"
            placeholder="Search"
          />
          <Btn
            onClick={() => changeModalState(!modalState)}
            type="submit"
            bg="#FF6347"
            width="15%"
            height="30px"
            borderRadius="4px"
            margin="0px 0px 20px 40px"
          >
            <Txt color="#000000" fs="16px" pointer>
              Add New Driver
            </Txt>
          </Btn>
        </Container>
        <Container
          width="100%"
          justify="center"
          align="center"
          direction="column"
        >
          <Container
            width="80%"
            justify="center"
            align="center"
            direction="column"
          >
            <CardCtnr>
              {filterD?.map((drvr, index) => {
                return (
                  <Card key={index}>
                    <Txt color="#000000" fs="16px">
                      Name: {drvr?.name}
                    </Txt>
                    <Txt color="#000000" fs="16px">
                      Lastname: {drvr?.lastname}
                    </Txt>
                    <Txt color="#000000" fs="16px">
                      Plate: {drvr?.plate}
                    </Txt>
                    <Txt color="#000000" fs="16px">
                      Gender: {drvr?.gender}
                    </Txt>
                    <Txt color="#000000" fs="16px">
                      Username: {drvr?.username}
                    </Txt>
                  </Card>
                );
              })}
            </CardCtnr>
          </Container>
        </Container>
      </Container>
      <Modal stt={modalState} changeState={changeModalState}>
        <FormDriver
          modalState
          changeModalState={changeModalState}
          listDrivers={drivers}
          addDriver={setDrivers}
        />
      </Modal>
    </Container>
  );
};

interface IState {
  modalState: boolean;
  changeModalState: React.Dispatch<React.SetStateAction<boolean>>;
  listDrivers: typeof driversBackend;
  addDriver: React.Dispatch<React.SetStateAction<typeof driversBackend>>;
}

export const FormDriver: React.FC<IState> = ({
  modalState,
  changeModalState,
}) => {
  const initialState: DriverState = {
    name: "",
    lastname: "",
    plate: "",
    gender: "",
    username: "",
    password: "",
  };

  interface DriverState {
    name: string;
    lastname: string;
    plate: string;
    gender: string;
    username: string;
    password: string;
  }

  interface DriverAction {
    type:
      | "setName"
      | "setLastname"
      | "setPlate"
      | "setGender"
      | "setUsername"
      | "setPassword"
      | "clearAll";
    payload?: any;
  }

  const reducer = (state: DriverState, action: DriverAction): DriverState => {
    switch (action.type) {
      case "setName":
        return { ...state, name: action.payload };
      case "setLastname":
        return { ...state, lastname: action.payload };
      case "setPlate":
        return { ...state, plate: action.payload };
      case "setGender":
        return { ...state, gender: action.payload };
      case "setUsername":
        return { ...state, username: action.payload };
      case "setPassword":
        return { ...state, password: action.payload };
      case "clearAll":
        return initialState;
      default:
        return state;
    }
  };

  const [{ name, lastname, plate, gender, username, password }, dispatcher] =
    useReducer(reducer, initialState);

  return (
    <Container
      width="100%"
      justify="center"
      align="center"
      heigh="100%"
      bg="#FFFFFF"
      direction="column"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
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
          value={name}
          onChange={(e) =>
            dispatcher({ type: "setName", payload: e.target.value })
          }
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
          value={lastname}
          onChange={(e) =>
            dispatcher({ type: "setLastname", payload: e.target.value })
          }
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
          value={plate}
          onChange={(e) =>
            dispatcher({ type: "setPlate", payload: e.target.value })
          }
        />
        <Slct
          name="gender"
          value={gender}
          onChange={(e) =>
            dispatcher({ type: "setGender", payload: e.target.value })
          }
        >
          <option>Gender</option>
          <option>Male</option>
          <option>Female</option>
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
          value={username}
          onChange={(e) =>
            dispatcher({ type: "setUsername", payload: e.target.value })
          }
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
          value={password}
          onChange={(e) =>
            dispatcher({ type: "setPassword", payload: e.target.value })
          }
        />
        <Btn
          type="submit"
          onClick={() => changeModalState(!modalState)}
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

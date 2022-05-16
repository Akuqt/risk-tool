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
import { Post } from "services";
import { useApiUrl } from "../../../hooks";
import { FDriver, IError } from "types";
import { RootState, saveCompany } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";

export const Driver: React.FC = () => {
  const [modalState, changeModalState] = useState(false);
  const [search, setSearch] = useState("");

  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );
  const [filterD, setFilterD] = useState(company.drivers);

  useEffect(() => {
    setFilterD(
      company.drivers.filter((elemento) =>
        JSON.stringify(elemento).toLowerCase().includes(search.toLowerCase()),
      ),
    );
  }, [search, company.drivers]);

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
                  <Card
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Txt
                      color="#000000"
                      fs="18px"
                      bold
                      margin="0px 0px 10px 0px"
                    >
                      {drvr?.name + " " + drvr?.lastname}
                    </Txt>

                    <img
                      style={{ width: "80%" }}
                      src={`https://avatars.dicebear.com/api/${
                        drvr.gender || "male"
                      }/${drvr.id || "driverU"}.svg`}
                      alt=""
                    />
                    <Txt color="#000000" fs="16px" margin="10px 0px">
                      Plate: {drvr?.plate}
                    </Txt>
                  </Card>
                );
              })}
            </CardCtnr>
          </Container>
        </Container>
      </Container>
      <Modal stt={modalState} changeState={changeModalState}>
        <FormDriver changeModalState={changeModalState} />
      </Modal>
    </Container>
  );
};

interface IState {
  changeModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

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

export const FormDriver: React.FC<IState> = ({ changeModalState }) => {
  const [{ name, lastname, plate, gender, username, password }, dispatcher] =
    useReducer(reducer, initialState);

  const apiUrl = useApiUrl();

  const dispatch = useDispatch();

  const company = useSelector(
    (state: RootState) => state.companyReducer.company,
  );

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
          <option value="gender">Gender</option>
          <option value={"male"}>Male</option>
          <option value={"female"}>Female</option>
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
          onClick={async () => {
            const res = await Post<{
              ok: boolean;
              result: FDriver;
              error?: IError;
            }>(apiUrl, "/auth/sign-up", {
              name,
              lastname,
              plate,
              username,
              gender,
              password,
              material: "",
              type: "driver",
              company: company.name,
            });

            if (res.data.ok) {
              const driver = res.data.result;
              dispatch(
                saveCompany({
                  ...company,
                  drivers: [
                    ...company.drivers,
                    {
                      gender: driver.gender,
                      id: driver.id,
                      lastname: driver.lastname,
                      name: driver.name,
                      plate: driver.plate,
                      active: false,
                    },
                  ],
                }),
              );
              changeModalState((c) => !c);
            } else {
              // eslint-disable-next-line no-alert
              alert(res.data.error?.message);
            }
          }}
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

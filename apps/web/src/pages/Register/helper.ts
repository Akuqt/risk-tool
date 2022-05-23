import { RegisterAction, RegisterState } from "types";

export const initialState: RegisterState = {
  name: "",
  address: "",
  password: "",
  username: "",
  error: true,
  coords: {
    lat: NaN,
    lng: NaN,
  },
};

export const reducer = (
  state: RegisterState,
  action: RegisterAction,
): RegisterState => {
  switch (action.type) {
    case "setName":
      return { ...state, name: action.payload };
    case "setAddress":
      return { ...state, address: action.payload };
    case "setUsername":
      return { ...state, username: action.payload };
    case "setPassword":
      return { ...state, password: action.payload };
    case "clearAll":
      return initialState;
    case "setError":
      return { ...state, error: action.payload };
    case "setCoords":
      return { ...state, coords: action.payload };
    default:
      return state;
  }
};

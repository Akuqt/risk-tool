import { LoginAction, LoginState } from "types";

export const initialState: LoginState = {
  password: "",
  username: "",
};

export const reducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
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

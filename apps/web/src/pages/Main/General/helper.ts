import { GeneralAction, GeneralState } from "types";

export const initialState: GeneralState = {
  settings: false,
  googleTL: false,
  wazeTL: false,
  wazeTA: false,
  mapLoading: false,
  routes: [],
  drivers: [],
  destinations: [],
};

export const reducer = (
  state: GeneralState,
  action: GeneralAction,
): GeneralState => {
  switch (action.type) {
    case "setSettings":
      return { ...state, settings: !state.settings };
    case "setGoogleTL":
      return { ...state, googleTL: !state.googleTL };
    case "setWazeTL":
      return { ...state, wazeTL: !state.wazeTL };
    case "setWazeTA":
      return { ...state, wazeTA: !state.wazeTA };
    case "setMapLoading":
      return { ...state, mapLoading: action.payload };
    case "setRoutes":
      return { ...state, routes: action.payload };
    case "setDrivers":
      return { ...state, drivers: action.payload };
    case "setDestinations":
      return { ...state, destinations: action.payload };
    default:
      return state;
  }
};

export const destinationIcon = `
M7 0C3.13 0 0 3.13 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 3.13 10.87 0 7 0ZM7 9.5C5.62 9.5 4.5 8.38 4.5 7C4.5 5.62 5.62 4.5 7 4.5C8.38 4.5 9.5 5.62 9.5 7C9.5 8.38 8.38 9.5 7 9.5Z
`;

export const driverIcon = `
M19 4H16V0H2C0.9 0 0 0.9 0 2V13H2C2 14.66 3.34 16 5 16C6.66 16 8 14.66 8 13H14C14 14.66 15.34 16 17 16C18.66 16 20 14.66 20 13H22V8L19 4ZM5 14.5C4.17 14.5 3.5 13.83 3.5 13C3.5 12.17 4.17 11.5 5 11.5C5.83 11.5 6.5 12.17 6.5 13C6.5 13.83 5.83 14.5 5 14.5ZM18.5 5.5L20.46 8H16V5.5H18.5ZM17 14.5C16.17 14.5 15.5 13.83 15.5 13C15.5 12.17 16.17 11.5 17 11.5C17.83 11.5 18.5 12.17 18.5 13C18.5 13.83 17.83 14.5 17 14.5Z
`;

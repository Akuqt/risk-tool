import { PlannerAction, PlannerState } from "types";

export const initialState: PlannerState = {
  address: "",
  material: undefined,
  driver: undefined,
  clickable: false,
  loadingAddress: false,
  destination: null,
  settings: false,
  pathSelector: false,
  googleTL: false,
  wazeTL: false,
  wazeTA: false,
  fixedPath: [],
  originPath: [],
  destinationPath: [],
  originIndex: 0,
  destinationIndex: 0,
  fixedPathIndex: 0,
  mapLoading: false,
  showOriginModal: false,
  showDestinationModal: false,
  destinationRisk: null,
  originRisk: null,
};

export const reducer = (
  state: PlannerState,
  action: PlannerAction,
): PlannerState => {
  switch (action.type) {
    case "setAddress":
      return { ...state, address: action.payload };
    case "setMaterial":
      return { ...state, material: action.payload };
    case "setDriver":
      return { ...state, driver: action.payload };
    case "setClickable":
      return { ...state, clickable: action.payload };
    case "setLoadingAddress":
      return { ...state, loadingAddress: action.payload };
    case "setDestination":
      return { ...state, destination: action.payload };
    case "setSettings":
      return { ...state, settings: !state.settings };
    case "setPathSelector":
      return { ...state, pathSelector: action.payload };
    case "setGoogleTL":
      return { ...state, googleTL: !state.googleTL };
    case "setWazeTL":
      return { ...state, wazeTL: !state.wazeTL };
    case "setWazeTA":
      return { ...state, wazeTA: !state.wazeTA };
    case "setFixedPath":
      return { ...state, fixedPath: action.payload };
    case "setOriginPath":
      return { ...state, originPath: action.payload };
    case "setDestinationPath":
      return { ...state, destinationPath: action.payload };
    case "setOriginIndex":
      return { ...state, originIndex: action.payload };
    case "setDestinationIndex":
      return { ...state, destinationIndex: action.payload };
    case "setFixedPathIndex":
      return { ...state, fixedPathIndex: action.payload };
    case "setMapLoading":
      return { ...state, mapLoading: action.payload };
    case "setShowOriginModal":
      return { ...state, showOriginModal: !state.showOriginModal };
    case "setShowDestinationModal":
      return { ...state, showDestinationModal: !state.showDestinationModal };
    case "setOriginRisk":
      return { ...state, originRisk: action.payload };
    case "setDestinationRisk":
      return { ...state, destinationRisk: action.payload };
    case "reset":
      return {
        ...state,
        fixedPath: [],
        originPath: [],
        originIndex: 0,
        fixedPathIndex: 0,
        destinationIndex: 0,
        destinationPath: [],
        pathSelector: false,
      };
    default:
      return state;
  }
};

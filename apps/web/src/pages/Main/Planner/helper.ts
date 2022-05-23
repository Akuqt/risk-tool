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
  fixedPathIndex: 0,
  mapLoading: false,
  riskCalculation: false,
  risk: 0,
  riskPaths: [],
  currentIndex: 0,
  newIndex: 0,
  showModal: false,
  logMarker: null,
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
    case "setFixedPathIndex":
      return { ...state, fixedPathIndex: action.payload };
    case "setMapLoading":
      return { ...state, mapLoading: action.payload };
    case "setRiskCalculation":
      return { ...state, riskCalculation: action.payload };
    case "setRisk":
      return { ...state, risk: action.payload };
    case "setRiskPaths":
      return { ...state, riskPaths: [...state.riskPaths, action.payload] };
    case "setCurrentIndex":
      return { ...state, currentIndex: action.payload };
    case "setNewIndex":
      return { ...state, newIndex: action.payload };
    case "setShowModal":
      return { ...state, showModal: !state.showModal };
    case "setLogMarker":
      return { ...state, logMarker: action.payload };
    case "reset":
      return {
        ...state,
        fixedPath: [],
        fixedPathIndex: 0,
        pathSelector: false,
        risk: 0,
        riskPaths: [],
        currentIndex: 0,
        newIndex: 0,
        riskCalculation: false,
      };
    case "resetRisk":
      return {
        ...state,
        risk: 0,
        riskPaths: [],
        currentIndex: 0,
        newIndex: 0,
        riskCalculation: false,
      };
    default:
      return state;
  }
};

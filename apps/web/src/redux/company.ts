import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FCompany, FDriver2, FLog2 } from "types";

interface Init {
  company: FCompany;
}

const initialState: Init = {
  company: {
    address: "",
    drivers: [],
    id: "",
    lat: NaN,
    lng: NaN,
    materials: [],
    name: "",
    role: "",
    token: "",
    username: "",
    lastRoutes: [],
    logs: [],
  },
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    saveCompany: (state, action: PayloadAction<FCompany>) => {
      state.company = action.payload;
    },
    clearCompany: (state) => {
      state.company = initialState.company;
    },
    saveLogs: (state, action: PayloadAction<FLog2[]>) => {
      state.company.logs = action.payload;
    },
    addLog: (state, action: PayloadAction<FLog2>) => {
      if (state.company.logs.find((l) => l.id === action.payload.id)) return;
      state.company.logs.unshift({
        ...action.payload,
      });
    },
    filterLogs: (state, action: PayloadAction<string>) => {
      state.company.logs = state.company.logs.filter(
        (l) => l.id !== action.payload,
      );
    },
    addDriver: (state, action: PayloadAction<FDriver2>) => {
      state.company.drivers.push(action.payload);
    },
    updateDriverAndLogs: (
      state,
      action: PayloadAction<{ risk: number; id?: string }>,
    ) => {
      const date = new Date().toLocaleString();
      state.company.drivers = state.company.drivers.map((d) => {
        if (d.id === action.payload.id) {
          return { ...d, active: true };
        }
        return d;
      });
      state.company.lastRoutes.push({
        risk: action.payload.risk,
        date,
      });
    },
    updateDriverState: (
      state,
      action: PayloadAction<{ id: string; active: boolean }>,
    ) => {
      state.company.drivers = state.company.drivers.map((d) => {
        if (d.id === action.payload.id) {
          return { ...d, active: action.payload.active };
        }
        return d;
      });
    },
    updateDriverState2: (
      state,
      action: PayloadAction<{
        id: string;
        active: boolean;
        lat: number;
        lng: number;
      }>,
    ) => {
      state.company.drivers = state.company.drivers.map((d) => {
        if (d.id === action.payload.id) {
          return {
            ...d,
            active: action.payload.active,
            lat: action.payload.lat,
            lng: action.payload.lng,
          };
        }
        return d;
      });
    },
    updateLogState: (
      state,
      action: PayloadAction<{ id: string; action: string }>,
    ) => {
      state.company.logs = state.company.logs.map((l) => {
        if (l.id === action.payload.id) {
          return { ...l, action: action.payload.action };
        }
        return l;
      });
    },
  },
});

export const {
  addLog,
  saveLogs,
  addDriver,
  filterLogs,
  saveCompany,
  clearCompany,
  updateLogState,
  updateDriverState,
  updateDriverState2,
  updateDriverAndLogs,
} = companySlice.actions;

export default companySlice.reducer;

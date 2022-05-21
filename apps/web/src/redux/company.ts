import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FCompany } from "types";

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
  },
});

export const { clearCompany, saveCompany } = companySlice.actions;

export default companySlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Data } from "types";

interface ILocation {
  data: Data;
}

const initialState: ILocation = {
  data: {
    lat: 10.963889,
    lng: -74.796387,
    speed: 0,
    tmp: 0,
  },
};

export const locationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Data>) => {
      state.data = action.payload;
    },
  },
});

export const { setLocation } = locationSlice.actions;

export default locationSlice.reducer;

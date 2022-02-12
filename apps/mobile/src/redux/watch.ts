import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DataID } from "types";

interface ILocation {
  data: DataID;
}

const initialState: ILocation = {
  data: {
    watchId: null,
  },
};

export const watchSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setWatch: (state, action: PayloadAction<DataID>) => {
      state.data = action.payload;
    },
  },
});

export const { setWatch } = watchSlice.actions;

export default watchSlice.reducer;

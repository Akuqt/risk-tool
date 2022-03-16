import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FDriver } from "types";

interface Init {
  user: FDriver;
}

const initialState: Init = {
  user: {
    token: "",
    name: "",
    lastname: "",
    role: "",
    id: "",
    gender: "",
    lat: NaN,
    lng: NaN,
    material: "",
    plate: "",
    username: "",
    company: {
      address: "",
      id: "",
      lat: NaN,
      lng: NaN,
      name: "",
    },
  },
};

export const userSlide = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<FDriver>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { saveUser, clearUser } = userSlide.actions;

export default userSlide.reducer;

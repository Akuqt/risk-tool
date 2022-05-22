import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coord, FDriver } from "types";

interface Init {
  user: FDriver;
}

const initialState: Init = {
  user: {
    active: false,
    token: "",
    name: "",
    lastname: "",
    role: "",
    id: "",
    gender: "",
    lat: NaN,
    lng: NaN,
    material: "",
    address: "",
    plate: "",
    username: "",
    company: {
      address: "",
      id: "",
      lat: NaN,
      lng: NaN,
      name: "",
    },
    route: [],
    dlat: NaN,
    dlng: NaN,
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
    saveRMA: (
      state,
      action: PayloadAction<{
        material: string;
        address: string;
        route: Coord[];
        dlat: number;
        dlng: number;
      }>,
    ) => {
      state.user.material = action.payload.material;
      state.user.address = action.payload.address;
      state.user.route = action.payload.route;
      state.user.dlat = action.payload.dlat;
      state.user.dlng = action.payload.dlng;
      state.user.active = true;
    },
    clearRoute: (state) => {
      state.user.route = [];
      state.user.address = "";
      state.user.dlat = NaN;
      state.user.dlng = NaN;
      state.user.active = false;
      state.user.material = "";
    },
  },
});

export const { saveUser, clearUser, saveRMA, clearRoute } = userSlide.actions;

export default userSlide.reducer;

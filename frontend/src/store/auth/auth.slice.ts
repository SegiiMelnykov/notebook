import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { User } from "src/types/user";

interface IState {
  token: string | null;
  user: User | null;
}

const initialState: IState = {
  token: JSON.parse(localStorage.getItem("token") ?? "null"),
  user: JSON.parse(localStorage.getItem("user") ?? "null"),
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<any>) => {
      state.token = action.payload.token;
      state.user = { ...(jwt_decode(action.payload.token) as User) };
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...jwt_decode(action.payload.token) })
      );
    },
    logOut: (state, action: PayloadAction<any>) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const authActions = auth.actions;
export const authReducer = auth.reducer;

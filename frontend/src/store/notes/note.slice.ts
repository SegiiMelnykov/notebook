import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  filterToggle: boolean;
}

const initialState: IState = {
  filterToggle: !!JSON.parse(localStorage.getItem("filterToggle") ?? "false"),
};

export const note = createSlice({
  name: "note",
  initialState,
  reducers: {
    toggleFilter: (state, action: PayloadAction<boolean>) => {
      state.filterToggle = action.payload;
      localStorage.setItem("filterToggle", action.payload ? "true" : "false");
    },
  },
});

export const noteActions = note.actions;
export const noteReducer = note.reducer;

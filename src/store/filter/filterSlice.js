import { createSlice } from "@reduxjs/toolkit";
import { filterInitialState } from "./filterInitialState";

const filterSlice = createSlice({
  name: "filter",
  initialState: filterInitialState,
  reducers: {
    setFilter: (state, action) => action.payload,
  },
});

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  employee: "",
  token: "",
  id: "",
  mode: "employees",
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setemployee: (state, action) => {
      state.employee = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setMode: (state, action) => {
      state.mode = action.payload as "employees" | "candidates";
    }
  },
});

export const { setemployee, setToken, setId, setMode } = globalSlice.actions;
export default globalSlice.reducer;

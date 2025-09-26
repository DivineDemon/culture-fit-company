import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  employee: "",
  token: "",
  id: "",
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
  },
});

export const { setemployee, setToken, setId } = globalSlice.actions;
export default globalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  user: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = globalSlice.actions;
export default globalSlice.reducer;

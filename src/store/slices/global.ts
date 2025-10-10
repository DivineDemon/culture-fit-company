import { createSlice } from "@reduxjs/toolkit";

const initialState: GlobalState = {
  employee: "",
  token: "",
  id: "",
  mode: "employees",
  openFolder: "",
  selectedFileId: "",
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
    },
    setOpenFolder: (state, action) => {
      state.openFolder = action.payload;
    },
    setSelectedFileId: (state, action) => {
      state.selectedFileId = action.payload as string;
    },
  },
});

export const { setemployee, setToken, setId, setMode, setOpenFolder, setSelectedFileId } = globalSlice.actions;
export default globalSlice.reducer;

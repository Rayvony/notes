import { createSlice } from "@reduxjs/toolkit";

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    name: "",
    id: "",
  },

  reducers: {
    setName: (state, { payload }) => {
      state.name = payload.trim();
    },
  },
});

export const { setName } = categorySlice.actions;

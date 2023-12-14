import { createSlice } from "@reduxjs/toolkit";

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    title: "",
    content: "",
    id: "",
  },

  reducers: {
    setTitle: (state, { payload }) => {
      state.title = payload.trim();
    },
    setContent: (state, { payload }) => {
      state.content = payload.trim();
    },
  },
});

export const { setTitle, setContent } = noteSlice.actions;

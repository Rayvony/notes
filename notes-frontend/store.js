import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { noteSlice } from "./noteSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    note: noteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

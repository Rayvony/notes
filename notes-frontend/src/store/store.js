import { configureStore } from "@reduxjs/toolkit";
import { categorySlice } from "./categorySlice";
import { authSlice } from "./authSlice";
import { noteSlice } from "./noteSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    note: noteSlice.reducer,
    category: categorySlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

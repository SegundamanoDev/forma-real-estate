import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    // 1. Add the generated reducer from our central API slice
    [apiSlice.reducerPath]: apiSlice.reducer,

    // 2. Add our manual auth state reducer
    auth: authReducer,
  },

  // 3. Add the API middleware to enable caching, invalidation, and polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),

  // 4. Enable Redux DevTools for easier debugging during development
  devTools: true,
});

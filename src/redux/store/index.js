import { configureStore } from "@reduxjs/toolkit";
import { darkModeReducer } from "../slices/darkModeSlice";
import { sidebarReducer } from "../slices/sidebarSlice";
import listenerMiddleware from "../middleware";
import { userReducer } from "../slices/userSlice";

const store = configureStore({
  reducer: {
    darkMode: darkModeReducer,
    sidebar: sidebarReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;

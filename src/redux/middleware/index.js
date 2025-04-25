import { createListenerMiddleware } from "@reduxjs/toolkit";
import { toggleDarkMode } from "../slices/darkModeSlice";

const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
    actionCreator: toggleDarkMode,
    effect: (action, listenerApi) => {
        const { isDarkMode } = listenerApi.getState().darkMode;
        localStorage.setItem("darkMode", String(isDarkMode));
    }
});

export default listenerMiddleware;
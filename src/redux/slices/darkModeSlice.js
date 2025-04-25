import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    isDarkMode: localStorage.getItem('darkMode') === 'true',
}

const darkModeSlice = createSlice({
    name: 'darkMode',
    initialState,
    reducers: {
        toggleDarkMode(state) {
            state.isDarkMode = !state.isDarkMode
        }
    }
});


export const { toggleDarkMode } = darkModeSlice.actions;
export const darkModeReducer = darkModeSlice.reducer;
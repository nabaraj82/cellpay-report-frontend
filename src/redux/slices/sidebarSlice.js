import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isSlidebarOpen: window.innerWidth > 480,
}


const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        toggleSidebar(state) {
            state.isSlidebarOpen = !state.isSlidebarOpen
        }
    }
});


export const { toggleSidebar } = sidebarSlice.actions;

export const sidebarReducer = sidebarSlice.reducer;
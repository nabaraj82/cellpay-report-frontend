import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  currentUser: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setCurrentUSer(state, action) {
      state.error = null;
      state.currentUser = { ...action.payload };
    },
    resetCurrentUser(state) {
      state.currentUser = null;
    },
    setErrors(state, action) {
      state.error =
        action.payload ||
        "An error occured while fetching user data from server.";
    },
  },
});

export const { setCurrentUSer, resetCurrentUser, setIsLoading, setErrors } = userSlice.actions;

export const userReducer = userSlice.reducer;

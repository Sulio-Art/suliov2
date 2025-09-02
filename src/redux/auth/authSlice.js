import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      // --- THE FIX IS HERE ---
      // Changed `backendToken` to `token` to match the API response.
      const { user, token } = action.payload;
      
      if (user) {
        state.userInfo = user;
      }
      if (token) {
        state.token = token;
      }
    },
    clearCredentials(state) {
      state.userInfo = null;
      state.token = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.userInfo;
export const selectBackendToken = (state) => state.auth.token;
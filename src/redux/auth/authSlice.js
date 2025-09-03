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
      // The reducer now correctly destructures `backendToken` from the action payload
      // to match what the API and login logic provide.
      const { user, backendToken } = action.payload;
      
      if (user) {
        state.userInfo = user;
      }
      // The value from `backendToken` is now correctly assigned to `state.token`.
      if (backendToken) {
        state.token = backendToken;
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
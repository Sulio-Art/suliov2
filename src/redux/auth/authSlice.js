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
      const { user, backendToken } = action.payload;
      if (user) {
        state.userInfo = user;
      }
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

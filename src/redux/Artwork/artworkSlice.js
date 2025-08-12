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
      const session = action.payload;
      if (session?.user) {
        state.userInfo = session.user;
      }
      if (session?.backendToken) {
        state.token = session.backendToken;
      }
    },

    logout(state) {
      state.userInfo = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
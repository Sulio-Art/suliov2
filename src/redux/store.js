import { configureStore } from "@reduxjs/toolkit";
import { artworkApi } from "./Artwork/artworkApi";
import artworkReducer from "./Artwork/artworkSlice";
import userReducer from "./User/User.Reducers";

export const store = configureStore({
  reducer: {
    artwork: artworkReducer,
    user: userReducer,

    [artworkApi.reducerPath]: artworkApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artworkApi.middleware),
});

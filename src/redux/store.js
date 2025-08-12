import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { artworkApi } from "./Artwork/artworkApi";

import artworkReducer from "./Artwork/artworkSlice";
import authReducer from "./Artwork/artworkSlice";

export const store = configureStore({
  reducer: {
    [artworkApi.reducerPath]: artworkApi.reducer,

    artwork: artworkReducer,

    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(artworkApi.middleware),
});

setupListeners(store.dispatch);
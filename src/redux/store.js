import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { artworkApi } from "./Artwork/artworkApi";
import eventReducer from "./Event/eventSlice";
import { subscriptionApi } from "./Subscription/subscriptionApi";
import { dashboardApi } from "./Dashboard/dashboardApi";
import { eventApi } from "./Event/eventApi";
import authReducer from "./auth/authSlice";
import { diaryApi } from "./Diary/diaryApi";
import { profileApi } from "./Profile/profileApi";
import { transactionApi } from "./Transaction/transactionApi";
import { authApi } from "./auth/authApi";
import { adminApi } from "./Admin/adminApi";

export const store = configureStore({
  reducer: {
    [artworkApi.reducerPath]: artworkApi.reducer,
    [dashboardApi.reducerPath]: dashboardApi.reducer,
    [eventApi.reducerPath]: eventApi.reducer,
    [subscriptionApi.reducerPath]: subscriptionApi.reducer,
    [diaryApi.reducerPath]: diaryApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [transactionApi.reducerPath]: transactionApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,

    event: eventReducer,
    auth: authReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(artworkApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(eventApi.middleware)
      .concat(subscriptionApi.middleware)
      .concat(diaryApi.middleware)
      .concat(profileApi.middleware)
      .concat(transactionApi.middleware)
      .concat(authApi.middleware)
      .concat(adminApi.middleware),
});

setupListeners(store.dispatch);
import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import { chatbotApi } from "./Chatbot/chatbotApi";

// --- IMPORTS FOR PERSISTENCE ---
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// --- COMBINE ALL REDUCERS ---
const rootReducer = combineReducers({
  [artworkApi.reducerPath]: artworkApi.reducer,
  [dashboardApi.reducerPath]: dashboardApi.reducer,
  [eventApi.reducerPath]: eventApi.reducer,
  [subscriptionApi.reducerPath]: subscriptionApi.reducer,
  [diaryApi.reducerPath]: diaryApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [transactionApi.reducerPath]: transactionApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
  [adminApi.reducerPath]: adminApi.reducer,
  [chatbotApi.reducerPath]: chatbotApi.reducer,
  event: eventReducer,
  auth: authReducer,
});

// --- PERSISTENCE CONFIGURATION ---
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only the 'auth' slice (with userInfo and token) will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // This is required to avoid non-serializable value errors with redux-persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(artworkApi.middleware)
      .concat(dashboardApi.middleware)
      .concat(eventApi.middleware)
      .concat(subscriptionApi.middleware)
      .concat(diaryApi.middleware)
      .concat(profileApi.middleware)
      .concat(transactionApi.middleware)
      .concat(authApi.middleware)
      .concat(adminApi.middleware)
      .concat(chatbotApi.middleware),
});

setupListeners(store.dispatch);


export const persistor = persistStore(store);
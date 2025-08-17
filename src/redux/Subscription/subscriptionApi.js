import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/api/subscriptions`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Subscription"],
  endpoints: (builder) => ({
    getMySubscription: builder.query({
      query: () => "/mine",
      providesTags: ["Subscription"],
    }),
  }),
});

export const { useGetMySubscriptionQuery } = subscriptionApi;

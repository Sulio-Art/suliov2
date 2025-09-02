import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    // CORRECT: The baseUrl now correctly and consistently points to the API root.
    baseUrl: `${BACKEND_API_URL}/api`,
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
      // CORRECT: The URL is now relative to /api, so we query '/subscriptions/mine'
      query: () => "/subscriptions/mine",
      providesTags: ["Subscription"],
    }),

    cancelSubscription: builder.mutation({
      query: (subscriptionId) => ({
        // CORRECT: This is now relative to /api
        url: `/subscriptions/${subscriptionId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const { useGetMySubscriptionQuery, useCancelSubscriptionMutation } =
  subscriptionApi;
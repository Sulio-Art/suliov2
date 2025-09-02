import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
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
  tagTypes: ["Onboarding", "DashboardStats"],
  endpoints: (builder) => ({
    getOnboardingStatus: builder.query({
      // CORRECT: The URL is now relative to /api
      query: () => "/dashboard/onboarding-status",
      providesTags: ["Onboarding"],
    }),
    getDashboardStats: builder.query({
      // CORRECT: The URL is now relative to /api
      query: () => "/dashboard/stats",
      providesTags: ["DashboardStats"],
    }),
  }),
});

export const { useGetOnboardingStatusQuery, useGetDashboardStatsQuery } =
  dashboardApi;
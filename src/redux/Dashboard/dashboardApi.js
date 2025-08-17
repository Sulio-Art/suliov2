import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/api/dashboard`,
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
    /**
     * @query getOnboardingStatus
     * @desc Fetches the user's onboarding completion status.
     *       This is a critical first step to determine what the dashboard should show.
     */
    getOnboardingStatus: builder.query({
      query: () => "/onboarding-status",
      providesTags: ["Onboarding"],
    }),
    /**
     * @query getDashboardStats
     * @desc Fetches all the main statistics for the dashboard display.
     *       This query depends on the onboarding status being complete.
     */
    getDashboardStats: builder.query({
      query: () => "/stats",
      providesTags: ["DashboardStats"],
    }),
  }),
});

export const { useGetOnboardingStatusQuery, useGetDashboardStatsQuery } =
  dashboardApi;

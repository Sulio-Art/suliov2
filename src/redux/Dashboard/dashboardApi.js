import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
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
      query: () => "/dashboard/onboarding-status",
      providesTags: ["Onboarding"],
    }),
    getDashboardStats: builder.query({
      query: () => "/dashboard/stats",
      providesTags: ["DashboardStats"],
      refetchOnMountOrArgChange: true,
    }),
  }),
});

export const { useGetOnboardingStatusQuery, useGetDashboardStatsQuery } =
  dashboardApi;

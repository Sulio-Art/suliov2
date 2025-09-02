import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adminApi = createApi({
  reducerPath: "adminApi",
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
  tagTypes: ["AdminStats", "AdminTransactions"],
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      // CORRECT: The URL is now relative to /api
      query: () => "/admin/dashboard-stats",
      providesTags: ["AdminStats"],
    }),

    getAllTransactions: builder.query({
      // CORRECT: The URL is now relative to /api
      query: (page = 1) => `/admin/transactions?page=${page}`, // Assuming an admin-specific transaction route
      providesTags: ["AdminTransactions"],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetAllTransactionsQuery } =
  adminApi;
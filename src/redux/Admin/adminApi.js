import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const adminApi = createApi({
  reducerPath: "adminApi",
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
  tagTypes: ["AdminStats", "AdminTransactions"],
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => "/admin/dashboard-stats",
      providesTags: ["AdminStats"],
    }),

    getAllTransactions: builder.query({
      query: (page = 1) => `/transactions?page=${page}`,
      providesTags: ["AdminTransactions"],
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetAllTransactionsQuery } =
  adminApi;

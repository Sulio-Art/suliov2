import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const transactionApi = createApi({
  reducerPath: "transactionApi",
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

  endpoints: (builder) => ({
    getMyTransactions: builder.query({
      query: ({ page = 1, search = "", status = "" }) => {
        const params = new URLSearchParams({ page });
        if (search) params.append("search", search);
        if (status) params.append("status", status);
        // CORRECT: The URL is now relative to /api
        return `/transactions/me?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetMyTransactionsQuery } = transactionApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const transactionApi = createApi({
  reducerPath: "transactionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/api/transactions`,

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
        return `/me?${params.toString()}`;
      },
    }),
  }),
});

export const { useGetMyTransactionsQuery } = transactionApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/profiles`, 
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: () => "/me",
      providesTags: ["Profile"],
    }),
    updateMyProfile: builder.mutation({
      query: (formData) => {
        return {
          url: "/me",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = profileApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const profileApi = createApi({
  reducerPath: "profileApi",
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
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      // CORRECT: The URL is now relative to /api
      query: () => "/profiles/me",
      providesTags: ["Profile"],
    }),
    updateMyProfile: builder.mutation({
      query: (formData) => {
        return {
          // CORRECT: The URL is now relative to /api
          url: "/profiles/me",
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateMyProfileMutation } = profileApi;
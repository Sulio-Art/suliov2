import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const profileApi = createApi({
  reducerPath: "profileApi",
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
  tagTypes: ["Profile", "Me"],
  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["Me"],
      transformResponse: (response) => {
        if (response?.user) {
          return {
            ...response,
            user: {
              ...response.user,
              isInstagramConnected: !!response.user.instagramUserId,
            },
          };
        }
        return response;
      },
    }),
    
    getMyProfile: builder.query({
      query: () => "/profiles/me",
      providesTags: ["Profile"],
    }),
    updateMyProfile: builder.mutation({
      query: (formData) => {
        return {
          url: "/profiles/me",
          method: "PUT", 
          body: formData,
        };
      },
      invalidatesTags: ["Profile", "Me"], 
    }),
  }),
});

export const { useGetMeQuery, useGetMyProfileQuery, useUpdateMyProfileMutation } =
  profileApi;
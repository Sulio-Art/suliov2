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
  // Add "Me" to the tagTypes array
  tagTypes: ["Profile", "Me"],
  endpoints: (builder) => ({
    // This is the new query to get fresh user data
    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["Me"],
      transformResponse: (response) => {
        // Ensure the connection status is always a boolean for consistent UI logic
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
    
    // Your existing endpoints remain unchanged
    getMyProfile: builder.query({
      query: () => "/profiles/me",
      providesTags: ["Profile"],
    }),
    updateMyProfile: builder.mutation({
      query: (formData) => {
        return {
          url: "/profiles/me",
          method: "PUT", // Note: A POST request that updates is often a PUT or PATCH
          body: formData,
        };
      },
      invalidatesTags: ["Profile", "Me"], // Also invalidate "Me" in case the profile update changes user data
    }),
  }),
});

// Export the new hook alongside your existing ones
export const { useGetMeQuery, useGetMyProfileQuery, useUpdateMyProfileMutation } =
  profileApi;
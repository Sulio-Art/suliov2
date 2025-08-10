import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const artworkApi = createApi({
  reducerPath: "artworkApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Artwork", "StorageStats"],
  endpoints: (builder) => ({
    getAllArtworks: builder.query({
      query: ({ userId, page = 1 }) => `/artworks/user/${userId}?page=${page}`,
      providesTags: ["Artwork"],
    }),
    createArtwork: builder.mutation({
      query: (formData) => ({
        url: "/artworks",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Artwork", "StorageStats"],
    }),
    getStorageStats: builder.query({
      query: () => "/artworks/stats/storage",
      providesTags: ["StorageStats"],
    }),
    deleteArtwork: builder.mutation({
      query: (id) => ({
        url: `/artworks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Artwork", "StorageStats"],
    }),
  }),
});

export const {
  useGetAllArtworksQuery,
  useCreateArtworkMutation,
  useDeleteArtworkMutation,
  useGetStorageStatsQuery,
} = artworkApi;
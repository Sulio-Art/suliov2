import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const artworkApi = createApi({
  reducerPath: "artworkApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      "https://q2l5kktv-5000.inc1.devtunnels.ms/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["Artwork"],
  endpoints: (builder) => ({
    getAllArtworks: builder.query({
      query: (userId) => `/artworks/user/${userId}`,
      providesTags: ["Artwork"],
    }),
    createArtwork: builder.mutation({
      query: (formData) => ({
        url: "/artworks",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Artwork"],
    }),
    deleteArtwork: builder.mutation({
      query: (id) => ({
        url: `/artworks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Artwork"],
    }),
  }),
});

export const {
  useGetAllArtworksQuery,
  useCreateArtworkMutation,
  useDeleteArtworkMutation,
} = artworkApi;

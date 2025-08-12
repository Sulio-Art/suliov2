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
      query: (params) => {
        const searchParams = new URLSearchParams(params);
        return `/artworks/user?${searchParams.toString()}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.artworks.map(({ _id }) => ({
                type: "Artwork",
                id: _id,
              })),
              { type: "Artwork", id: "LIST" },
            ]
          : [{ type: "Artwork", id: "LIST" }],
    }),
    getArtworkById: builder.query({
      query: (id) => `/artworks/${id}`,
      providesTags: (result, error, id) => [{ type: "Artwork", id }],
    }),
    createArtwork: builder.mutation({
      query: (formData) => ({
        url: "/artworks",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Artwork", id: "LIST" }, "StorageStats"],
    }),
    updateArtwork: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/artworks/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Artwork", id },
        { type: "Artwork", id: "LIST" },
      ],
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
      invalidatesTags: (result, error, id) => [
        { type: "Artwork", id: "LIST" },
        "StorageStats",
      ],
    }),
  }),
});

export const {
  useGetAllArtworksQuery,
  useGetArtworkByIdQuery,
  useCreateArtworkMutation,
  useUpdateArtworkMutation,
  useDeleteArtworkMutation,
  useGetStorageStatsQuery,
} = artworkApi;
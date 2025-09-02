import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const diaryApi = createApi({
  reducerPath: "diaryApi",
  baseQuery: fetchBaseQuery({
    // CORRECT: The baseUrl now correctly and consistently points to the API root.
    baseUrl: `${BACKEND_API_URL}/api`,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Diary"],
  endpoints: (builder) => ({
    getMyDiaryEntries: builder.query({
      // CORRECT: The URL is now relative to /api
      query: () => "/diary",
      providesTags: (result = []) => [
        { type: "Diary", id: "LIST" },
        ...result.map(({ _id }) => ({ type: "Diary", id: _id })),
      ],
    }),
    getDiaryEntryById: builder.query({
      // CORRECT: The URL is now relative to /api
      query: (id) => `/diary/${id}`,
      providesTags: (result, error, id) => [{ type: "Diary", id }],
    }),
    createDiaryEntry: builder.mutation({
      query: (formData) => ({
        // CORRECT: The URL is now relative to /api
        url: "/diary",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Diary", id: "LIST" }],
    }),
    updateDiaryEntry: builder.mutation({
      query: ({ id, formData }) => ({
        // CORRECT: The URL is now relative to /api
        url: `/diary/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Diary", id: "LIST" },
        { type: "Diary", id: arg.id },
      ],
    }),
    deleteDiaryEntry: builder.mutation({
      query: (id) => ({
        // CORRECT: The URL is now relative to /api
        url: `/diary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Diary", id: "LIST" }],
    }),
  }),
});
export const {
  useGetMyDiaryEntriesQuery,
  useGetDiaryEntryByIdQuery,
  useCreateDiaryEntryMutation,
  useUpdateDiaryEntryMutation,
  useDeleteDiaryEntryMutation,
} = diaryApi;
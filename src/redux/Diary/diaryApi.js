import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const diaryApi = createApi({
  reducerPath: "diaryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/api/diary`,
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
      query: () => "/",
      providesTags: (result = []) => [
        { type: "Diary", id: "LIST" },
        ...result.map(({ _id }) => ({ type: "Diary", id: _id })),
      ],
    }),
    getDiaryEntryById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Diary", id }],
    }),
    createDiaryEntry: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [{ type: "Diary", id: "LIST" }],
    }),
    updateDiaryEntry: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
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
        url: `/${id}`,
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

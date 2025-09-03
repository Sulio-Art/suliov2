import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const chatbotApi = createApi({
  reducerPath: "chatbotApi",
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
  tagTypes: ["ChatbotSettings", "Profile"], 
  endpoints: (builder) => ({
    getChatbotSettings: builder.query({
      query: () => "/profiles/me",
      providesTags: ["Profile", "ChatbotSettings"],
      transformResponse: (response) => {
        if (response) {
          return {
            ...response,
            chatbotSettings: response.chatbotSettings || {},
          };
        }
        return { chatbotSettings: {} };
      },
    }),

    updateChatbotSettings: builder.mutation({
      query: (chatbotSettings) => ({
        url: "/chat/settings",
        method: "PATCH",
        body: chatbotSettings,
      }),
      invalidatesTags: ["Profile", "ChatbotSettings"],
    }),

    testChatbot: builder.mutation({
      query: (body) => ({
        url: "/chat/test",
        method: "POST",
        body,
      }),
    }),
    
  }),
});

export const {
  useGetChatbotSettingsQuery,
  useUpdateChatbotSettingsMutation,
  useTestChatbotMutation,
} = chatbotApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BACKEND_API_URL}/api/auth`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    requestPasswordReset: builder.mutation({
      query: (body) => ({
        url: "/request-password-reset",
        method: "POST",
        body,
      }),
    }),

    verifyPasswordResetOtp: builder.mutation({
      query: (body) => ({
        url: "/verify-password-reset-otp",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/reset-password",
        method: "POST",
        body,
      }),
    }),

    finalizeRegistration: builder.mutation({
      query: (payload) => ({
        url: "/register/finalize",
        method: "POST",
        body: payload,
      }),
    }),

    completeInstagramRegistration: builder.mutation({
      query: (payload) => ({
        url: "/instagram/complete-registration",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRequestPasswordResetMutation,
  useVerifyPasswordResetOtpMutation,
  useResetPasswordMutation,
  useFinalizeRegistrationMutation,
  useCompleteInstagramRegistrationMutation,
} = authApi;

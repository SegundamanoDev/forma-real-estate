import { apiSlice } from "./apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/users/login", // Adjust based on your user controller path
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;

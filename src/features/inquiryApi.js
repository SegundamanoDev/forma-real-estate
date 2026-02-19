import { apiSlice } from "./apiSlice";

export const inquiryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInquiries: builder.query({
      query: () => "/inquiries",
      providesTags: ["Inquiry"],
    }),
    sendInquiry: builder.mutation({
      query: (data) => ({
        url: "/inquiries",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Inquiry"],
    }),
    deleteInquiry: builder.mutation({
      query: (id) => ({
        url: `/inquiries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Inquiry"],
    }),
  }),
});

export const {
  useGetInquiriesQuery,
  useSendInquiryMutation,
  useDeleteInquiryMutation,
} = inquiryApi;

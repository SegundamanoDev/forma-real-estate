import { apiSlice } from "./apiSlice";

export const listingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getListings: builder.query({
      query: (params) => ({
        url: "/listings",
        params, // Handles filtering/search params
      }),
      providesTags: ["Listing"],
    }),
    getListingById: builder.query({
      query: (id) => `/listings/${id}`,
      providesTags: (result, error, id) => [{ type: "Listing", id }],
    }),
    createListing: builder.mutation({
      query: (data) => ({
        url: "/listings",
        method: "POST",
        body: data, // This will be FormData from your PropertyForm
      }),
      invalidatesTags: ["Listing"],
    }),
    updateListing: builder.mutation({
      query: ({ id, data }) => ({
        url: `/listings/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Listing",
        { type: "Listing", id },
      ],
    }),
    deleteListing: builder.mutation({
      query: (id) => ({
        url: `/listings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Listing"],
    }),
  }),
});

export const {
  useGetListingsQuery,
  useGetListingByIdQuery,
  useCreateListingMutation,
  useUpdateListingMutation,
  useDeleteListingMutation,
} = listingsApi;

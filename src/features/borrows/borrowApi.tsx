// src/features/borrows/borrowApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  IApiResponse,
  IBorrow,
  IBorrowData,
  IBorrowSummary,
} from "../../types";

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Borrow", "Book"],
  endpoints: (builder) => ({
    getBorrowSummary: builder.query<IApiResponse<IBorrowSummary[]>, void>({
      query: () => "borrow",
      providesTags: [{ type: "Borrow" as const, id: "LIST" }],
    }),

    createBorrow: builder.mutation<IApiResponse<IBorrow>, IBorrowData>({
      query: (borrow) => ({
        url: "borrow",
        method: "POST",
        body: borrow,
      }),
      invalidatesTags: [
        { type: "Borrow" as const, id: "LIST" },
        { type: "Book" as const, id: "LIST" },
      ],
    }),
  }),
});

export const { useCreateBorrowMutation, useGetBorrowSummaryQuery } = borrowApi;

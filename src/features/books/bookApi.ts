import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IBook, IApiResponse, IUpdateBook } from "../../types";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    // getBooks
    getBooks: builder.query<IApiResponse<IBook[]>, void>({
      query: () => "books",
      providesTags: ["Book"],
    }),

    // deleteBook
    deleteBook: builder.mutation<IApiResponse<null>, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Book"],
    }),

    // addBook
    addBook: builder.mutation<IApiResponse<IBook>, IBook>({
      query: (book) => ({
        url: "books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),

    // updateBook
    updateBook: builder.mutation<IApiResponse<IBook>, IUpdateBook>({
      query: ({ id, ...book }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useDeleteBookMutation,
  useAddBookMutation,
  useUpdateBookMutation,
} = booksApi;

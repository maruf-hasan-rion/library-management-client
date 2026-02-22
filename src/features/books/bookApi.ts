import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  GetBooksParams,
  IAddBook,
  IApiResponse,
  IBook,
  IUpdateBook,
} from "../../types";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query<IApiResponse<IBook[]>, GetBooksParams | void>({
      query: (params) => {
        if (!params) return "books";

        const sp = new URLSearchParams();
        if (params.filter) sp.set("filter", params.filter);
        if (params.sortBy) sp.set("sortBy", params.sortBy);
        if (params.sort) sp.set("sort", params.sort);
        if (params.limit) sp.set("limit", String(params.limit));

        const qs = sp.toString();
        return qs ? `books?${qs}` : "books";
      },
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map((b) => ({ type: "Book" as const, id: b._id })),
              { type: "Book" as const, id: "LIST" },
            ]
          : [{ type: "Book" as const, id: "LIST" }],
    }),

    getBookById: builder.query<IApiResponse<IBook>, string>({
      query: (id) => `books/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Book" as const, id }],
    }),

    addBook: builder.mutation<IApiResponse<IBook>, IAddBook>({
      query: (book) => ({
        url: "books",
        method: "POST",
        body: book,
      }),
      invalidatesTags: [{ type: "Book" as const, id: "LIST" }],
    }),

    updateBook: builder.mutation<IApiResponse<IBook>, IUpdateBook>({
      query: ({ id, ...book }) => ({
        url: `books/${id}`,
        method: "PUT",
        body: book,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Book" as const, id: arg.id },
        { type: "Book" as const, id: "LIST" },
      ],
    }),

    deleteBook: builder.mutation<IApiResponse<null>, string>({
      query: (id) => ({
        url: `books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Book" as const, id },
        { type: "Book" as const, id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;

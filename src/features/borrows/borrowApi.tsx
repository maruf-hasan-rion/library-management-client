import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { IApiResponse, IBorrow, IBorrowData, IBorrowSummary } from '../../types';

export const borrowApi = createApi({
    reducerPath: 'borrowApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ["Borrow"],
    endpoints: (builder) => ({

        // getBorrowSummary
        getBorrowSummary: builder.query<IApiResponse<IBorrowSummary[]>, void>({
            query: () => "borrow",
            providesTags: ["Borrow"]
        }),


        // createBorrow
        createBorrow: builder.mutation<IApiResponse<IBorrow>, IBorrowData>({
            query: (borrow) => ({
                url: "borrow",
                method: "POST",
                body: borrow
            }),
            invalidatesTags: ["Borrow"]
        }),


    })
})


export const { useCreateBorrowMutation, useGetBorrowSummaryQuery } = borrowApi;


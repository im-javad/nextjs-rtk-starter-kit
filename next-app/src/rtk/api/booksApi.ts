import {
  BookFetchById,
  BooksFetchAll,
  CreateBook,
  UpdateBook,
} from "@/types/books";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const booksApi = createApi({
  reducerPath: "booksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    getBooks: builder.query<BooksFetchAll, void>({
      query: () => "/books",
      providesTags: (result) =>
        result?.data
          ? [
              ...result.data.map(({ id }) => ({ type: "Book" as const, id })),
              "Book",
            ]
          : ["Book"],
    }),
    getBookById: builder.query<BookFetchById, string>({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "Book", id }],
    }),
    createBook: builder.mutation<void, { createDetails: CreateBook }>({
      query: ({ createDetails }) => {
        const formData = new FormData();
        formData.append("title", createDetails.title);
        formData.append("author", createDetails.author);
        formData.append(
          "published_year",
          createDetails.published_year.toString()
        );
        return {
          url: "/books",
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation<void, { id: string; updatedData: UpdateBook }>(
      {
        query: ({ id, updatedData }) => ({
          url: `/books/${id}`,
          method: "PUT",
          body: updatedData,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: "Book", id }],
      }
    ),
    deleteBook: builder.mutation<void, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Book", id }],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookByIdQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = booksApi;

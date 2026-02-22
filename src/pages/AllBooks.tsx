import { Link } from "react-router";
import { Book, Edit, Eye, Plus, Trash2 } from "lucide-react";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

import Button from "../components/ui/Button";
import loader from "../assets/loader.json";
import BookModals from "../components/books/BookModals";

import {
  useGetBooksQuery,
  useDeleteBookMutation,
} from "../features/books/bookApi";
import { useAppDispatch } from "../store/hook";
import { openModal } from "../features/modal/modalSlice";

const AllBooks = () => {
  const { data, isLoading, isError } = useGetBooksQuery(undefined);
  const books = data?.data || [];
  console.log(books.length);

  const [deleteBook] = useDeleteBookMutation();
  const dispatch = useAppDispatch();

  const handleDelete = (id: string, title: string) => {
    Swal.fire({
      title: "Delete this book?",
      text: `Are you sure you want to remove "${title}" from the library?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      try {
        await deleteBook(id).unwrap();
        toast.success(`"${title}" has been removed`);
      } catch (error) {
        const err = error as { data?: { message?: string } };
        toast.error(
          err.data?.message || "Failed to delete book. Please try again.",
        );
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Lottie className="size-20" animationData={loader} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Something went wrong
        </h2>
        <p className="mt-2 text-gray-500">
          Failed to fetch books. Please try again.
        </p>
        <Button
          variant="primary"
          className="mt-4"
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              All Books
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your library inventory and borrowing.
            </p>

            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              {books.length} {books.length === 1 ? "book" : "books"}
            </div>
          </div>

          <Link to="/add-book">
            <Button icon={Plus} variant="primary" className="w-full sm:w-auto">
              Add Book
            </Button>
          </Link>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-sm font-medium text-gray-700">Books List</div>
          </div>
          {books.length === 0 ? (
            <div className="py-14 text-center">
              <Book className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                No books found
              </h3>
              <p className="mb-6 text-gray-600">
                Add your first book to start managing your library.
              </p>
              <Link to="/add-book">
                <Button icon={Plus} variant="primary">
                  Add Your First Book
                </Button>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">Genre</th>
                    <th className="px-6 py-4">ISBN</th>
                    <th className="px-6 py-4">Copies</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr
                      key={book._id}
                      className="group transition-colors hover:bg-blue-50/40"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">
                          {book.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          ID: {book._id.slice(0, 8)}...
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {book.author}
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                          {book.genre}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        {book.isbn}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        <span className="font-semibold text-gray-900">
                          {book.copies}
                        </span>{" "}
                        <span className="text-gray-500">
                          {book.copies === 1 ? "copy" : "copies"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                            book.available
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              book.available ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                          {book.available ? "Available" : "Unavailable"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            icon={Eye}
                            aria-label="View"
                            onClick={() =>
                              dispatch(openModal({ type: "view", book }))
                            }
                          />

                          <Button
                            size="sm"
                            variant="warning"
                            icon={Edit}
                            aria-label="Edit"
                            onClick={() =>
                              dispatch(openModal({ type: "edit", book }))
                            }
                          />

                          <Button
                            size="sm"
                            variant="secondary"
                            icon={Book}
                            aria-label={
                              book.available ? "Borrow" : "Unavailable"
                            }
                            disabled={!book.available}
                            onClick={() =>
                              dispatch(openModal({ type: "borrow", book }))
                            }
                          />

                          <Button
                            size="sm"
                            variant="danger"
                            icon={Trash2}
                            aria-label="Delete"
                            onClick={() => handleDelete(book._id, book.title)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <BookModals />
      </div>
    </div>
  );
};

export default AllBooks;

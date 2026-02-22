import type { IBook } from "../../../types";
import Button from "../../ui/Button";
import { useAppDispatch } from "../../../store/hook";
import { closeModal } from "../../../features/modal/modalSlice";
import { BookOpen } from "lucide-react";

interface Props {
  book: IBook;
}

const ViewBookDetails = ({ book }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <div className="grid gap-6 text-sm text-gray-800">
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
          <BookOpen className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{book.title}</h2>
        <p className="mt-1 text-gray-600">
          View detailed information about this book
        </p>
      </div>

      <div className="mx-1 grid grid-cols-1 gap-4 rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm sm:grid-cols-2">
        <div>
          <p className="font-medium text-gray-500">Author</p>
          <p className="font-semibold text-gray-900">{book.author}</p>
        </div>

        <div>
          <p className="font-medium text-gray-500">Genre</p>
          <p className="font-semibold text-gray-900">{book.genre}</p>
        </div>

        <div>
          <p className="font-medium text-gray-500">ISBN</p>
          <p className="font-semibold text-gray-900">{book.isbn}</p>
        </div>

        <div>
          <p className="font-medium text-gray-500">Copies</p>
          <p className="font-semibold text-gray-900">{book.copies}</p>
        </div>

        <div>
          <p className="font-medium text-gray-500">Availability</p>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
              book.available
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                book.available ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {book.available ? "Available" : "Unavailable"}
          </span>
        </div>

        {book.createdAt && (
          <div>
            <p className="font-medium text-gray-500">Added On</p>
            <p className="text-gray-800">
              {new Date(book.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {book.updatedAt && (
          <div>
            <p className="font-medium text-gray-500">Last Updated</p>
            <p className="text-gray-800">
              {new Date(book.updatedAt).toLocaleDateString()}
            </p>
          </div>
        )}

        {book.description && (
          <div className="sm:col-span-2">
            <p className="mb-1 font-medium text-gray-500">Description</p>
            <div className="max-h-52 overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-200 bg-white p-3 text-gray-700">
              {book.description}
            </div>
          </div>
        )}
      </div>

      <div className="sticky bottom-0 z-10 flex justify-end bg-white pb-4 pt-4 sm:static">
        <Button variant="secondary" onClick={() => dispatch(closeModal())}>
          Close
        </Button>
      </div>
    </div>
  );
};

export default ViewBookDetails;

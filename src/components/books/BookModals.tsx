import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { closeModal } from "../../features/modal/modalSlice";
import BorrowBookForm from "./borrowModal/BorrowBookForm";
import EditBookForm from "./editModal/EditBookForm";
import ViewBookDetails from "./viewBook/ViewBookDetails ";

const BookModals = () => {
  const dispatch = useAppDispatch();
  const { type, book } = useAppSelector((state) => state.modal);

  const isOpen = type !== null;

  if (!isOpen) return null;
  if (!book) return null;

  const title =
    type === "borrow"
      ? "Borrow Book"
      : type === "edit"
        ? "Edit Book"
        : "Book Details";

  const subtitle =
    type === "borrow"
      ? "Specify how many copies you'd like to borrow and when you'll return them."
      : type === "edit"
        ? "Update the book's details like title, author, genre and copies."
        : "View detailed information about this book.";

  const panelWidth = type === "borrow" ? "max-w-md" : "max-w-2xl";

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(closeModal())}
      className="relative z-50"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[1px]"
        aria-hidden="true"
      />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className={`w-full ${panelWidth} max-h-[85vh] overflow-y-auto rounded-2xl bg-white px-6 pt-6 shadow-xl duration-300 ease-out transform transition-all data-[closed]:scale-95 data-[closed]:opacity-0`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">
                {title}
              </DialogTitle>
              <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
            </div>

            <button
              type="button"
              onClick={() => dispatch(closeModal())}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4">
            {type === "borrow" && <BorrowBookForm book={book} />}
            {type === "edit" && <EditBookForm book={book} />}
            {type === "view" && <ViewBookDetails book={book} />}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BookModals;

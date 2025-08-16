import type { IBook } from "../../../types";
import Button from "../../ui/Button";
import { useAppDispatch } from "../../../store/hook";
import { closeModal } from "../../../features/modal/modalSlice";

interface Props {
    book: IBook
}

const ViewBookDetails = ({ book }: Props) => {
    const dispatch = useAppDispatch();
    return (
        <div className="grid gap-6 text-sm text-gray-800">
            {/* ✅ Header Section */}
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900">{book.title}</h2>
                <p className="text-gray-600 mt-1">View detailed information about this book</p>
            </div>

            {/* ✅ Book Info Section (2-column layout for larger screens) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-50 p-6 rounded-lg  shadow-sm  mx-1">
                {/* Author */}
                <div>
                    <p className="text-gray-500 font-medium">Author</p>
                    <p className="text-gray-800 font-semibold">{book.author}</p>
                </div>
                {/* Genre */}
                <div>
                    <p className="text-gray-500 font-medium">Genre</p>
                    <p className="text-gray-800 font-semibold">{book.genre}</p>
                </div>
                {/* ISBN */}
                <div>
                    <p className="text-gray-500 font-medium">ISBN</p>
                    <p className="text-gray-800 font-semibold">{book.isbn}</p>
                </div>
                {/* Copies */}
                <div>
                    <p className="text-gray-500 font-medium">Copies</p>
                    <p className="text-gray-800 font-semibold">{book.copies}</p>
                </div>
                {/* Availability */}
                <div>
                    <p className="text-gray-500 font-medium">Availability</p>
                    <p
                        className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${book.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                            }`}
                    >
                        {book.available ? "Available" : "Unavailable"}
                    </p>
                </div>
                {/* Created At */}
                {book.createdAt && (
                    <div>
                        <p className="text-gray-500 font-medium">Added On</p>
                        <p className="text-gray-800">{new Date(book.createdAt).toLocaleDateString()}</p>
                    </div>
                )}
                {/* Updated At */}
                {book.updatedAt && (
                    <div>
                        <p className="text-gray-500 font-medium">Last Updated</p>
                        <p className="text-gray-800">{new Date(book.updatedAt).toLocaleDateString()}</p>
                    </div>
                )}
                {/* Description (handles long text with scrollable area) */}
                {book.description && (
                    <div className="sm:col-span-2">
                        <p className="text-gray-500 font-medium mb-1">Description</p>
                        <div className="bg-white border border-gray-200 rounded-md p-3 text-gray-700 whitespace-pre-wrap max-h-52 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                            {book.description}
                        </div>
                    </div>
                )}
            </div>
            {/* ✅ Close Button (Sticky for mobile UX) */}
            <div className="flex justify-end pt-4 sticky bottom-0 bg-white z-10 pb-4 ">
                <Button
                    variant="secondary"
                    onClick={() => dispatch(closeModal())}
                >
                    Close
                </Button>
            </div>
        </div>
    );
};

export default ViewBookDetails;
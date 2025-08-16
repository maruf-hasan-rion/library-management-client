import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/hook";
import type { IBook } from "../../../types";
import toast from "react-hot-toast";
import { closeModal } from "../../../features/modal/modalSlice";
import Button from "../../ui/Button";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { useUpdateBookMutation } from "../../../features/books/bookApi";
import { useGetBorrowSummaryQuery } from "../../../features/borrows/borrowApi";

// ✅ Available genres used in dropdown
const genres: IBook["genre"][] = ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"];

interface Props {
    book: IBook;
}

// ✅ Form input type
interface IUpdateBook {
    title: string;
    author: string;
    isbn: string;
    copies: number;
    description?: string;
    genre: string
}

const EditBookForm = ({ book }: Props) => {
    const dispatch = useAppDispatch();
    const [updateBook, { isLoading }] = useUpdateBookMutation();
    const { refetch } = useGetBorrowSummaryQuery();

    const [selectedGenre, setSelectedGenre] = useState<IBook["genre"]>(book.genre);

    // ✅ Initialize form with default values using react-hook-form
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IUpdateBook>({
        defaultValues: {
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            copies: book.copies,
            description: book.description || "",
        },
    });

    // ✅ Form submission handler
    const onSubmit = async (data: IUpdateBook) => {
        try {
            const updatedData = {
                ...data,
                genre: selectedGenre,
                id: book._id
            };
            await updateBook(updatedData).unwrap();
            refetch();
            toast.success("Book updated successfully!");
            dispatch(closeModal());
        } catch (error) {
            const err = error as { data: { message: string } };
            toast.error(err.data.message || "Something went wrong!");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
            {/* ✅ Form fields in a responsive 2-column grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        {...register("title", { required: "Title is required" })}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/* Author */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <input
                        {...register("author", { required: "Author is required" })}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
                </div>

                {/* Genre Dropdown */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Genre</label>
                    <Listbox
                        value={selectedGenre}
                        onChange={(value) => {
                            setSelectedGenre(value);
                            setValue("genre", value as IBook["genre"]);
                        }}
                    >
                        <div className="relative">
                            <ListboxButton className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white flex justify-between items-center">
                                <span className={selectedGenre ? "" : "text-gray-400"}>
                                    {selectedGenre || "Select Genre"}
                                </span>
                                <ChevronsUpDownIcon className="h-5 w-5 text-gray-500" />
                            </ListboxButton>
                            <ListboxOptions className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                                {genres.map((genre, i) => (
                                    <ListboxOption
                                        key={i}
                                        value={genre}
                                        className={({ active }) =>
                                            `cursor-pointer px-4 py-2 ${active ? "bg-blue-100 text-blue-700" : "text-gray-800"}`
                                        }
                                    >
                                        {({ selected }) => (
                                            <div className="flex justify-between">
                                                <span>{genre}</span>
                                                {selected && <CheckIcon className="w-5 h-5 text-blue-500" />}
                                            </div>
                                        )}
                                    </ListboxOption>
                                ))}
                            </ListboxOptions>
                        </div>
                    </Listbox>
                </div>

                {/* Availability (readonly) */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Availability</label>
                    <input
                        type="text"
                        disabled
                        defaultValue={book.available ? "Available" : "Unavailable"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700 outline-none"
                    />
                </div>

                {/* ISBN */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
                    <input
                        {...register("isbn", { required: "ISBN is required" })}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>}
                </div>

                {/* Copies */}
                <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Copies</label>
                    <input
                        {...register("copies", {
                            min: { value: 0, message: "Copies cannot be negative"}
                        })}
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    {errors.copies && <p className="text-red-500 text-sm mt-1">{errors.copies.message}</p>}
                </div>
            </div>

            {/* Description (Full width) */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    {...register("description")}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-y max-h-40"
                    placeholder="Write a short description..."
                />
            </div>

            {/* ✅ Action Buttons */}
            <div className="flex justify-end gap-3  pt-2 sticky bottom-0 bg-white z-10 pb-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={() => dispatch(closeModal())}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    loading={isLoading}
                    disabled={isLoading}
                >
                    {isLoading ? "Updating..." : "Update Now"}
                </Button>
            </div>
        </form>

    );
};

export default EditBookForm;

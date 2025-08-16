import { useState } from "react";
import { useForm } from "react-hook-form";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import type { IBook } from "../types";
import Button from "../components/ui/Button";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useAddBookMutation } from "../features/books/bookApi";

const genres = [
    "FICTION",
    "NON_FICTION",
    "SCIENCE",
    "HISTORY",
    "BIOGRAPHY",
    "FANTASY",
];

const AddBook = () => {
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    const navigate = useNavigate();

    const [addBook, { isLoading }] = useAddBookMutation();

    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = useForm<IBook>();

    const onSubmit = async (data: IBook) => {
        if (!selectedGenre) {
            toast.error("genre required")
            return;
        }

        try {
            const finalData = {
                ...data,
                genre: selectedGenre,
            };

            await addBook(finalData).unwrap();

            reset();
            setSelectedGenre(null);
            navigate("/all-books");
            toast.success("Book added successfully!");
            
        } catch (error) {
            const err = error as { data: { message: string } };
            toast.error(err.data.message || "Something went wrong!")
        }
    };

    return (
        <section className=" bg-gray-50 py-10">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full p-6 bg-white rounded-xl shadow-md"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Book Title <span className="text-red-500 ">*</span></label>
                            <input
                                {...register("title", { required: "Title is required" })}
                                type="text"
                                placeholder="Enter book title"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                        </div>

                        {/* Author */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Author <span className="text-red-500 ">*</span></label>
                            <input
                                {...register("author", { required: "Author is required" })}
                                type="text"
                                placeholder="Enter author name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
                        </div>

                        {/* ISBN */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">ISBN <span className="text-red-500 ">*</span></label>
                            <input
                                {...register("isbn", { required: "ISBN is required" })}
                                type="text"
                                placeholder="e.g. 978-3-16-148410-0"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.isbn && <p className="text-red-500 text-sm mt-1">{errors.isbn.message}</p>}
                        </div>

                        {/* Genre  Dropdown */}
                        <div className="col-span-1">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Genre <span className="text-red-500 ">*</span></label>
                            <Listbox
                                value={selectedGenre}
                                onChange={(value) => {
                                    setSelectedGenre(value);
                                    setValue("genre", value as IBook["genre"]);
                                }}
                            >
                                <div className="relative">
                                    <ListboxButton className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white flex justify-between items-center focus:ring-2 focus:ring-blue-500">
                                        <span className={selectedGenre ? "" : "text-gray-400"}>
                                            {selectedGenre || "Select Genre"}
                                        </span>
                                        <ChevronsUpDownIcon className="h-5 w-5 text-gray-500" />
                                    </ListboxButton>

                                    {/* Genre Dropdown Options */}
                                    <ListboxOptions className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
                                        {genres.map((genre, i) => (
                                            <ListboxOption
                                                key={i}
                                                value={genre}
                                                className={({ active }) =>
                                                    `cursor-pointer px-4 py-2 ${active ? "bg-blue-100 text-blue-700" : "text-gray-800"
                                                    }`
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

                        {/* Copies */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Copies <span className="text-red-500 ">*</span></label>
                            <input
                                {...register("copies", {
                                    required: "Copies are required",
                                    min: { value: 1, message: "Minimum 1 copy required" },
                                })}
                                type="number"
                                placeholder="Enter number of copies"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            {errors.copies && <p className="text-red-500 text-sm mt-1">{errors.copies.message}</p>}
                        </div>

                        {/* Description */}
                        <div className="col-span-1 md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                            <textarea
                                {...register("description")}
                                rows={4}
                                placeholder="Enter short description"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none "
                            />
                        </div>
                    </div>

                    {/* Action Buttons: Reset & Submit */}
                    <div className="mt-6 flex justify-end space-x-3">
                        <Button
                            type="submit"
                            variant="primary"
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            {isLoading ? 'Adding...' : 'Add Book'}
                        </Button>
                    </div>
                </form>

            </div>
        </section>
    );
};

export default AddBook;


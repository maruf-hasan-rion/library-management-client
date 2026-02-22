import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import type { IAddBook } from "../types";
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
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IAddBook>();

  const onSubmit = async (data: IAddBook) => {
    if (!selectedGenre) {
      setError("genre", { message: "Genre is required" });
      toast.error("Genre is required");
      return;
    }

    try {
      const finalData: IAddBook = { ...data, genre: selectedGenre };

      await addBook(finalData).unwrap();

      reset();
      setSelectedGenre(null);
      toast.success("Book added successfully!");
      navigate("/books");
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Something went wrong!");
    }
  };

  return (
    <section className="bg-gray-50 py-10">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Add New Book</h1>
          <p className="mt-1 text-sm text-gray-600">
            Fill the form to add a new book.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full rounded-xl bg-white p-6 shadow-md"
        >
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Book Title <span className="text-red-500">*</span>
              </label>
              <input
                {...register("title", { required: "Title is required" })}
                type="text"
                placeholder="Enter book title"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                {...register("author", { required: "Author is required" })}
                type="text"
                placeholder="Enter author name"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.author && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.author.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                ISBN <span className="text-red-500">*</span>
              </label>
              <input
                {...register("isbn", { required: "ISBN is required" })}
                type="text"
                placeholder="e.g. 9780553380163"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.isbn && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.isbn.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Genre <span className="text-red-500">*</span>
              </label>

              <Listbox
                value={selectedGenre}
                onChange={(value) => {
                  setSelectedGenre(value);
                  if (value) {
                    setValue("genre", value);
                    clearErrors("genre");
                  }
                }}
              >
                <div className="relative">
                  <ListboxButton className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 focus:ring-2 focus:ring-blue-500">
                    <span
                      className={
                        selectedGenre ? "text-gray-900" : "text-gray-400"
                      }
                    >
                      {selectedGenre || "Select Genre"}
                    </span>
                    <ChevronsUpDownIcon className="h-5 w-5 text-gray-500" />
                  </ListboxButton>

                  <ListboxOptions className="absolute z-10 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
                    {genres.map((genre) => (
                      <ListboxOption
                        key={genre}
                        value={genre}
                        className={({ active }) =>
                          `cursor-pointer px-4 py-2 ${
                            active
                              ? "bg-blue-100 text-blue-700"
                              : "text-gray-800"
                          }`
                        }
                      >
                        {({ selected }) => (
                          <div className="flex items-center justify-between">
                            <span>{genre}</span>
                            {selected && (
                              <CheckIcon className="h-5 w-5 text-blue-500" />
                            )}
                          </div>
                        )}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>

              {errors.genre && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.genre.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Number of Copies <span className="text-red-500">*</span>
              </label>
              <input
                {...register("copies", {
                  required: "Copies are required",
                  valueAsNumber: true,
                  min: { value: 0, message: "Copies cannot be negative" },
                  validate: (v) =>
                    Number.isInteger(v) || "Copies must be an integer",
                })}
                type="number"
                placeholder="Enter number of copies"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.copies && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.copies.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                placeholder="Enter short description"
                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Book"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddBook;

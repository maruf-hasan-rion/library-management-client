import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronsUpDownIcon, CheckIcon } from "lucide-react";
import toast from "react-hot-toast";

import { useAppDispatch } from "../../../store/hook";
import { closeModal } from "../../../features/modal/modalSlice";
import Button from "../../ui/Button";
import { useUpdateBookMutation } from "../../../features/books/bookApi";
import type { IAddBook, IBook, IUpdateBook } from "../../../types";

const genres: IBook["genre"][] = [
  "FICTION",
  "NON_FICTION",
  "SCIENCE",
  "HISTORY",
  "BIOGRAPHY",
  "FANTASY",
];

interface Props {
  book: IBook;
}

const EditBookForm = ({ book }: Props) => {
  const dispatch = useAppDispatch();
  const [updateBook, { isLoading }] = useUpdateBookMutation();

  const [selectedGenre, setSelectedGenre] = useState<IBook["genre"]>(
    book.genre,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IAddBook>({
    defaultValues: {
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      copies: book.copies,
      description: book.description || "",
      genre: book.genre,
    },
  });

  const onSubmit = async (data: IAddBook) => {
    try {
      const updatedData: IUpdateBook = {
        id: book._id,
        ...data,
        genre: selectedGenre,
      };

      await updateBook(updatedData).unwrap();

      toast.success("Book updated successfully!");
      dispatch(closeModal());
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            {...register("author", { required: "Author is required" })}
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-500">{errors.author.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Genre
          </label>
          <Listbox
            value={selectedGenre}
            onChange={(value) => {
              setSelectedGenre(value);
              setValue("genre", value);
            }}
          >
            <div className="relative">
              <ListboxButton className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2">
                <span className="text-gray-900">{selectedGenre}</span>
                <ChevronsUpDownIcon className="h-5 w-5 text-gray-500" />
              </ListboxButton>

              <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
                {genres.map((genre) => (
                  <ListboxOption
                    key={genre}
                    value={genre}
                    className={({ active }) =>
                      `cursor-pointer px-4 py-2 ${active ? "bg-blue-100 text-blue-700" : "text-gray-800"}`
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
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Availability
          </label>
          <input
            type="text"
            disabled
            value={book.available ? "Available" : "Unavailable"}
            className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-700 outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            ISBN
          </label>
          <input
            {...register("isbn", { required: "ISBN is required" })}
            type="text"
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.isbn && (
            <p className="mt-1 text-sm text-red-500">{errors.isbn.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Copies
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
            className="w-full rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.copies && (
            <p className="mt-1 text-sm text-red-500">{errors.copies.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={4}
          className="max-h-40 w-full resize-y rounded-md border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write a short description..."
        />
      </div>

      <div className="sticky bottom-0 z-10 flex justify-end gap-3 bg-white pb-4 pt-2">
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

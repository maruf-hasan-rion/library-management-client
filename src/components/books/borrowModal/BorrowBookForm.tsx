import { useForm } from "react-hook-form";
import { useAppDispatch } from "../../../store/hook";
import type { IBook } from "../../../types";
import { closeModal } from "../../../features/modal/modalSlice";
import Button from "../../ui/Button";
import { useCreateBorrowMutation } from "../../../features/borrows/borrowApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

interface Props {
  book: IBook;
}

interface BorrowData {
  quantity: number;
  dueDate: string;
}

const BorrowBookForm = ({ book }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [borrow, { isLoading }] = useCreateBorrowMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BorrowData>();

  const today = new Date().toISOString().split("T")[0];

  const onSubmit = async (data: BorrowData) => {
    try {
      await borrow({ ...data, book: book._id }).unwrap();

      reset();
      dispatch(closeModal());
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err.data?.message || "Something went wrong!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5">
      <div className="grid gap-1 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm text-gray-700">
        <p>
          <strong>Title:</strong> {book.title}
        </p>
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>Available Copies:</strong> {book.copies}
        </p>
        <p>
          <strong>ISBN:</strong> {book.isbn}
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <input
          {...register("quantity", {
            required: "Quantity is required",
            valueAsNumber: true,
            min: { value: 1, message: "Minimum 1 copy required" },
            max: {
              value: book.copies,
              message: `You can borrow up to ${book.copies} copies`,
            },
            validate: (v) =>
              Number.isInteger(v) || "Quantity must be an integer",
          })}
          type="number"
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter number of copies"
        />
        {errors.quantity && (
          <p className="mt-1 text-sm text-red-500">{errors.quantity.message}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          {...register("dueDate", { required: "Due date is required" })}
          type="date"
          min={today}
          className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-500">{errors.dueDate.message}</p>
        )}
      </div>

      <div className="sticky bottom-0 z-10 flex justify-end gap-3 bg-white pb-4 pt-2">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            reset();
            dispatch(closeModal());
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
        >
          {isLoading ? "Borrowing..." : "Confirm Borrow"}
        </Button>
      </div>
    </form>
  );
};

export default BorrowBookForm;

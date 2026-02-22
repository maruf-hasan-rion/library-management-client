import { BookOpen, Plus } from "lucide-react";
import { useGetBorrowSummaryQuery } from "../features/borrows/borrowApi";
import Lottie from "lottie-react";
import loader from "../assets/loader.json";
import Button from "../components/ui/Button";
import { Link } from "react-router";

const BorrowSummary = () => {
  const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);
  const summaries = data?.data || [];

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
          Failed to fetch borrow summary. Please try again.
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
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Borrow Summary</h1>
          <p className="mt-1 text-sm text-gray-600">
            Overview of how many copies were borrowed per book.
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            <span className="h-2 w-2 rounded-full bg-blue-600" />
            {summaries.length} {summaries.length === 1 ? "record" : "records"}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          {summaries.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-4 py-14 text-center">
              <BookOpen className="mb-4 h-12 w-12 text-gray-400" />
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                No borrow records found
              </h3>
              <p className="mb-6 text-gray-600">
                Borrow a book to see summary here.
              </p>
              <Link to="/all-books">
                <Button icon={Plus} variant="primary">
                  Borrow Your First Book
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-700">
                  Summary Table
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                      <th className="px-6 py-4">Book Title</th>
                      <th className="px-6 py-4">ISBN</th>
                      <th className="px-6 py-4 text-right">Total Borrowed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {summaries.map((summary, i) => (
                      <tr
                        key={i}
                        className="transition-colors hover:bg-blue-50/40"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {summary.book.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {summary.book.isbn}
                        </td>
                        <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                          {summary.totalQuantity}{" "}
                          <span className="font-normal text-gray-500">
                            {summary.totalQuantity === 1 ? "copy" : "copies"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BorrowSummary;

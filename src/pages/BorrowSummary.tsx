import { BookOpen, Plus } from "lucide-react";
import { useGetBorrowSummaryQuery } from "../features/borrows/borrowApi";
import Lottie from "lottie-react";
import loader from '../assets/loader.json'
import Button from "../components/ui/Button";
import { Link } from "react-router";


const BorrowSummary = () => {
    // Fetch borrow summary data using RTK Query
    const { data, isLoading, isError } = useGetBorrowSummaryQuery(undefined);

    // Extract summaries or set as empty array fallback
    const summaries = data?.data || []

    // ✅ 1. Handle loading state with Lottie animation
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Lottie className="size-20" animationData={loader} />
            </div>
        );
    }

    // ✅ 2. Handle error state
    if (isError) {
        return (
            <div className="flex flex-col justify-center items-center h-[60vh] text-center">
                <h2 className="text-xl font-semibold text-red-600">Something went wrong</h2>
                <p className="text-gray-500 mt-2">
                    Failed to fetch borrows summary. Please try again.
                </p>
                <Button variant="primary" className="mt-4" onClick={() => window.location.reload()}>
                    Retry
                </Button>
            </div>
        );
    }

    // ✅ 3. Main UI rendering (Empty state or table)
    return (
        <div>
            {/* Empty state if no borrow summaries exist */}
            {summaries?.length === 0 ?
                <div className="text-center flex justify-center items-center h-[60vh] px-4">
                    <div>
                        <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No borrow summary found</h3>
                        <p className="text-gray-500 mb-6">Please add your first borrow book to the borrow summary.</p>
                        <Link to="/books">
                            <Button icon={Plus} variant="primary">
                                Take Your First borrow
                            </Button>
                        </Link>
                    </div>
                </div>
                : (
                    // ✅ Borrow summary table view
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2"> Borrow Summary</h1>

                        {/* Summary Table */}
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50 text-gray-600 uppercase tracking-wide text-xs">
                                        <tr>
                                            <th className="px-6 py-3 text-left">Book Title</th>
                                            <th className="px-6 py-3 text-left">ISBN</th>
                                            <th className="px-6 py-3 text-left truncate">Total Quantity Borrowed</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                        {summaries.map((summary, i) => (
                                            <tr key={i} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">
                                                    {summary.book.title}
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{summary.book.isbn}</td>
                                                <td className="px-6 py-4 text-gray-600 font-medium">{summary.totalQuantity} copies</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default BorrowSummary;
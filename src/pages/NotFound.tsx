import { Link } from "react-router";

const NotFound = () => {
    return (
        <section className="flex items-center justify-center h-screen bg-base-100 text-center px-4">
            <div className="max-w-lg">
                <h1 className="text-[120px] font-extrabold text-gray-300 leading-none">404</h1>
                <h2 className="text-2xl font-bold text-gray-800 mt-2">Page Not Found</h2>
                <p className="text-gray-500 mt-3">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <div className="mt-6">
                    <Link
                        to="/"
                        className="inline-block px-6 py-2 text-sm font-semibold rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-all"
                    >
                        Back to Library
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
import { Link, useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-gray-50 px-4 text-center">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="text-[96px] font-extrabold leading-none text-gray-200 sm:text-[120px]">
          404
        </h1>

        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          Page Not Found
        </h2>

        <p className="mt-3 text-gray-600">
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Go Back
          </button>

          <Link
            to="/books"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Back to Library
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;

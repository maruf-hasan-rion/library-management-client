import { Link } from "react-router";

export default function Home() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: "url(https://i.ibb.co/mVQBthyt/library.jpg)",
      }}
    >
      <div className="absolute inset-0 bg-blue-900/70 backdrop-brightness-75" />
      <div className="relative z-10 max-w-2xl text-center text-white">
        <h1 className="mb-6 text-4xl font-bold sm:text-5xl">
          Welcome to Library Hero
        </h1>

        <p className="mb-8 text-lg text-gray-200">
          Manage your books easily — add, edit, borrow, and track your
          collection all in one place. A simple and powerful system to keep your
          library organized and accessible.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/books"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/add-book"
            className="inline-flex items-center justify-center rounded-lg border border-white/50 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-blue-900"
          >
            Add a Book
          </Link>
        </div>
      </div>
    </section>
  );
}

import { Link, NavLink } from "react-router";
import { IoLibrary } from "react-icons/io5";

const navClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
    isActive
      ? "bg-blue-600 text-white shadow-md"
      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500`;

const Navbar = () => {
  const navLinks = (
    <>
      <NavLink to="/" className={navClass}>
        Home
      </NavLink>
      <NavLink to="/books" className={navClass}>
        All Books
      </NavLink>
      <NavLink to="/add-book" className={navClass}>
        Add Book
      </NavLink>
      <NavLink to="/borrow-summary" className={navClass}>
        Borrow Summary
      </NavLink>
    </>
  );

  return (
    <nav className="sticky top-0 z-20 bg-white drop-shadow-md">
      <div className="navbar mx-auto max-w-7xl">
        <div className="navbar-start">
          <Link
            to="/"
            className="flex items-center space-x-3 text-gray-900 transition-colors hover:text-blue-600"
          >
            <IoLibrary className="h-8 w-8 text-blue-600" />
            <span className="text-[18px] font-bold md:text-xl">
              Library Hero
            </span>
          </Link>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <button
              type="button"
              aria-label="Open menu"
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content z-30 mt-3 w-52 space-y-2 rounded-2xl bg-white p-2 shadow"
            >
              {navLinks}
            </ul>
          </div>

          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal space-x-3 p-0">{navLinks}</ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

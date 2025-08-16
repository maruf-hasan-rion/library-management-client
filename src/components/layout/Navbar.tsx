import { Link, NavLink} from "react-router";
import { IoLibrary } from "react-icons/io5";

const Navbar = () => {
    const navLinks = <>
        <NavLink
           to="/"
            className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`
            }
        >
          <span>Home</span>
        </NavLink>
        <NavLink
            to="/all-books"
            className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`
            }
        >
          <span>All Books</span>
        </NavLink>
        <NavLink
            to="/add-book"
            className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`
            }
        >
            <span>Add Book</span>
        </NavLink>

        <NavLink
            to="/borrow-summary"
            className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`
            }
        >
            <span>Borrow Summary</span>
        </NavLink>
    </>

    return (
        <nav className="  bg-white drop-shadow-md sticky top-0 z-20">
            <div className="navbar max-w-7xl mx-auto">
                <div className="navbar-start ">
                    <Link to="/all-books" className="flex items-center space-x-3 text-gray-900 hover:text-blue-600 transition-colors">
                            <IoLibrary className="h-8 w-8 text-blue-600"></IoLibrary>
                        <span className="md:text-xl text-[18px] font-bold">Library Hero</span>
                    </Link>
                </div>

                <div className="navbar-end">
                    <div className="dropdown dropdown-end ">
                        <div tabIndex={0} role="button" className="border-none p-1 btn bg-none lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content  rounded-2xl z-30 mt-3 w-52 p-2 shadow  bg-white space-y-2 ">
                            {navLinks}
                        </ul>
                    </div>

                    <div className="hidden lg:flex">
                        <ul className="menu menu-horizontal space-x-3 p-0">
                            {navLinks}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
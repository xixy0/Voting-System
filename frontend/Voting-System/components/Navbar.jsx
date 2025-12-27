import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

function Navbar() {
  const { isLoggedIn, role } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 text-white border-b border-orange-800">
      <div className="w-full bg-orange-800 mx-auto px-6 py-3 flex items-center justify-between">

        {/* Brand */}
        <h1
          className="text-2xl font-semibold text-white "
        >
          Voting System
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-white font-medium">

          {isLoggedIn && (
            <Link
              to="/election/details"
              className="hover:text-orange-300 transition"
            >
              Elections
            </Link>
          )}

          {isLoggedIn && role?.toUpperCase().includes("ADMIN") && (
            <Link
              to="/candidate"
              className="hover:text-orange-300 transition"
            >
              Candidates
            </Link>
          )}

          <Link
            to="/about"
            className="hover:text-orange-300 transition"
          >
            About
          </Link>

          {!isLoggedIn ? (
            <Link
              to="/"
              className="px-4 py-2 rounded-md bg-white text-orange-700 hover:bg-gray-300 transition"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-white text-sm">
                Hi, {role?.includes("ADMIN") ? "Admin" : "Voter"}
              </span>
              <LogoutButton />
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-orange-700"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-orange-200">
          <ul className="flex flex-col px-6 py-4 space-y-3 text-orange-700 font-medium">

            {isLoggedIn && (
              <Link
                to="/election/details"
                onClick={() => setMenuOpen(false)}
                className="hover:text-black"
              >
                Elections
              </Link>
            )}

            {isLoggedIn && role?.toUpperCase().includes("ADMIN") && (
              <Link
                to="/candidate"
                onClick={() => setMenuOpen(false)}
                className="hover:text-black"
              >
                Candidates
              </Link>
            )}

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="hover:text-black"
            >
              About
            </Link>

            {!isLoggedIn ? (
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-black font-medium"
              >
                Login
              </Link>
            ) : (
              <LogoutButton />
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

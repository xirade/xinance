import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "../hooks/useAppContext";
import { useLogout } from "../hooks/useLogout";

// icon
import Logo from "../assets/logo.svg";

export default function Navbar() {
  const [isHidden, setIsHidden] = useState(true);
  const ref = useRef();
  const { logout } = useLogout();
  const { user } = useAppContext();

  useEffect(() => {
    const checkClickOutside = (e) => {
      if (!isHidden && ref.current && !ref.current.contains(e.target))
        setIsHidden(true);
    };
    document.addEventListener("mousedown", checkClickOutside);
    return () => document.removeEventListener("mousedown", checkClickOutside);
  }, [isHidden]);
  return (
    <nav className="bg-blue-400 dark:bg-blue-900">
      <div className="container px-4 mx-auto flex items-center justify-between flex-wrap">
        <div className="flex items-center flex-shrink-0">
          <Link to="/" className="mt-0 text-blue-100 hover:text-white mr-4">
            <img className="block dark:brightness-200 dark:invert mx-auto h-20" src={Logo} alt="Xinance" />
          </Link>
        </div>
        <div className="text-lg flex items-center gap-4">
          {!user ? (
            <>
              <Link to="/login" className="mt-0 text-blue-100 hover:text-white">
                Login
              </Link>
              <Link
                to="/signup"
                className="mt-0 text-blue-100 hover:text-white"
              >
                Signup
              </Link>
            </>
          ) : (
            <div ref={ref} className="relative">
              <button
                type="button"
                className="bg-gray-800 flex text-sm transition ease-in-out transition-duration-200 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-300 dark:focus:ring-blue-600 focus:ring-blue-50"
                id="user-menu-button"
                onClick={() => setIsHidden((prevState) => !prevState)}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-10 w-10 rounded-full"
                  src="http://placeimg.com/128/128/people"
                  alt="avatar"
                />
              </button>
              {/* DROPDOWN */}
              <div
                className="z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                tabIndex="-1"
                hidden={isHidden}
              >
                <span
                  className="block dark:text-gray-50 px-4 py-2"
                  style={{ cursor: "default" }}
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                >
                  Hello, {user.displayName}
                </span>
                <button
                  className="dark:hover:bg-slate-600 hover:bg-slate-100 dark:text-gray-100 w-full px-4 py-2 text-left text-sm dark:text-gray-50"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-1"
                  onClick={logout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

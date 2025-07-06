import { Link } from 'react-router-dom';

import { FaUser, FaSignInAlt, FaSignOutAlt, FaBuilding } from 'react-icons/fa';
import { toast } from 'react-toastify';
// import destroySession from "@/app/actions/destroySession";
import logo from '../assets/logo.svg';
import { useLogout } from '../hooks/auth/useLogout';
import { useAuthContext } from '@/hooks/auth/useAuthContext';
import { useState } from 'react';

const Header = () => {
  const { user } = useAuthContext();

  const { logout } = useLogout();

  const [openMobileNavbar, setOpenMobileNavbar] = useState(false);

  return (
    <header className="bg-gray-100 w-full">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {user && (
            <button
              data-collapse-toggle="navbar-hamburger"
              type="button"
              className="md:hidden inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-hamburger"
              aria-expanded="false"
              onClick={() => setOpenMobileNavbar(!openMobileNavbar)}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          )}
          <div className="flex items-center">
            <Link onClick={() => setOpenMobileNavbar(false)} to="/">
              <img className="h-12 w-12" src={logo} alt="Bookit" />
            </Link>
            {user && (
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    onClick={() => setOpenMobileNavbar(false)}
                    to="/"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                  >
                    Rooms
                  </Link>
                  {/* <!-- Logged In Only --> */}
                  {/* {isAuthenticated && ( */}
                  <>
                    <Link
                      onClick={() => setOpenMobileNavbar(false)}
                      to="/bookings"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                    >
                      Bookings
                    </Link>
                    <Link
                      onClick={() => setOpenMobileNavbar(false)}
                      to="/rooms/add"
                      className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                    >
                      Add Room
                    </Link>
                  </>
                </div>
              </div>
            )}
          </div>
          {/* <!-- Right Side Menu --> */}
          <div className="ml-auto">
            <div className="ml-4 flex items-center md:ml-6">
              {/* <!-- Logged Out Only --> */}
              {/* {!isAuthenticated && ( */}
              {!user && (
                <>
                  <Link
                    onClick={() => setOpenMobileNavbar(false)}
                    to="/login"
                    className="mr-3 text-gray-800 hover:text-gray-600"
                  >
                    <FaSignInAlt className="inline mr-1" /> Login
                  </Link>
                  <Link
                    onClick={() => setOpenMobileNavbar(false)}
                    to="/register"
                    className="mr-3 text-gray-800 hover:text-gray-600"
                  >
                    <FaUser className="inline mr-1" /> Register
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link
                    onClick={() => setOpenMobileNavbar(false)}
                    to="/rooms/my"
                    className="hidden md:block"
                  >
                    <FaBuilding className="inline mr-1" /> My Rooms
                  </Link>
                  <button onClick={logout} className="mx-3 text-gray-800 hover:text-gray-600">
                    <FaSignOutAlt className="inline mr-1" /> Sign Out
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* <!-- Mobile menu --> */}
      <div className={`md:hidden ${!openMobileNavbar && 'hidden'}`}>
        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <Link
            onClick={() => setOpenMobileNavbar(false)}
            to="/"
            className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
          >
            Rooms
          </Link>
          {/* <!-- Logged In Only --> */}
          {user && (
            <>
              <Link
                onClick={() => setOpenMobileNavbar(false)}
                to="/bookings"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
              >
                Bookings
              </Link>
              <Link
                onClick={() => setOpenMobileNavbar(false)}
                to="/rooms/add"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
              >
                Add Room
              </Link>
              <Link
                onClick={() => setOpenMobileNavbar(false)}
                to="/rooms/my"
                className="block md:hidden rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
              >
                My Rooms
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;

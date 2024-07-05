"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Search from "./Search";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { signedIn, user } = useAuth();
  // const [isClient, setIsClient] = useState(false);
  const roles = ["superAdmin", "admin"];

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // if (!isClient) {
  //   return <div className="navLoader"></div>;
  // }

  if (signedIn === null) {
    return <div className="navLoader"></div>;
  }

  // const searchItem = ( 
  //   <li>
  //     <button
  //       onClick={() => {
  //         const modal = document.getElementById("my_modal_3");
  //         if (modal) {
  //           modal.showModal();
  //         }
  //       }}
  //     >Search
  //     </button>
  //     <Search /> 
  //   </li> 
  // );

  const navItems = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      {signedIn === false ? (
        <li>
          <Link href="/signup">Sign Up</Link>
        </li>
      ) : (
        <li>
          <Link href="/create">Create</Link>
        </li>
      )}
      {signedIn === true && (
        <li>
          <Link href="/search">Search</Link>
        </li>
      )}
      {signedIn === true && (
        <li>
          <Link href="/statistics">Statistics</Link>
        </li>
      )}
      {signedIn === true && (
        <li>
          <Link href="/profile">Profile</Link>
        </li>
      )}
      {signedIn === true && (
        <li>
          <Link href="/tickets">Tickets</Link>
        </li>
      )}
      { ( signedIn === true && roles.includes(user?.role) ) && (
        <li>
          <Link href="/users">Users</Link>
        </li>
      )}
      {signedIn === true && (
        <li>
          <Link href={`/users/view-user/${user?._id}`}>My Account</Link>
        </li>
      )}
    </>
  );

  return (
    <header className="mx-auto transition-all duration-300 ease-in-out bg-blue">
      <div className="navbar pr-4 pl-2 md:pl-10 md:pr-12">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              onClick={toggleDropdown}
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </div>
            {isDropdownOpen && (
              <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                {navItems}
              </ul>
            )}
          </div>
          <Link href="/" className="btn btn-ghost text-xl">
            <img src="/R.png" alt="Logo" className="h-10 w-10 mr-4" />{" "}
            <span>Tickets</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex lg:flex-row lg:flex-wrap lg:justify-center lg:w-7/12">
          <ul className="menu menu-horizontal lg:justify-center px-1 menu-lg font-semibold">
            {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          {signedIn === false && (
            <Link href="/signin" className="btn">
              Sign In
            </Link>
          )}
          {signedIn === true && (
            <Link href="/signout" className="btn">
              Sign Out
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;

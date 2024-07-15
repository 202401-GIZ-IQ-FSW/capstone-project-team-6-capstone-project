"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Search from "./Search";
import { useAuth } from "./AuthContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faSignOutAlt} from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { signedIn, user, loading, setLoading } = useAuth();
  // const [isClient, setIsClient] = useState(false);
  const roles = ["superAdmin", "admin"];
  const [showSignOut, setShowSignOut] = useState(false);

  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  useEffect(() => {
    // if (signedIn === null) {
    //   setLoading(true);
    // } else if (signedIn === false || signedIn === true) {
    //   setLoading(false);
    // }
  }, [signedIn, user]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleShowSignOut = () => {
    setShowSignOut(!showSignOut);
  };

  // if (!isClient) {
  //   return <div className="navLoader"></div>;
  // }

  if (signedIn === null || loading) {
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
          <Link href="/tickets/new-ticket">Create</Link>
        </li>
      )}
      {/* {signedIn === true && (
        <li>
          <Link href="/search">Search</Link>
        </li>
      )} */}
      {/* {signedIn === true && (
        <li>
          <Link href="/statistics">Statistics</Link>
        </li>
      )} */}
      {/* {signedIn === true && (
        <li>
          <Link href={`/users/view-user/${user?._id}`}>My Account</Link>
        </li>
      )} */}
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
          <Link href={`/users/view-user/${user?._id}`}>Profile</Link>
        </li>
      )}
    </>
  );

  return (
    <header className="transition-all duration-300 ease-in-out bg-blue">
      
      <div className="navbar px-4 lg:pr-8 container mx-auto py-2 justify-between">
        
        <div className="lg:hidden">
          <div className="dropdown">
            <div
              onClick={toggleDropdown}
              tabIndex={0}
              role="button"
              className="btn btn-ghost pl-1 pr-3 lg:hidden"
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
          
          <Link href="/" className="btn px-1 btn-ghost text-base lg:text-xl">
            <img src="/R.png" alt="Logo" className="h-10 w-10" />{" "}
            <span>Ticket Master</span>
          </Link>

        </div>

        <div className="navbar-start">
          <Link href="/" className="hidden lg:flex btn btn-ghost text-base lg:text-xl">
            <img src="/R.png" alt="Logo" className="h-10 w-10" />{" "}
            <span>Ticket Master</span>
          </Link>
        </div>
        
        <div className="navbar-center hidden lg:flex lg:flex-row lg:justify-center">
          <ul className="menu menu-horizontal lg:text-base xl:menu-lg -space-x-2 font-semibold">
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
            <div className="relative">
              <div
                onClick={toggleShowSignOut}
                className={`bg-gray-50 p-2 text-sm lg:text-base hover:bg-gray-300 rounded-lg flex flex-row items-center cursor-pointer ${showSignOut? "border border-b-0 rounded-b-none border-gray-800" : ""}`}
              >
                <p>{user?.name}</p> {/* Display user's name */}
                <FontAwesomeIcon icon={faCaretDown} className="text-gray-500 ml-2" /> {/* Carrot down icon */}
              </div>
              {showSignOut && 
                <div className="flex justify-center bg-gray-50 border-x border-gray-600 ">
                  <hr className="border rounded-full border-gray-400 w-full text-center"/>
                </div> 
              }
              {showSignOut && (
                <div className="absolute right-0 w-full z-1 text-sm lg:text-base">
                  <Link onClick={toggleShowSignOut} href="/signout" className="bg-gray-50 p-2 flex flex-row items-center justify-center hover:bg-gray-300 rounded-lg cursor-pointer border border-gray-800 w-full border-t-0 rounded-t-none">
                    <p>Sign Out</p>
                    <FontAwesomeIcon icon={faSignOutAlt} className="pl-2 pt-1" />
                  </Link>
                </div>
              )}
          </div>
          )}
        </div>
        
      </div>
    </header>
  );
};

export default Navbar;

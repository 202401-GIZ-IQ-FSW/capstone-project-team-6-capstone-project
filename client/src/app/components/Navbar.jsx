"use client"
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { signedIn } = useAuth();
  // console.log("user in navbar", user);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems =
    <>
      <li><Link href="/">Home</Link></li>
      <li><Link href="/about">About</Link></li>
      {!signedIn ? 
        <li><Link href="/signup">Sign Up</Link></li> 
        : 
        <li><Link href="/create">Create</Link></li>
      }
      {signedIn && <li><Link href="./notifications">Notifications</Link></li>}
      {signedIn && <li><Link href="./search">Search</Link></li>}
    </>

  return (
    <header className="max-w-screen-2xl container mx-auto transition-all duration-300 ease-in-out bg-blue">
      <div className="navbar xl:px-24">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            {navItems}
            </ul>
          </div>
          <a href="/" className="btn btn-ghost text-xl">
          <img src="/R.png" alt="Logo" className="h-10 w-10 mr-4" />  <span>Tickets</span>    </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 menu-lg font-semibold">
          {navItems}
          </ul>
        </div>
        <div className="navbar-end">
          {!signedIn && <Link href="/signin" className="btn">Sign In</Link>}
          {signedIn && <Link href="/signout" className="btn">Sign Out</Link>}
        </div>
      </div>
    </header>
  );
}
export default Navbar;
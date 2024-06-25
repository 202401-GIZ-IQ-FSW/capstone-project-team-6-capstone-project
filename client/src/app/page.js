"use client"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faTicketAlt, faArrowUp, faLifeRing, faUsers } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function App() {
  return (
    <>
     <Navbar />
     <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        <div className="bg-white p-8 md:p-20 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-8 md:mb-0">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-8">Submit your technical issues and queries easily!</h1>
              <p className="text-gray-600 text-lg md:text-xl mb-8 md:mb-52">Securely submit and manage support tickets for technical issues</p>
              <div>
                <Link href="/submit" legacyBehavior>
                  <a className="bg-gray-800 text-white px-4 py-2 md:px-6 md:py-6 rounded mr-2 md:mr-4">Submit</a>
                </Link>
                <Link href="/new-ticket" legacyBehavior>
                  <a className="bg-gray-800 text-white px-4 py-2 md:px-6 md:py-6 rounded">New ticket</a>
                </Link>
              </div>
            </div>
            <div className="text-gray-800 text-9xl">
              <FontAwesomeIcon icon={faFolder} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 mt-8 md:mt-12">
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-base md:text-lg">Ticket activity</p>
            <h2 className="text-2xl md:text-3xl font-bold">10K+</h2>
            <FontAwesomeIcon icon={faUsers} className="text-gray-800 text-4xl md:text-6xl mt-2 md:mt-4" />
          </div>
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-base md:text-lg">Tickets submitted</p>
            <h2 className="text-2xl md:text-3xl font-bold">100K+</h2>
            <FontAwesomeIcon icon={faTicketAlt} className="text-gray-800 text-4xl md:text-6xl mt-2 md:mt-4" />
          </div>
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-base md:text-lg">Tickets resolved</p>
            <h2 className="text-2xl md:text-3xl font-bold">500K+</h2>
            <FontAwesomeIcon icon={faArrowUp} className="text-gray-800 text-4xl md:text-6xl mt-2 md:mt-4" />
          </div>
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md text-center">
            <p className="text-gray-600 text-base md:text-lg">Get help now</p>
            <h2 className="text-2xl md:text-3xl font-bold">Support</h2>
            <FontAwesomeIcon icon={faLifeRing} className="text-gray-800 text-4xl md:text-6xl mt-2 md:mt-4" />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

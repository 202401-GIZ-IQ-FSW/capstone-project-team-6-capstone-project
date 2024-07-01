"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faTicketAlt, faArrowUp, faLifeRing, faUsers } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';


export default function App() {

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4 md:p-8">

        <div className="bg-white p-8 lg:p-20 mx-auto rounded-lg shadow-md">
          <div className="grid lg:grid-cols-6">
            
            <div className="lg:col-span-3 flex flex-col justify-center items-center lg:items-start mb-8 lg:mb-0">
              <h1 className="text-center lg:text-start text-xl lg:text-4xl font-bold mb-4 lg:mb-8">Submit your technical issues and queries easily!</h1>
              <p className="text-center lg:text-start text-gray-600 text-xs lg:text-lg mb-8 lg:mb-12">Securely submit and manage support tickets for technical issues</p>
           
              <Link href="/tickets/new-ticket">
                <span className="px-3 py-3 lg:px-4 lg:py-4 text-sm lg:text-lg tracking-wide rounded-md bg-gray-700 text-slate-200 font-semibold border-2 hover:bg-slate-500 focus:outline-none">
                  Submit new ticket
                </span>
              </Link>
            </div>
          
            <div className="-order-1 lg:order-1 my-6 lg:my-2 lg:col-span-2 lg:col-start-5 text-gray-700 text-8xl lg:text-[14rem] flex justify-center  lg:items-center">
              <FontAwesomeIcon icon={faFolder} />
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6 mt-8 lg:mt-12">

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-row items-center lg:justify-around justify-evenly">
            <div className="flex flex-col">
              <p className="text-gray-600 text-base lg:text-lg">Ticket activity</p>
              <h2 className="text-2xl lg:text-4xl font-bold">10K+</h2>
            </div>
              <FontAwesomeIcon icon={faUsers} className="text-gray-800 text-4xl lg:text-5xl mt-2 lg:mt-4" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-row items-center lg:justify-around justify-evenly">
            <div className="flex flex-col">
              <p className="text-gray-600 text-base lg:text-lg">Tickets submitted</p>
              <h2 className="text-2xl lg:text-4xl font-bold">100K+</h2>
            </div>
            <FontAwesomeIcon icon={faTicketAlt} className="text-gray-800 text-4xl lg:text-6xl mt-2 lg:mt-4" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-row items-center lg:justify-around justify-evenly">
            <div className="flex flex-col">
              <p className="text-gray-600 text-base lg:text-lg">Tickets resolved</p>
              <h2 className="text-2xl lg:text-4xl font-bold">500K+</h2>
            </div>
            <FontAwesomeIcon icon={faArrowUp} className="text-gray-800 text-4xl lg:text-6xl mt-2 lg:mt-4" />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-row items-center lg:justify-around justify-evenly">
            <div className="flex flex-col">
              <p className="text-gray-600 text-base lg:text-lg">Get help now</p>
              <h2 className="text-2xl lg:text-4xl font-bold">Support</h2>
            </div>
            <FontAwesomeIcon icon={faLifeRing} className="text-gray-800 text-4xl lg:text-6xl mt-2 lg:mt-4" />
          </div>

        </div>

      </div>
    </div>
  );
}

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-slate-200 px-4 py-8 mx-auto md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold text-black text-center md:text-left">Ticket Master</h1>
          <p className='text-black text-center'>Your ultimate ticket support solution!</p>
        </div>
        <div className="text-center md:text-right">
          <Link href="/tickets/new-ticket">
            <span className="block text-black hover:underline">Submit a Ticket</span>
          </Link>
          <Link href="/tickets">
            <span className="block text-gray-600 hover:underline">Track Tickets</span>
          </Link>
        </div>
      </div>
      <div className="container mx-auto text-center mt-4">
        <p className='text-black '>Ticket Master © 2024 All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

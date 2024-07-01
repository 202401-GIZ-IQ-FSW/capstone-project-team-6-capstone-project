import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h1 className="text-xl font-bold text-black ">TicketMaster</h1>
          <p className='text-black '>Your ultimate ticket support solution!</p>
        </div>
        <div className="text-right">
          <Link href="/submit-ticket">
            <span className="block text-black hover:underline">Submit a Ticket</span>
          </Link>
          <Link href="/track-ticket">
            <span className="block text-gray-600 hover:underline">Track Ticket</span>
          </Link>
        </div>
      </div>
      <div className="container mx-auto text-center mt-4">
        <p className='text-black '>TicketMaster © All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

import React from 'react';

const Pagination = ({ resultPerPage, totalResult, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalResult / resultPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-0 mb-6">

      <ul className="flex flex-row flex-wrap gap-2 justify-center">

        {/* Previous button */}
        <li
          className="flex items-center justify-center shrink-0 bg-gray-300 w-9 h-9 md:w-10 md:h-10 rounded-lg hover:bg-gray-400 cursor-pointer"
          onClick={() => currentPage > 1 && paginate(currentPage - 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-gray-500" viewBox="0 0 55.753 55.753">
            <path
              d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
              data-original="#000000"
            />
          </svg>
        </li>

        {/* Page Number buttons */}
        {pageNumbers.map(number => (
          <li
            key={number}
            onClick={() => paginate(number)}
            className={`flex items-center justify-center shrink-0 cursor-pointer text-base font-bold w-9 h-9 md:w-10 md:h-10 rounded-lg ${
              currentPage === number
                ? 'bg-gray-500 border-2 border-gray-500 text-white'
                : 'hover:bg-gray-400 border-2 text-[#333]'
            }`}
          >
            {number}
          </li>
        ))}

        {/* Next button */}
        <li
          className="flex items-center justify-center shrink-0 bg-gray-300 hover:bg-gray-400 w-9 h-9 md:w-10 md:h-10 rounded-lg cursor-pointer"
          onClick={() => currentPage < pageNumbers.length && paginate(currentPage + 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 fill-gray-500 rotate-180" viewBox="0 0 55.753 55.753">
            <path
              d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
              data-original="#000000"
            />
          </svg>
        </li>

      </ul>

    </nav>
  );
};

export default Pagination;

"use client"
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import RightSideContent from '../components/RightSideContent';
import { useAuth } from "../components/AuthContext";
import { useRouter } from 'next/navigation';
import TicketsTable from '../components/TicketsTable';
import Pagination from '../components/Pagination ';
import TicketsStatCircle from "../components/TicketsStatCircle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';



export default function ticketsPage() {
  const { signedIn, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hideSearch, setHideSearch] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [tableView, setTableView] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filters, setFilters] = useState({
    assignedTo: [],
    category: [],
    status: [],
    priority: [],
    searchQuery: "",
    searchField: "title"
  });
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (signedIn === false) {
      setLoading(false);
      setTimeout(() => {
        router.push('/signin'); // Adjust the path as needed
      }, 1000);
    }
  }, [router, signedIn]);

  // Fetch Tickets
  useEffect(() => {
    if (signedIn) {
      setLoading(true);
      setError(""); // Reset error

      const fetchTickets = async () => {
        try {
          const response = await fetch('http://localhost:3001/tickets', {
            credentials: 'include'
          });

          const data = await response.json();

          if (response.ok) {
            setTickets(data);
            setFilteredTickets(data);
          } else {
            setError(data.error);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchTickets();
    }
  }, [signedIn, user]);

  // Filter and Sort Tickets
  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...tickets];

      if (filters.assignedTo.length > 0) {
        filtered = filtered.filter(ticket => filters.assignedTo.includes(
          ticket.assignedUser?.name === user?.name ? "Assigned to me" : !ticket.assignedUser ? "None" : ""
        ));
      }

      if (filters.category.length > 0) {
        filtered = filtered.filter(ticket => filters.category.includes(ticket.category));
      }

      if (filters.status.length > 0) {
        filtered = filtered.filter(ticket => filters.status.includes(ticket.status));
      }

      if (filters.priority.length > 0) {
        filtered = filtered.filter(ticket => filters.priority.includes(ticket.priority));
      }

      if (filters.searchQuery) {
        filtered = filtered.filter(ticket => {

          let fieldValue;

          if ( filters.searchField === "user" ) {
            fieldValue = ticket.user.name;
          } else if ( filters.searchField === "assigned to" && ticket.assignedUser ) {
            fieldValue = ticket?.assignedUser?.name;
          } else {
            fieldValue = ticket[filters.searchField];
          }
          
          const query = filters.searchQuery.toLowerCase();

          if (typeof fieldValue === 'string') {
            return fieldValue.toLowerCase().includes(query);
          } else if (typeof fieldValue === 'number') {
            return fieldValue.toString().includes(query);
          }

          return false;
        });
      }

      filtered = filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (typeof aValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (sortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });

      setFilteredTickets(filtered);

      // Check if current page is within the valid range 
      // And Reset the current page if there are no results for the current page
      const totalPages = Math.ceil(filtered.length / (tableView ? 10 : 5));
      if (currentPage > totalPages) {
        setCurrentPage(totalPages > 0 ? totalPages : 1);
      } else if (filtered.length === 0) {
        setCurrentPage(1);
      }

    };

    applyFilters();
    // console.log("filters", filters)
  }, [filters, tickets, sortField, sortOrder, currentPage, tableView]);

  if (signedIn === null || loading) {
    return (
      <div className='h-screen'>
        <div className="flex justify-center items-center m-52">
          <div className="pageLoader"></div>
        </div>
      </div>
    );
  }

  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

   // Pagination
   const ticketsPerPage = tableView ? 10 : 5;
   const indexOfLastTicket = currentPage * ticketsPerPage;
   const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
   const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
 
   const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      {signedIn === false && 
        <div className="h-screen px-5 py-28">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only signed in users can view this page</h1>
            <p>Redirecting to sign in page......</p>
          </div>
        </div>
      }
      {signedIn === true && 
        <>
          {/* View For Mobile and Tablet */}
          <div className="flex xl:hidden">
            {/* Search Sidebar */}
            { !hideSearch && 
              <div className="flex justify-center w-full bg-gray-50">

                <div className="bg-gray-100 h-auto w-auto flex flex-col justify-center py-4 px-4 space-y-4 my-4 mx-4 drop-shadow-lg rounded-lg">
                  
                  {/* Search */}
                  <Sidebar 
                    onFiltersChange={setFilters} 
                    userRole={user?.role} 
                    onSortChange={handleSortChange}
                    sortField={sortField}
                    sortOrder={sortOrder}
                  />

                  {/* Button for Search */}
                  <button className="btn border-gray-900" onClick={ () => setHideSearch(true) }>
                    Search
                  </button>

                </div>
              </div>
            }

            {/* Tickets View */}
            { hideSearch && 
              <div className="flex-1 w-screen xl:w-auto pt-6 pl-2 pr-2 bg-white">

                {/* Button for Search, Table View and Stats */}
                <div className="flex flex-row pl-4 pr-4 gap-2">

                  {/* Button for Search */}
                  <button className="btn w-[32.7%] text-xs lg:text-base border-gray-900" onClick={ () => setHideSearch(false) }>
                    Search
                  </button>
                  
                  {/* Button for Table View */}
                  <button className="btn w-[32.7%] text-xs lg:text-base border-gray-900" onClick={ () => setTableView(!tableView) }>
                    {tableView ? "Card View" : "Table View"}
                  </button>

                  {/* Button for Stats */}
                  <button className="btn w-[32.7%] text-xs lg:text-base border-gray-900 text-nowrap" onClick={ () => setShowStats(!showStats) }>
                    {showStats ? "Hide Stats" : "Show Stats"}
                    <FontAwesomeIcon icon={ showStats ? faChevronUp : faChevronDown } className="pt-0.5" />
                  </button>

                </div>

                {/* Stats View */}
                { showStats &&
                  <TicketsStatCircle tickets={tickets} />
                }

                { !tableView ?
                    // Card View
                    <RightSideContent tickets={currentTickets} filteredTickets={filteredTickets} errorMessage={error} user={user} />
                  :
                  // Table View
                    <TicketsTable tickets={currentTickets} filteredTickets={filteredTickets} errorMessage={error} user={user} />
                }

                {/* Pagination */}
                { filteredTickets.length > 0  &&
                  <Pagination 
                  resultPerPage={ticketsPerPage} 
                  totalResult={filteredTickets.length} 
                  paginate={paginate}
                  currentPage={currentPage}
                  />
                }

              </div>
            }
          </div>

          {/* View For Laptop and Desktop */}
          <div className="hidden xl:flex">

            {/* Search Sidebar */}
            <div className="bg-gray-100 w-[18%] flex flex-col p-4 pt-6 space-y-4">
              <Sidebar 
                onFiltersChange={setFilters} 
                userRole={user?.role} 
                onSortChange={handleSortChange}
                sortField={sortField}
                sortOrder={sortOrder}
              />
            </div>

            {/* Tickets View */}
            <div className="flex-1 pt-6 pl-2 pr-4 bg-white">

              {/* Button for Table View and Stats */}
              <div className="flex flex-row pl-4 pr-4 gap-4">

                {/* Button for Table View */}
                <button className="btn text-base w-[49%] border-gray-900" onClick={ () => setTableView(!tableView) }>
                  {tableView ? "Card View" : "Table View"}
                </button>

                {/* Button for Stats */}
                <button className="btn text-base w-[49%] border-gray-900 text-nowrap" onClick={ () => setShowStats(!showStats) }>
                  { showStats ? "Hide Stats" : "Show Stats" }
                  <FontAwesomeIcon icon={ showStats ? faChevronUp : faChevronDown } className="pt-0.5 pl-2" />
                </button>

              </div>

              {/* Stats View */}
              { showStats &&
                <TicketsStatCircle tickets={tickets} />
              }

              { !tableView ? 
                  // Card View
                  <RightSideContent tickets={currentTickets} filteredTickets={filteredTickets} errorMessage={error} user={user} />
                :
                  // Table View
                  <TicketsTable tickets={currentTickets} filteredTickets={filteredTickets} errorMessage={error} user={user} />
              }

              {/* Pagination */}
              { filteredTickets.length > 0  &&
                <Pagination 
                resultPerPage={ticketsPerPage} 
                totalResult={filteredTickets.length} 
                paginate={paginate}
                currentPage={currentPage}
                />
              }

            </div>
          </div>
        </>
      }
    </>
  );
}

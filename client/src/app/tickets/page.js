"use client"
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import RightSideContent from '../components/RightSideContent';
import { useAuth } from "../components/AuthContext";
import { useRouter } from 'next/navigation';
import TicketsTable from '../components/TicketsTable';


export default function ticketsPage() {
  const { signedIn, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [hideSearch, setHideSearch] = useState(true);
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

  useEffect(() => {
    if (signedIn === false) {
      setTimeout(() => {
        router.push('/signin'); // Adjust the path as needed
      }, 1000);
    }
  }, [router, signedIn]);

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
  }, [signedIn]);

  useEffect(() => {
    const applyFilters = () => {
      let filtered = tickets;

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

      setFilteredTickets(filtered);
    };

    applyFilters();
    // console.log("filters", filters)
  }, [filters, tickets]);

  if (signedIn === null || loading) {
    return (
      <div className="flex justify-center items-center m-52">
        <div className="pageLoader"></div>
      </div>
    );
  }

  return (
    <>
      {signedIn === false && 
        <div className="px-5 py-40">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only signed in users can view this page</h1>
            <p>Redirecting to sign in page ......</p>
          </div>
        </div>
      }
      {signedIn === true && 
        <>
          {/* View For Mobile and Tablet */}
          <div className="flex xl:hidden">
            {/* Search Sidebar */}
            {!hideSearch && 
              <div className="flex justify-center w-full bg-gray-50">
                <div className="bg-gray-100 h-auto w-auto flex flex-col justify-center py-4 px-4 space-y-4 my-4 mx-4 drop-shadow-lg rounded-lg">
                  <Sidebar onFiltersChange={setFilters} userRole={user?.role} />
                  {/* Button for Search */}
                  <button className="btn border-gray-900" onClick={ () => setHideSearch(true) }>Search</button>
                </div>
              </div>
            }
            {/* Tickets View */}
            {hideSearch && 
              <div className="flex-1 w-screen xl:w-auto pt-6 pl-2 pr-2 bg-white">
                <div className="flex flex-row pl-4 pr-4 gap-2">
                  {/* Button for Search */}
                  <button className="btn w-1/2 border-gray-900" onClick={ () => setHideSearch(false) }>Search</button>
                  {/* Button for Table View */}
                  <button className="btn w-1/2 border-gray-900" onClick={ () => setTableView(!tableView) }>
                    {tableView ? "Card View" : "Table View"}
                  </button>
                </div>
                { !tableView ?
                    // Card View
                    <RightSideContent tickets={filteredTickets} errorMessage={error} user={user} />
                  :
                  // Table View
                    <TicketsTable tickets={filteredTickets} errorMessage={error} user={user} />
                }
              </div>
            }
          </div>

          {/* View For Laptop and Desktop */}
          <div className="hidden xl:flex">
            {/* Search Sidebar */}
            <div className="bg-gray-100 h-full w-2/12 flex flex-col p-4 pt-6 space-y-4">
              <Sidebar onFiltersChange={setFilters} userRole={user?.role} />
            </div>
            {/* Tickets View */}
            <div className="flex-1 pt-6 pl-2 pr-4 bg-white">
              <div className="pl-4 pr-4">
                {/* Button for Table View */}
                <button className="btn w-full border-gray-900" onClick={ () => setTableView(!tableView) }>
                  {tableView ? "Card View" : "Table View"}
                </button>
              </div>
              { !tableView ? 
                  // Card View
                  <RightSideContent tickets={filteredTickets} errorMessage={error} user={user} />
                :
                  // Table View
                  <TicketsTable tickets={filteredTickets} errorMessage={error} user={user} />
              }
            </div>
          </div>
        </>
      }
    </>
  );
}

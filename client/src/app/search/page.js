"use client"
import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import RightSideContent from '../components/RightSideContent';
import { useAuth } from "../components/AuthContext";
import { useRouter } from 'next/navigation';

export default function searchPage() {
  const { signedIn, user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [filters, setFilters] = useState({
    status: [],
    category: [],
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

      if (filters.status.length > 0) {
        filtered = filtered.filter(ticket => filters.status.includes(ticket.status));
      }

      if (filters.category.length > 0) {
        filtered = filtered.filter(ticket => filters.category.includes(ticket.category));
      }

      if (filters.priority.length > 0) {
        filtered = filtered.filter(ticket => filters.priority.includes(ticket.priority));
      }

      if (filters.searchQuery) {
        filtered = filtered.filter(ticket => {
          let fieldValue;
          if (filters.searchField === "user") {
            fieldValue = ticket.user.name;
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
          <div className="flex"> 
            <Sidebar onFiltersChange={setFilters} userRole={user?.role} />
            <div className="flex-1 p-8 bg-white">
              <RightSideContent tickets={filteredTickets} errorMessage={error} />
            </div>
          </div>
        </>
      }
    </>
  );
}

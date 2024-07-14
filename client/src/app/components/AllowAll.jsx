"use client"
import { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";


export default function AllowAll() {

  const [allow, setAllow] = useState("");
  const { signedIn, user } = useAuth();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

//   useEffect(() => {
//     if (signedIn === false) {
//       setLoading(false);
//       setTimeout(() => {
//         router.push('/signin');
//       }, 1000);
//     } else if ( signedIn === true && !roles.includes(user?.role) ) {
//       setTimeout(() => {
//         router.push('/');
//       }, 1000);
//     }
//   }, [router, signedIn, user]);

  // Fetch Users
  useEffect(() => {
    if (signedIn) {
      setMessage(""); // Reset message
      setError(""); // Reset error
      fetchAllow();
    };
  }, [signedIn, user]);

  const fetchAllow = async () => {
    try {
      const response = await fetch('http://localhost:3001/allow-all', {
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok) {
        setAllow(data);
      } else {
        setError(data.error);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    } 
  };

  const handleUpdateAllow = async () => {
    setMessage(""); // Reset message
    setError(""); // Reset error

    try {
      const response = await fetch(
        `http://localhost:3001/allow-all`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify( { allowAll: allow.allowAll === "Yes" ? "No" : "Yes" } ),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);

        setTimeout(() => {
          setMessage("");
        }, 2000);

        fetchAllow();
      } else {
        // Handle server errors
        setError(data.error);
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (error) {
      setError(error);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
    // console.log("Updating Allow All:", allow);
  };

  return (
    <>
      {signedIn === true &&
        <div className="flex flex-col p-4 pb-0 mt-6 gap-2">

          <div className="flex flex-row items-center-center gap-4">

            <div className="flex justify-center">
              <h2 className="text-lg lg:text-xl font-bold text-gray-800">
                Allow All Users:
                <span className="text-gray-600"> {allow.allowAll} </span>
              </h2>
            </div>

            <div className="flex items-center pt-0.5">
              <button
                className={`toggle-button ${allow.allowAll === "Yes" ? "toggle-on" : "toggle-off"}`}
                onClick={handleUpdateAllow}
              >
                <span className="toggle-thumb"></span>
              </button>
            </div>

          </div>

          <p>{message}</p>
          <p>{error}</p>
        </div>
      }
    </>
  );
};

"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from "../../../components/AuthContext";

export default function deleteUserPage({params}) {
  const { user, setUser, signedIn, setSignedIn } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [dataReady, setDataReady] = useState(false);

  const userId = params.id;
  const roles = ["superAdmin", "admin"];

  useEffect(() => {
    if (signedIn === false && !dataReady) {
      setLoading(false);
      setTimeout(() => {
        console.log("signedIn === false use effect delete user page")
        router.push("/signin");
      }, 1000);
    } 
    else if (signedIn === true) {setDataReady(true)}
  }, [router, signedIn]);

  useEffect(() => {

    if (dataReady && signedIn) {
      setMessage(""); // Reset message
      setError(""); // Reset error
      setLoading(true);

      deleteUser();
    }
    // console.log("use effect delete user page")
  }, [dataReady]);

  const deleteUser = async () => {
    try {
      let response;
      const isLoggedUser = userId === user?._id;

      if (roles.includes(user?.role)) {
        response = await fetch(`http://localhost:3001/admin/view-user/${userId}`, { method: 'DELETE', credentials: 'include' });
      } else {
        response = await fetch(`http://localhost:3001/user/profile`, { method: 'DELETE', credentials: 'include' });
      }
      
      const data = await response.json();

      if (response.ok) {
        setMessage(data.message)
        setTimeout(() => {
          router.push('/');
        }, 1000);
        
        if (isLoggedUser) {
          setUser(null);
          setSignedIn(null);
        }
      } else {
        // Handle server errors
        setError(data.error);
        setTimeout(() => {
          console.log("response.error use effect delete user page")
          router.push('/'); 
        }, 1000);
      }

    } catch (error) {
      setError(error);
    } 
    finally {
      setLoading(false);
    }
  };

  if (signedIn === null || loading) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center m-52">
          <div className="pageLoader"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      { (signedIn === false && !dataReady) && 
        <div className="h-screen px-5 py-28">
          <div className="flex flex-col items-center justify-center gap-6 lg:text-lg font-semibold">
            <h1>Only signed in users can view this page</h1>
            <p>Redirecting to sign in page......</p>
          </div>
        </div>
      }
      { (signedIn === true || (signedIn === false && dataReady)) && 
        (<div className="bg-gray-50 w-full flex justify-center py-20 px-6">
          {message && 
            <div className="h-screen flex flex-col font-semibold text-center">
              <h1>Deleting ...</h1>
              <p>{message}</p>
            </div>}
          {!message && error && <div className="h-screen font-semibold"><p>{error}</p></div>}
        </div>)
      }
    </>
  );
}

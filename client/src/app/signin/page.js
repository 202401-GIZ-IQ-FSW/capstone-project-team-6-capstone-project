"use client";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { useAuth } from "../components/AuthContext";

export default function signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize router for navigation
  const { setSignedIn } = useAuth();

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Reset message
    setError(""); // Reset error

    try {
      const response = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setSignedIn(true);
        // Successful login, navigate to home page
        setTimeout(() => {
          router.push('/'); // Adjust the path as needed
        }, 1000); // Delay navigation to show the message for 2 seconds

      } else {
        // Handle server errors
        setError(data.error);
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-col w-full h-svh">
      <h1>Login</h1>
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
      <form className="flex flex-col gap-3 w-1/2" onSubmit={onSubmit}>
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2"
        />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="p-2"
        />
        <button type="submit" className="bg-slate-400 rounded-md p-1">Submit</button>
      </form>
    </div>
  );
};

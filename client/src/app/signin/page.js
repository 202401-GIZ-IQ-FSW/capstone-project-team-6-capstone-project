"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { useAuth } from "../components/AuthContext";
import Link from 'next/link';


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe , setRememberMe ] = useState(false)
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize router for navigation
  const { signedIn, setSignedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = async (event) => {
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
        body: JSON.stringify({ email, password, rememberMe })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setSignedIn(true); // Update signed-in state
        // Save signed-in state to local storage
        // localStorage.setItem('signedIn', 'true');

        // Successful login, navigate to home page
        setTimeout(() => {
          router.push('/');
        }, 1000); // Delay navigation to show the message for 1 seconds

      } else {
        // Handle server errors
        setError(data.error);
      }
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    if (signedIn && !message) {
      setError("User is already signed in");
      setTimeout(() => {
        router.push('/');
      }, 1000);
    }
  }, [router, signedIn]);

  return (
    <main>
      <div className="bg-gray-50 font-[sans-serif]">
        <div className="flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-md w-full">
            <div className="p-8 rounded-2xl bg-white shadow">
              <h1 className="text-gray-800 text-center text-2xl lg:text-4xl font-bold pb-2">Sign in</h1>
              <p className="text-gray-800 text-center text-xs lg:text-sm">Sign in to manage your support tickets</p>
              
              {message && <div className="flex justify-center m-4 p-1 bg-emerald-300 rounded-md"><br/><p>{message}</p><br/></div>}
              {error && <div className="flex justify-center m-4 p-1 bg-red-500 rounded-md"><br/><p>{error}</p><br/></div>}

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-gray-800 text-xs lg:text-sm mb-2 block">Enter your email address</label>
                  <div className="relative flex items-center">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="email@example.com" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                        </clipPath>
                      </defs>
                      <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                      <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                      <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                      </g>
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-xs lg:text-sm mb-2 block">Enter your password</label>
                  <div className="relative flex items-center">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type={showPassword ? "text" : "password"} required className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600" placeholder="*****************" />
                        {showPassword ? (
                          <svg onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#bbb" viewBox="0 0 24 24" strokeWidth="1.5" className="w-4 h-4 absolute right-4 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        ) : (
                          <svg onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#bbb" viewBox="0 0 24 24" strokeWidth="1.5" className="w-4 h-4 absolute right-4 cursor-pointer">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input onChange={(e) => setRememberMe(e.target.checked)} id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    <label className="ml-3 block text-xs lg:text-sm text-gray-800">
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="mt-8">
                  <button type="submit" className="w-full py-3 px-4 text-sm lg:text-base tracking-wide rounded-md text-gray-800 font-semibold border-2 hover:bg-slate-400 focus:outline-none">
                    Sign in
                  </button>
                </div>
                <p className="text-gray-800 text-sm mt-8 text-center">Don't have an account? <Link href="/signup" className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold">Sign up here</Link></p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

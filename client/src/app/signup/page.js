"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter for navigation
import { useAuth } from "../components/AuthContext";
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';


export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); // Initialize router for navigation
  const { signedIn, setSignedIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage(""); // Reset message
    setError(""); // Reset error

    try {
      const response = await fetch('http://localhost:3001/user/signup', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, username, email, password, confirmPassword })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setSignedIn(true); // Update signed-in state
        // Save signed-in state to local storage
        // localStorage.setItem('signedIn', 'true');

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

  useEffect(() => {
    if (signedIn && !message) {
      setError("User is already signed in");
      setTimeout(() => {
        router.push('/'); // Adjust the path as needed
      }, 1000);
    }
  }, [router, signedIn]);

  return (
    <main>
      <div className="font-[sans-serif] bg-white flex justify-center items-center mx-auto p-4">
        <div className="grid lg:grid-cols-8 items-center shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-xl overflow-hidden">
          <div className="lg:col-span-3 lg:col-start-2 py-10 px-6 flex flex-col justify-center items-center">
            
            <h1 className="text-gray-800 text-3xl lg:text-5xl font-bold pb-2 text-center">Join our platform</h1>
            <p className="text-gray-800 text-xs lg:text-sm text-center">Provide your details to get started with support</p>

            <form onSubmit={onSubmit} className=" py-10 px-6 flex flex-col justify-center items-center">

              <div className="space-y-6 max-w-md lg:w-full">

                {message && <div className="flex justify-center mb-6 p-2 bg-emerald-300 rounded-md"><br/><p>{message}</p><br/></div>}
                {error && <div className="flex justify-center mb-6 p-2 bg-red-500 rounded-md"><br/><p>{error}</p><br/></div>}

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Full name *</label>
                  <div className="relative flex items-center">
                    <input name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="text-gray-800 bg-white border border-gray-300 w-full text-xs lg:text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="First Last" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                      <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                      <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Username *</label>
                  <div className="relative flex items-center">
                    <input name="username" type="text" value={username} onChange={(e) => setUserName(e.target.value)} required className="text-gray-800 bg-white border border-gray-300 w-full text-xs lg:text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="tech_pro123" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 24 24">
                      <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                      <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-xs lg:text-sm mb-2 block">E-mail *</label>
                  <div className="relative flex items-center">
                    <input name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-2.5 rounded-md outline-blue-500" placeholder="email@example.com" />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-4 h-4 absolute right-4" viewBox="0 0 682.667 682.667">
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                        </clipPath>
                      </defs>
                      <g clip-path="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                        <path fill="none" stroke-miterlimit="10" stroke-width="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                        <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                      </g>
                    </svg>
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-xs lg:text-sm mb-2 block">Password</label>
                  <div className="relative flex items-center">
                    <input value={password} onChange={(e) => setPassword(e.target.value)} name="password" type={showPassword ? "text" : "password"} required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-10 py-2.5 rounded-md outline-blue-500" placeholder="***************************" />
                    <FontAwesomeIcon icon={faLock} className="w-4 h-4 absolute left-4 text-gray-700"/>
                    {showPassword ? (
                      <svg onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#bbb" viewBox="0 0 24 24" stroke-width="1.5" className="w-4 h-4 absolute right-4 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg onClick={() => setShowPassword(!showPassword)} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#bbb" viewBox="0 0 24 24" stroke-width="1.5" className="w-4 h-4 absolute right-4 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-xs lg:text-sm mb-2 block">Confirm password *</label>
                  <div className="relative flex items-center">
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} name="confirmPassword" type={showConfirmPassword ? "text" : "password"} required className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-10 py-2.5 rounded-md outline-blue-500" placeholder="***************************" />
                    <FontAwesomeIcon icon={faLock} className="w-4 h-4 absolute left-4 text-gray-700"/>
                    {showConfirmPassword ? (
                      <svg onClick={() => setShowConfirmPassword(!showConfirmPassword)} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#bbb" viewBox="0 0 24 24" stroke-width="1.5" className="w-4 h-4 absolute right-4 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      <svg onClick={() => setShowConfirmPassword(!showConfirmPassword)} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#bbb" viewBox="0 0 24 24" stroke-width="1.5" className="w-4 h-4 absolute right-4 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </div>
                </div>

                <div className="mb-2 text-gray-800 text-xs lg:text-sm">
                  <p>By Signing up you agree to our Terms and Conditions and our Privacy Policy</p>
                </div>

                <button type="submit" className="w-full py-3 px-4 text-sm lg:text-base tracking-wide rounded-md text-gray-800 font-semibold border-2 hover:bg-slate-400 focus:outline-none">
                  Sign up
                </button>

                <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <Link href="/signin" className="text-blue-600 font-semibold hover:underline ml-1">Sign in here</Link></p>
            
              </div>
            </form>
          </div>

          {/* image laptop-desk */}
          <div className="-order-1 lg:order-1 lg:col-start-6 lg:col-span-3 h-80 lg:h-full w-full bg-[url('/laptop-desk.png')] bg-cover bg-no-repeat bg-center before:content-['']">
          </div>

        </div>
      </div>
    </main>
  )
};

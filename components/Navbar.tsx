"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/AuthContext";

const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  // Function to handle logout
  const handleLogout = () => {
    logout(); 
    localStorage.removeItem("token"); 
    router.push("/");
  };

  return (
    <div className="bg-gray-800">
    <ul className="flex justify-between items-center px-10 py-4">
      <div>
        <Link href="/">
          <li className="text-white text-lg font-semibold cursor-pointer hover:text-gray-300 transition duration-300">Home</li>
        </Link>
      </div>
      <div className="flex gap-4">
        {isLoggedIn ? (
          <>
            <Link href="/dashboard">
              <li className="text-white text-lg font-semibold cursor-pointer hover:text-gray-300 transition duration-300">Active_Sessions</li>
            </Link>
            <Link href="/sessions">
              <li className="text-white text-lg font-semibold cursor-pointer hover:text-gray-300 transition duration-300">Activity</li>
            </Link>
            <li onClick={handleLogout} className="text-white text-lg font-semibold cursor-pointer hover:text-gray-300 transition duration-300">Logout</li>
          </>
        ) : (
          <>
            <Link href="/login">
              <li className="text-white text-lg font-semibold cursor-pointer hover:text-gray-300 transition duration-300">Login</li>
            </Link>
            <Link href="/register">
              <li className="text-white text-lg font-semibold cursor-pointer hover:text-gray-300 transition duration-300">Register</li>
            </Link>
          </>
        )}
      </div>
    </ul>
  </div>
  
  );
};

export default Navbar;

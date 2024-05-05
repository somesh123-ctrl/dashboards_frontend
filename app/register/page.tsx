"use client"
import React, { useState, FormEvent } from "react";
import Link from "next/link";
import axios from "axios";

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // State for loading indicator

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    try {
      const response = await axios.post("https://dashboards-backend-1.onrender.com/api/auth/register", {
        email,
        password,
      });
  
      if (response.status === 201) {
        alert("Registered successfully!");
        window.location.href = "/login"; // Redirect to login page
      } else {
        console.error("Registration failed:", response.data.message);
        setError(response.data.message);
      }
    } catch (error: any) {
      console.error("Error during registration:", error.message);
      setError("Server Error");
    } finally {
      setLoading(false); // Set loading to false when request is complete
    }
  };
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 text-gray-800 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-gray-100 text-gray-800 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Password"
            required
          />
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 ${loading && "opacity-50 cursor-not-allowed"}`}
            disabled={loading} // Disable button during loading
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link href="/login">
          <p className="block text-center text-blue-500 hover:underline mt-2">Already have an account? Login</p>
        </Link>
      </div>
    </div>
  );
};

export default Register;

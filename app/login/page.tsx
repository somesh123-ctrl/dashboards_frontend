"use client"
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation"; 
import { useAuth } from "../AuthContext";

const Login: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [sendingOTP, setSendingOTP] = useState<boolean>(false);
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); // Added loading state

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the login button is clicked
    try {
      if (!otpSent) {
        setSendingOTP(true);

        const response = await axios.post(
          "https://dashboards-backend-1.onrender.com/api/auth/sendotp",
          { email }
        );

        if (response.status === 200) {
          setOtpSent(true);
          setSendingOTP(false);
          console.log("OTP sent successfully");
        } else {
          console.error("Failed to send OTP:", response.data.message);
          setError(response.data.message);
          setSendingOTP(false);
        }
      } else {
        const response = await axios.post(
          "https://dashboards-backend-1.onrender.com/api/auth/login",
          {
            email,
            password,
            otp,
          }
        );

        if (response.status === 200) {
          const sessionId = response.data.loginSession._id;
          const userActivityId = response.data.loginLogoutActivity._id;
          localStorage.setItem("token", response.data.token);
          login(sessionId, userActivityId);
          router.push("/homepage");
          alert("Login successful");
        } else {
          console.error("Login failed:", response.data.message);
          setError(response.data.message);
        }
      }
    } catch (error: any) {
      console.error("Error during login:", error.message);
      setError("Server Error");
    } finally {
      setLoading(false); // Reset loading when the response is received
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
          Welcome Back!
        </h1>
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
          {!otpSent && (
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 ${
                sendingOTP && "opacity-50 cursor-not-allowed"
              }`}
              disabled={sendingOTP || loading} // Disable the button when sending OTP or loading
            >
              {sendingOTP ? "Sending OTP..." : "Send OTP"}
            </button>
          )}
          {otpSent && (
            <>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-100 text-gray-800 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
                required
              />
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-gray-100 text-gray-800 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="OTP"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
                disabled={loading} // Disable the button when loading
              >
                {loading ? "Loading..." : "Sign In"}
              </button>
            </>
          )}
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <a
          href="/register"
          className="block text-center text-blue-500 hover:underline mt-2"
        >
          New here? Sign Up
        </a>
      </div>
    </div>
  );
};

export default Login;

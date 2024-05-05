"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Session {
  _id: string;
  email: string;
  deviceType: string;
  createdAt: string;
  logoutAt: string;
}

const Sessions: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // State for loading indicator

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      // Fetch sessions for the current user
      const token = localStorage.getItem("token");
      const response = await axios.get("https://dashboards-backend-1.onrender.com/api/auth/useractivity", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setSessions(response.data.sessions);
      } else {
        console.error("Failed to fetch sessions");
      }
    } catch (error:any) {
      console.error("Error fetching sessions:", error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  return (
    <div className="dashboard bg-gray-100 min-h-screen py-12">
      <h1 className="text-4xl font-semibold text-gray-800 mb-12 text-center">Dashboard</h1>
      {loading ? (
        <p>Loading...</p> // Render loading indicator while fetching sessions
      ) : (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session, index) => (
            <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300" key={session._id}>
              <div className={`bg-${session._id === sessions[sessions.length - 1]._id ? 'blue' : 'gray'}-100 px-6 py-4 border-l-4 border-${session._id === sessions[sessions.length - 1]._id ? 'blue' : 'gray'}-500`}>
                <p className="text-lg font-semibold mb-4 text-blue-800">Session Details</p>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <p className="text-gray-600"><strong>Email:</strong> {session.email}</p>
                  <p className="text-gray-600"><strong>Device Type:</strong> {session.deviceType}</p>
                  <p className="text-gray-600"><strong>Logged In At:</strong> {new Date(session.createdAt).toLocaleString()}</p>
                  {/* <p className="text-gray-600"><strong>Logged Out At:</strong> {session.logoutAt}</p> */}
                  {session.logoutAt ? <p className="text-gray-600"><strong>Logged Out At:</strong>{new Date(session.logoutAt).toLocaleString()}</p> : <p className="text-gray-600"><strong>Logged Out At:</strong> Not logged out yet</p>}

                </div>
                {index === sessions.length - 1 && (
                  <p className="text-blue-500 mt-4">Active Session</p>
                )}
              </div>
              <div className="bg-gray-200 px-4 py-2">
                <p className="text-gray-800 text-sm">Session ID: {session._id}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sessions;

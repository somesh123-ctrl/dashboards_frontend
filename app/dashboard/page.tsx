"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Session {
  _id: string;
  email: string;
  deviceType: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true); // Set loading to true before fetching sessions
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("https://dashboards-backend-1.onrender.com/api/auth/sessions", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setSessions(response.data.sessions);
      } else {
        console.error("Failed to fetch sessions");
      }
    } catch (error: any) {
      console.error("Error fetching sessions:", error.message);
    } finally {
      setLoading(false); // Set loading to false after fetching sessions
    }
  };

  const signOutSession = async (sessionId: string) => {
    setLoading(true); // Set loading to true before signing out session
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`https://dashboards-backend-1.onrender.com/api/auth/sessions/${sessionId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setSessions(prevSessions => prevSessions.filter(session => session._id !== sessionId));
        console.log("Session sign-out successful");
      } else {
        console.error("Failed to sign out session");
      }
    } catch (error: any) {
      console.error("Error signing out session:", error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="dashboard bg-gray-100 min-h-screen py-12">
      <h1 className="text-4xl font-semibold text-gray-800 mb-12 text-center">Dashboard</h1>
      {loading ? ( // Render loading indicator when loading is true
        <div className="text-center">Loading...</div>
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
                </div>
                {index === sessions.length - 1 && (
                  <p className="text-blue-500 mt-4">Active Session</p>
                )}
              </div>
              <div className="bg-gray-200 px-4 py-2">
                <p className="text-gray-800 text-sm">Session ID: {session._id}</p>
                <button className="text-red-500 mt-2" onClick={() => signOutSession(session._id)}>Sign Out</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

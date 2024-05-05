"use client"
import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (sessionId: string , userActivityId : string) => void; 
  logout: () => void;
  latestSessionId: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [latestSessionId, setLatestSessionId] = useState<string | null>(null);
  const [userActivityId, setUserActivityId] = useState<string | null>(null);

  const login = (sessionId: string, userActivityId: string) => {
    setIsLoggedIn(true);
    setLatestSessionId(sessionId); 
    setUserActivityId(userActivityId); 

    console.log(sessionId)
    console.log(userActivityId)
  };

  const logout = async () => {
    setIsLoggedIn(false);

    if (userActivityId) {
      try {
        const token = localStorage.getItem("token");
        const response1 = await axios.put(`https://dashboards-backend-1.onrender.com/api/auth/sessions/${userActivityId}/logout`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response1.status === 200) {
          console.log("Logged out successfully");
        } else {
          console.error("Failed to delete latest session");
        }
      } catch (error:any) {
        console.error("Error deleting latest session:", error.message);
      }
    }

    if (latestSessionId) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`https://dashboards-backend-1.onrender.com/api/auth/sessions/${latestSessionId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.status === 200) {
          console.log("Latest session deleted successfully");
        } else {
          console.error("Failed to delete latest session");
        }
      } catch (error:any) {
        console.error("Error deleting latest session:", error.message);
      }
    }
    setLatestSessionId(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, latestSessionId }}>
      {children}
    </AuthContext.Provider>
  );
};

// pages/index.js or pages/index.tsx
"use client"
import React, { useEffect } from 'react';

const Homepage = () => {
   

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-4">Welcome to Dashboard Project</h1>
      <p className="text-lg mb-4">
        This Dashboard project provides real-time insights into user login and logout activities. Built with a stack comprising Next.js, Node.js, TypeScript, Express, and MongoDB, this fully functional website offers a seamless user experience. Leveraging the power of Next.js for efficient rendering and routing, alongside Node.js and Express for server-side logic, the application ensures high performance and scalability. TypeScript adds strong typing and enhances code maintainability, while MongoDB serves as the database for storing user data. With its intuitive interface and comprehensive features, this Dashboard project offers administrators valuable insights into user interactions and facilitates effective management of user sessions.
      </p>
     
    </div>
  );
};

export default Homepage;

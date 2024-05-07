# Dashboard Project Documentation
## Overview
The Dashboard Project is a web application designed to provide real-time
insights into user login and logout activities. It offers administrators a
comprehensive view of user interactions and facilitates effective management
of user sessions. Built with a technology stack comprising Next.js, Node.js,
TypeScript, Express, and MongoDB, the Dashboard Project ensures high
performance, scalability, and a seamless user experience.
## Features
### Authentication
Login: Users can securely log in to their accounts using their email address and
password. Upon successful login, users receive an authentication token.
Registration: New users can create an account by providing their email address
and password. Upon successful registration, users are redirected to the login
page.
Logout: Users can log out of their accounts, terminating their current session.
Email Notifications: User will get otp on their email and also receive mail for
new login.
### Dashboard
#Active Sessions: Administrators can view active user sessions, including details
such as email, device type, and login time. They can also sign out users from
individual sessions.
#User Activity: Administrators can track user login and logout activities,
providing insights into user interactions and session durations.
### Navigation
#Navbar: A navigation bar provides easy access to different sections of the
application, including the homepage, login, registration, active sessions, and
user activity.
## Project Structure
The Dashboard Project follows a modular structure, with separate components
for authentication, dashboard functionalities, navigation, and API calls. Key
components include:
#AuthContext: Manages user authentication state and provides context for
login, logout, and session management.
#Login: Handles user login, including sending OTP (one-time password) for twofactor authentication.
#Register: Manages user registration, allowing new users to create accounts
securely.
#Dashboard: Displays active user sessions and provides options to sign out users
from individual sessions.
#Sessions: Displays user login and logout activities, providing insights into user
interactions and session durations.
#Navbar: Provides navigation links for easy access to different sections of the
application.
## Getting Started
To run the Dashboard Project locally, follow these steps:
1. Clone the project repository from GitHub.
2. Install dependencies using npm or yarn.
3. Set up environment variables, including MongoDB connection details and
API endpoints.
4. Run the development server using the appropriate command (`npm run dev`
or `yarn dev`).
5. Access the application in your web browser using the provided localhost
URL.


import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const PrivateRoute = ({ Component, redirectPath = '/login' }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state
  const isDarkTheme = false;

  useEffect(() => {
    checkAuth();
  }, []); // Empty dependency array ensures checkAuth is only called once

  async function checkAuth() {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false); // Set loading to false after checking
        return;
      }

      const response = await fetch('http://localhost:3000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Assuming you're passing the token
        },
      });
      const responseData = await response.json();

      console.log(responseData.message);

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Authentication failed');
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error('Error during authentication:', err.message);
      setMessage('An error occurred during authentication');
      setIsAuthenticated(false);
    } finally {
      setLoading(false); // Stop loading after response
    }
  }

  // Render loading spinner while checking auth
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkTheme
            ? 'bg-gray-900'
            : 'bg-gradient-to-br from-teal-50 to-blue-50'
        }`}
      >
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-teal-500"></div>
          <h2
            className={`mt-4 text-2xl font-semibold ${
              isDarkTheme ? 'text-white' : 'text-gray-800'
            }`}
          >
            Logging in...
          </h2>
        </div>
      </div>
    );
  }

  // Once loading is done, either render the component or redirect to login
  if (isAuthenticated) {
    return <Component message={message} />;
  } else {
    return (
      <Navigate
        to={redirectPath}
        state={{ fromPrivateRoute: true, message }}
        replace
      />
    );
  }
};

export default PrivateRoute;

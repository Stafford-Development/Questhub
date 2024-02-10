import { useState } from 'react';

const useLogin = ({ setLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      // Make API call to login endpoint
      const response = await fetch('http://localhost:3000/api/login-user', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      // Handle successful login
      if (data.success) {
        setLoggedIn(true);
      }
      else {
        setLoggedIn(false);
      }
      // ...

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const checkLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make API call to check-login endpoint
      const response = await fetch('http://localhost:3000/api/check-login', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Check login failed');
      }

      // Handle successful check login
      const data = await response.json();
      console.log(data.loggedIn)
      // Handle successful login
      if (data.loggedIn) {
        setLoggedIn(true);
      }
      else {
        setLoggedIn(false);
      }
      // ...

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      // Make API call to check-login endpoint
      const response = await fetch('http://localhost:3000/api/logout', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Check login failed');
      }

      // Handle successful check logout
      const data = await response.json();
      console.log(data.loggedOut)
      // Handle successful login
      if (data.loggedOut) {
        setLoggedIn(false);
      }
      else {
        setLoggedIn(true);
      }
      // ...

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  //return { loading, error, login };
  return { login, checkLogin, logout };
};

export default useLogin;

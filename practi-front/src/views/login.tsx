// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroLogin } from '../cmps/cta/hero-login';
import { Header } from '../cmps/header';

// Define the properties expected by the Login component
interface LoginProps {
  setToken: (token: string) => void; // Function to set the authentication token
  setFirstname: (username: string) => void; // Function to set the user's first name
  setLoginStatus: (loginStatus: boolean) => void; // Function to set the login status
}

// Define the Login component
export function Login({ setToken, setFirstname, setLoginStatus }: LoginProps): JSX.Element {
  // State variable to manage the username input
  const [username, setUsername] = useState('');

  // UseNavigate hook to navigate programmatically
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a stored token in localStorage
    const storedToken = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('userName');

    if (storedToken && storedUsername) {
 
      // If a token is found, set the token and fetch user details
      setToken(storedToken);
      setUsername(storedUsername);
      fetchUserDetails(storedToken, storedUsername);
    }
  }, []);

  // Function to handle the login process
  const handleLogin = async () => {
    const userLogin = {
      username,
    };

    const res = await fetch('https://practi-web.onrender.com/api/Tokens', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userLogin),
    });

    if (res.ok) {
      const newToken = await res.text();

      // Save the token and username in localStorage
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('userName', username);
      setToken(newToken);
      // Fetch user details using the obtained token
      fetchUserDetails(newToken, username);
    } else {
      alert('אין לך עדיין משתמש, הירשם');
    }
  };

  // Function to fetch user details using the authentication token
  const fetchUserDetails = async (token: string, username: string) => {

    const getUserResponse = await fetch(`https://practi-web.onrender.com/api/Users/${username}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (getUserResponse.ok) {
      const userJson = await getUserResponse.json();
      const { fullName } = userJson;

      // Set user details and login status
      setFirstname(fullName);
      setLoginStatus(true);

      // Navigate to the app page
      navigate('/app');
    } else {
      alert(getUserResponse.status);
    }
  };

  // Return the JSX structure of the Login component
  return (
    <div className='loginPage'>

      <section className="cta-container">
        <HeroLogin />
        <div className='login'>
          <div className='bigPracti'>
            Practi
          </div>
          <div className='PractiDisc'>
            מאמן אישי דיגטלי לשחקני כדורסל
          </div>
          {/* Input container for the username */}
          <div className='input-container'>
            <label htmlFor='username'>מספר טלפון</label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
       
          {/* Button to trigger the login process */}
          <button onClick={handleLogin}>התחבר</button>
          {/* Link to navigate to the signup page if the user doesn't have an account */}
          <p>
            אין לך עדיין חשבון? <Link to='/signup' className="blue-link">לחץ כאן</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

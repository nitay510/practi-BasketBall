// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroLogin } from '../cmps/cta/hero-login';


// Define the properties expected by the Login component
interface LoginProps {
  setToken: (token: string) => void; // Function to set the authentication token
  setFirstname: (username: string) => void; // Function to set the user's first name
  setLoginStatus: (loginStatus: boolean) => void; // Function to set the login status
  setClub: (club: string) => void;
  setMaster:(master:boolean) => void;
  setLastLogin:(lastLogin:Date)=>void;
}

// Define the Login component
export function Login({ setToken, setFirstname, setLoginStatus,setClub,setMaster,setLastLogin }: LoginProps): JSX.Element {
  // State variable to manage the username input
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const gm = [
 '1357'
  ];
  // UseNavigate hook to navigate programmatically
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there is a stored token in localStorage
    const storedToken = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('userName');
    const storedLastLogin = localStorage.getItem('lastLogin');

    if (storedToken && storedUsername) {
      // If a token is found, set the token and fetch user details
      setToken(storedToken);
      setUsername(storedUsername);
    if (storedLastLogin) {
      // Set the last login date from localStorage
      setLastLogin(new Date(storedLastLogin));
      console.log(storedLastLogin);
      localStorage.setItem('lastLogin', new Date().toString());
    }
      fetchUserDetails(storedToken, storedUsername);
    }
  }, []);

  // Function to handle the login process
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission default behavior

    const userLogin = {
      username,
      password,
    };

    try {
      const res = await fetch('http://localhost:5000/api/Tokens', {
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
        const storedLastLogin = localStorage.getItem('lastLogin');
        if (storedLastLogin) {
          // Set the last login date from localStorage
          setLastLogin(new Date(storedLastLogin));
          console.log(storedLastLogin);
          localStorage.setItem('lastLogin', new Date().toString());
        }
        // Await the completion of setToken before proceeding
        await setToken(newToken);
        // Fetch user details using the obtained token
        fetchUserDetails(newToken, username);
      } else {
        alert('אין לך עדיין משתמש, הירשם');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Function to fetch user details using the authentication token
  const fetchUserDetails = async (token: string, username: string) => {
    const getUserResponse = await fetch(`http://localhost:5000/api/Users/${username}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (getUserResponse.ok) {
      const userJson = await getUserResponse.json();
      const { fullName,isCoach,club } = userJson;
      // Set user details and login status
      setFirstname(fullName);
      setLoginStatus(true);
      setClub(club)
      // Navigate to the app page
      if(isCoach){
      if(gm.includes(username))
      setMaster(true);
      else
      setMaster(false);
      navigate('/app-manager'); 
      }else{
        navigate('/app', { state: { drillToDo: null } });
      }
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
            מאמן אישי דיגיטלי לשחקני כדורסל
          </div>
          {/* Input container for the username */}
          <form onSubmit={handleLogin}>
            <div className='input-container'>
              <label htmlFor='username'>מספר טלפון</label>
              <input
                type='text'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='input-container'>
           <label htmlFor='password'>סיסמה</label>
          <input
          type='password' // Change the type to 'password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
            />
        </div>
            {/* Button to trigger the login process */}
            <button type="submit">התחבר</button>
          </form>
          <p>
            אין לך עדיין חשבון? <Link to='/signup' className="blue-link">לחץ כאן</Link>
          </p>
        </div>
      </section>
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroLogin } from '../cmps/cta/hero-login';
import { fetchUserDetails, loginUser, sendFcmToken } from '../fetchFunctions/fetchFunctionsUser'; // Import the sendFcmToken function
import { messaging } from '../firebase'; // Import the messaging instance from firebase.js

interface LoginProps {
  setToken: (token: string) => void;
  setFirstname: (username: string) => void;
  setLoginStatus: (loginStatus: boolean) => void;
  setClub: (club: string) => void;
  setMaster: (master: boolean) => void;
  setLastLogin: (lastLogin: Date) => void;
}

export function Login({ setToken, setFirstname, setLoginStatus, setClub, setMaster, setLastLogin }: LoginProps): JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const gm = ['1357', '0546651989', '0545355400'];
  const navigate = useNavigate();

  // Function to request notification permission and get the token
  const requestNotificationPermission = async () => {
    try {
      const permissionGranted = localStorage.getItem('notificationsGranted');

      if (!permissionGranted) {
        // Request permission if not already granted
        await messaging.requestPermission();
        console.log('Notification permission granted.');

        // Get the FCM token
        const fcmToken = await messaging.getToken();
        console.log('FCM Token:', fcmToken);

        // Send the token to the server
        await sendFcmToken(username, fcmToken);  // Call the function from fetchFunctionsUser

        // Mark the permission as granted in localStorage
        localStorage.setItem('notificationsGranted', 'true');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newToken = await loginUser(username, password); // Perform login to get a new token
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('userName', username);
      setToken(newToken);
      setUsername(username);
      fetchUserDetails(newToken, username, setFirstname, setLoginStatus, setClub, setMaster, gm, navigate);

      // After successful login, request notification permission
      await requestNotificationPermission();
    } catch (error) {
      alert('אין לך עדיין משתמש, הירשם');
    }
  };

  return (
    <div className='loginPage'>
      <section className="cta-container">
        <HeroLogin />
        <div className='login'>
          <div className='bigPracti'>Practi</div>
          <div className='PractiDisc'>מאמן אישי דיגיטלי לשחקני כדורסל</div>
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
                type='password'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
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

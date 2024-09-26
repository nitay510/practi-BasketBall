import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroLogin } from '../cmps/cta/hero-login';
import { fetchUserDetails, loginUser, trackLoginActivity } from '../fetchFunctions/fetchFunctionsUser'; // Import the functions

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
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  const gm = ['1357','0546651989'];
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const newToken = await loginUser(username, password); // Perform login to get a new token
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('userName', username);
      setToken(newToken);
      setUsername(username)
      fetchUserDetails(newToken, username, setFirstname, setLoginStatus, setClub, setMaster, gm, navigate);
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

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeroLogin } from '../cmps/cta/hero-login';

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
  const [showInstallButton, setShowInstallButton] = useState(false); // Control visibility of the install button

  const gm = ['1357'];
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the "beforeinstallprompt" event
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('beforeinstallprompt event triggered');
      e.preventDefault(); // Prevent the default mini-infobar
      setDeferredPrompt(e); // Save the event for later use
      setShowInstallButton(true); // Show the install button
    });

    // Handle if the app is already installed
    window.addEventListener('appinstalled', () => {
      console.log('App has been installed');
      setShowInstallButton(false); // Hide the install button after installation
    });

    const storedToken = localStorage.getItem('authToken');
    const storedUsername = localStorage.getItem('userName');
    const storedLastLogin = localStorage.getItem('lastLogin');

    if (storedToken && storedUsername) {
      setToken(storedToken);
      setUsername(storedUsername);
      if (storedLastLogin) {
        setLastLogin(new Date(storedLastLogin));
        localStorage.setItem('lastLogin', new Date().toString());
      }
      fetchUserDetails(storedToken, storedUsername);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const userLogin = { username, password };

    try {
      const res = await fetch('https://practi-web.onrender.com/api/Tokens', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userLogin),
      });

      if (res.ok) {
        const newToken = await res.text();
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('userName', username);
        const storedLastLogin = localStorage.getItem('lastLogin');
        if (storedLastLogin) {
          setLastLogin(new Date(storedLastLogin));
          localStorage.setItem('lastLogin', new Date().toString());
        }
        await setToken(newToken);
        fetchUserDetails(newToken, username);
      } else {
        alert('אין לך עדיין משתמש, הירשם');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

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
      const { fullName, isCoach, club } = userJson;
      setFirstname(fullName);
      setLoginStatus(true);
      setClub(club);
      if (isCoach) {
        setMaster(gm.includes(username));
        navigate('/app-manager');
      } else {
        navigate('/app', { state: { drillToDo: null } });
      }
    } else {
      alert(getUserResponse.status);
    }
  };

  const handleAddToHomeScreen = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt(); // Show the install prompt
      deferredPrompt.userChoice.then((choiceResult: any) => {
        console.log('User choice:', choiceResult.outcome);
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        setDeferredPrompt(null); // Reset the deferred prompt
        setShowInstallButton(false); // Hide the install button after prompt
      });
    } else {
      console.log('Deferred prompt is not available.');
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
          {/* Add to Home Screen button */}
          {showInstallButton && (
            <button    onClick={handleAddToHomeScreen}
            >
              הורד לטלפון
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

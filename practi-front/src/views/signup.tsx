import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  setToken: (token: string) => void;
  setFirstname: (username: string) => void;
  setLoginStatus: (loginStatus: boolean) => void;
  setClub: (club: string) => void;
}

export function Signup({ setToken, setFirstname, setLoginStatus,setClub }: LoginProps): JSX.Element {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [clubName, setClubName] = useState(''); // State for club selection
  const [password, setPassword] = useState('');
  const [isCoach, setIsCoach] = useState(false);
  const [role, setRole] = useState(''); 
  const navigate = useNavigate();

  const clubs = [
    'מכבי חיפה',
    'מכבי תל אביב',
    'הפועל תל אביב',
    'הפועל גליל עליון',
    'מכבי חדרה'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'fullName':
        setFullName(value);
        break;
      case 'username':
        setUsername(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    setIsCoach(e.target.value === 'מאמן');
  };

  const handleSignup = async () => {
    const newUser = {
      fullName,
      username,
      password,
      isCoach,
      clubName
    };

    const res = await fetch('http://localhost:5000/api/Users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (res.ok) {
      const userLogin = { username, password };
      const tokenRes = await fetch('http://localhost:5000/api/Tokens', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userLogin),
      });

      const newToken = await tokenRes.text();
      localStorage.setItem('authToken', newToken);
      localStorage.setItem('userName', username);
      await setToken(newToken);
      fetchUserDetails(newToken, username);
    } else {
      alert('Error during signup');
    }
  };

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
      setFirstname(fullName);
      setClub(club)
      setLoginStatus(true);
      if(isCoach)
      navigate('/app-manager'); //here need to nevigate to coachApp when there will be one 
      else
      navigate('/app');
    } else {
      alert(getUserResponse.status);
    }
  };

  return (
    <div className="signupPage">
      <section className="signup-container">
        <div className="signup-form">
          <h2>הרשמה</h2>
          <div className="custom-input-container">
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName}
              onChange={handleInputChange}
              placeholder={!fullName ? 'שם מלא' : ''}
              required
            />
            <label htmlFor="fullName">שם מלא</label>
          </div>
          <div className="custom-input-container">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleInputChange}
              placeholder={!username ? 'מספר טלפון' : ''}
              required
            />
            <label htmlFor="username">מספר טלפון</label>
          </div>
          <div className="custom-input-container">
            <select id="club" name="club" value={clubName} onChange={(e) => setClubName(e.target.value)} required>
              <option value="">בחר מועדון</option>
              {clubs.map(club => (
                <option key={club} value={club}>{club}</option>
              ))}
            </select>
            <label htmlFor="club">מועדון</label>
          </div>
          <div className="custom-input-container">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              placeholder={!password ? 'סיסמה' : ''}
              required
            />
            <label htmlFor="password">סיסמה</label>
          </div>
          <div className="custom-input-container">
            <select id="role" name="role" onChange={handleRoleChange} required>
              <option value="">בחר תפקיד</option>
              <option value="מאמן">מאמן</option>
              <option value="שחקן">שחקן</option>
            </select>
            <label htmlFor="role">מאמן או שחקן?</label>
          </div>
          <button className="signup-button" onClick={handleSignup}>הרשמה</button>
        </div>
      </section>
    </div>
  );
}

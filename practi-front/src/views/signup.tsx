import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser, loginUser, fetchUserDetails, trackLoginActivity} from '../fetchFunctions/fetchFunctionsUser'; // Import the functions

interface SignupProps {
  setToken: (token: string) => void;
  setFirstname: (username: string) => void;
  setLoginStatus: (loginStatus: boolean) => void;
  setClub: (club: string) => void;
}

export function Signup({ setToken, setFirstname, setLoginStatus, setClub }: SignupProps): JSX.Element {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [clubName, setClubName] = useState(''); // State for club selection
  const [password, setPassword] = useState('');
  const [isCoach, setIsCoach] = useState(false);
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error message
  const navigate = useNavigate();

  const gm = ['1357','0546651989','0545355400']; // General managers or other identifiers

  const clubs = [
    'הפועל משגב',
    'מכבי אלפי מנשה',
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
    setErrorMessage(''); // Clear previous error message

    try {
      const res = await addUser(fullName, username, password, isCoach, clubName); // Use the addUser function

      if (res.ok) {
        const newToken = await loginUser(username, password); // Use the loginUser function
        localStorage.setItem('authToken', newToken);
        localStorage.setItem('userName', username);
        await setToken(newToken);
        await trackLoginActivity(username);
        fetchUserDetails(newToken, username, setFirstname, setLoginStatus, setClub, () => {}, gm, navigate); // Use the fetchUserDetails function
      } else {
        if (res.status === 500) {
          setErrorMessage('המשתמש הנוכחי כבר קיים במערכת');
        } else {
          setErrorMessage('Error during signup. Please try again.');
        }
      }
    } catch (error) {
      setErrorMessage('Error during signup. Please try again.');
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
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="signup-button" onClick={handleSignup}>הרשמה</button>
        </div>
      </section>
    </div>
  );
}

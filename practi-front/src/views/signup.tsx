import React, { useState } from 'react';
import { HeaderTwo } from '../cmps/headertwo';
import { useNavigate } from 'react-router-dom';
interface LoginProps {
  setToken: (token: string) => void; // Function to set the authentication token
  setFirstname: (username: string) => void; // Function to set the user's first name
  setLoginStatus: (loginStatus: boolean) => void; // Function to set the login status
}
export function Signup({ setToken, setFirstname, setLoginStatus }: LoginProps): JSX.Element {
  const [fullName, setFullName] = useState('');
  const [cityOfLiving, setCityOfLiving] = useState('');
  const [age, setAge] = useState('');
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'fullName':
        setFullName(value);
        break;
      case 'cityOfLiving':
        setCityOfLiving(value);
        break;
      case 'age':
        setAge(value);
        break;
      case 'username':
        setUsername(value);
        break;
      default:
        break;
    }
  };
  const handlePrivacyCheck = () => {
    setPrivacyChecked(!privacyChecked);
  };
  const handlePrivacyPolicyClick = () => {
    navigate('/privacy');
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

  const handleSignup = async () => {
    if (!privacyChecked) {
      alert('נא לאשר מידיניות פרטיות');
      return;
    }
    var newUser = {
      fullName: fullName,
      cityOfLiving: cityOfLiving,
      age: age,
      username: username
    };
    const res = await fetch('https://practi-web.onrender.com/api/Users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (res.ok) {
      const userLogin = {
        username,
      };
      //get the token after signup
        const res = await fetch('https://practi-web.onrender.com/api/Tokens', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userLogin),
        });
          const newToken = await res.text();
          // Save the token and username in localStorage
          localStorage.setItem('authToken', newToken);
          localStorage.setItem('userName', username);
          // Await the completion of setToken before proceeding
          await setToken(newToken);
          // Fetch user details using the obtained token
          fetchUserDetails(newToken, username);
    } else {
      // Handle error cases
      alert('מספר טלפון כבר נמצא במערכת');
    }


  };
  return (
    <div className="signupPage">
         <HeaderTwo/>
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
              id="cityOfLiving"
              name="cityOfLiving"
              value={cityOfLiving}
              onChange={handleInputChange}
              placeholder={!cityOfLiving ? 'עיר מגורים' : ''}
              required
            />
            <label htmlFor="cityOfLiving">עיר מגורים</label>
          </div>
          <div className="custom-input-container">
            <input
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={handleInputChange}
              placeholder={!age ? 'גיל' : ''}
              required
            />
            <label htmlFor="age">גיל</label>
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
          <div className="privacy">
            <label>
            <input
    type="checkbox"
    checked={privacyChecked}
    onChange={handlePrivacyCheck}
/>
<span>אני מאשר שקראתי את </span>
<span
    className="green"
    onClick={handlePrivacyPolicyClick}
>
    תנאי הפרטיות
</span>
            </label>
          </div>
          <button className="signup-button" onClick={handleSignup}>
            הרשמה
          </button>
        </div>
      </section>
    </div>
  );
}

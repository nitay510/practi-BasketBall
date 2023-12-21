import React, { useState } from 'react';
import { Header } from '../cmps/header';
import { useNavigate } from 'react-router-dom';

export function Signup(): JSX.Element {
  const [fullName, setFullName] = useState('');
  const [cityOfLiving, setCityOfLiving] = useState('');
  const [age, setAge] = useState('');
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

  const handleSignup = async () => {
    var newUser = {
      fullName: fullName,
      cityOfLiving: cityOfLiving,
      age: age,
      username: username
    };
    const res = await fetch('http://localhost:5000/api/Users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (res.ok) {
      navigate('/');
    } else {
      // Handle error cases
      alert('מספר טלפון כבר נמצא במערכת');
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
          <button className="signup-button" onClick={handleSignup}>
            הרשמה
          </button>
        </div>
      </section>
    </div>
  );
}
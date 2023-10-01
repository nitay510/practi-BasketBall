
import React from 'react';
import { Route, Routes } from 'react-router-dom'

import './App.css';
// import { LoginSignup } from './views/login-signup';
import { PractiApp } from './views/practi-app';



export function App() {
  return (
    <div className="App">
      {/* <Header />
      <Cta />
      <NavBar /> */}
      <Routes>

        <Route path="/" element={<PractiApp />} />
        <Route path="/video/:filterBy" element={<PractiApp />} />

        {/* <Route path="/login" element={<LoginSignup />} /> */}
        {/* <Route path="/signup" element={<LoginSignup />} /> */}
      </Routes>
    </div>
  );
}


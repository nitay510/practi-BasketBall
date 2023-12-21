
import React, { useState} from 'react';
import { Route, Routes } from 'react-router-dom'

import './App.css';
import { Signup } from './views/signup';
import HistoryPage from "./views/historyPage"
import HistoryPageDouble from "./views/historyWithFriend"
 import { Login } from './views/login';
import { PractiApp } from './views/practi-app';
import { PracticeView } from './views/PracticeView';



export function App() {
  const [token, setToken] = useState(' ');
  const [firstname, setFirstname] = useState('');
  const [topic, setTopic]= useState('קליעה')
  const [loginStatus,setLoginStatus] = useState(false);
  return (
    <div className="App">

      <Routes>

        <Route path="/app" element={<PractiApp token={token} firstname= {firstname} topic={topic} setTopic={setTopic} loginStatus={loginStatus}/>} />
        <Route path="/PracticeView/:Drill" element={<PracticeView token={token} topic={topic} />} />
        <Route path="/history" element={<HistoryPage token={token} setTopic={setTopic}  />} />
        <Route path="/historyFriends" element={<HistoryPageDouble token={token} setTopic={setTopic} />} />
         <Route path="/" element={<Login setToken={setToken} setFirstname= {setFirstname} setLoginStatus= {setLoginStatus}/>} /> 
         <Route path="/signup" element={<Signup />} /> 
      </Routes>
    </div>
  );
}


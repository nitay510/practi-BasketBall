
import React, { useState} from 'react';
import { Route, Routes } from 'react-router-dom'

import './App.css';
import { Signup } from './views/signup';
import HistoryPage from "./views/player/historyPage"
import HistoryPageDouble from "./views/player/historyWithFriend"
 import { Login } from './views/login';
import { PractiApp } from './views/player/practi-app';
import { PractiAppManager } from './views/coach/practi-app-manager';
import { PracticeView } from './views/player/PracticeView';
import {WeeklyCalendar} from './views/Events/WeeklyCalendar';
import { NewEvent } from './views/Events/NewEvent';
import { AfterGameScoresPage } from './views/InGameStats/afterGame/afterGameScorePage';
import {EditGameScoresPage} from './views/InGameStats/editGame/editGameScoresPage';
import HistoryPageForCoach from './views/coach/historyPageForCoach';
import Profile from './views/player/profilePlayer';
import { CoachVideo } from './views/coach/coachVideo';
import{ GameScoresPage} from './views/InGameStats/liveGame/gameScoresPage'; // Import GameScores component
import CoachGames from "./views/CoachGames/coachGames"
import CoachPlayerStats from "./views/coach/coachPlayerStats"
import { EventView } from './views/Events/eventShow';
import { NewGameEvent } from './views/Events/newGameEvent';
import { EventEdit } from './views/Events/EventEdit';
import TeamTable from "./views/player/teamTable";
import { GameEventEdit } from './views/Events/GameEventEdit';
import {GameEventView} from './views/Events/GameEventShow';
import { PracticeViewCoach } from './views/coach/practice-view-coach';
import PlayerDrills from "./views/coach/playerDrills/playerDrills"
import Notifications from './views/player/notifications';
export function App() {
  const [token, setToken] = useState(' ');
  const [firstname, setFirstname] = useState('');
  const [topic, setTopic]= useState('כדרור')
  const [loginStatus,setLoginStatus] = useState(false);
  const [lastLogin,setLastLogin]= useState(null);
  const [club,setClub] = useState('')
  const [master,setMaster]= useState(false);

  return (
    <div className="App"> 

      <Routes>
      <Route path="/notifications" element={<Notifications setLoginStatus={setLoginStatus} setTopic={setTopic}/>} />
      <Route path="/profile" element={<Profile token={token} setToken={setToken} firstName={firstname} club={club} />} />
      <Route path="/player-drills/:drillName" element={<PlayerDrills token={token} master={master} club= {club} />} />
      <Route path="/coach-games" element={<CoachGames token={token} master={master} club= {club} />} />
      <Route path="/after-game-boxScore" element={<AfterGameScoresPage token={token} />} />
      <Route path="/editGame" element={<EditGameScoresPage token={token} />} />
      <Route path="/coach-video" element={<CoachVideo token={token}  topic={topic} setTopic={setTopic}  setLoginStatus={setLoginStatus} />} />
        <Route path="/app" element={<PractiApp token={token} setToken={setToken} firstname= {firstname} topic={topic} setTopic={setTopic} loginStatus={loginStatus} setLoginStatus={setLoginStatus} lastLogin={lastLogin} />} />
        <Route path="/app-manager" element={<PractiAppManager token={token} setToken={setToken} loginStatus={loginStatus} setLoginStatus={setLoginStatus} club={club} master={master}/>} />
        <Route path="/PracticeView/:Drill" element={<PracticeView token={token} topic={topic} />} />
        <Route path="/PracticeViewCoach/:Drill" element={<PracticeViewCoach token={token} topic={topic} />} />
        <Route path="/coach-player-stats/:teamName/:playerName" element={<CoachPlayerStats />} /> 
        <Route path="/history" element={<HistoryPage token={token} setToken={setToken} setTopic={setTopic}  />} />
        <Route path="/historyByCoach" element={<HistoryPageForCoach token={token} setToken={setToken}  />} />
        <Route path="/historyFriends" element={<HistoryPageDouble token={token} setToken={setToken} setTopic={setTopic} />} />
         <Route path="/" element={<Login setToken={setToken} setFirstname= {setFirstname} setLoginStatus= {setLoginStatus} setClub={setClub} setMaster={setMaster} setLastLogin={setLastLogin}/>} /> 
         <Route path="/signup" element={<Signup setToken={setToken} setFirstname= {setFirstname} setLoginStatus= {setLoginStatus} setClub={setClub} />} /> 
        <Route path="/gameScores/:teamName/:rivalTeamName" element={<GameScoresPage token={token} />} /> {/* Route for GameScores component */}
           <Route path="/week-calendar" element={<WeeklyCalendar token={token} setLoginStatus={setLoginStatus} />} />
           <Route path="/event/:eventId" element={<EventView token={token} />} /> {/* Route for NewEvent component */}
        <Route path="/newEvent" element={<NewEvent token={token}  />} />
        <Route path="/newGameEvent" element={<NewGameEvent token={token}  />} />
        <Route path="/event/:eventId/edit" element={<EventEdit token={token} />} />
        <Route path="/gameEvent/:eventId/edit" element={<GameEventEdit token={token} />} />
        <Route path="/gameEvent/:eventId" element={<GameEventView token={token} />} />
        <Route path="/TeamTable" element={<TeamTable token={token} />} />
      </Routes>
    </div>
  );
}


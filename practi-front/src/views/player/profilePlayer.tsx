import React, { useState, useEffect } from 'react';
import { MdClose, MdExitToApp } from 'react-icons/md'; // Importing the exit icon
import { HeaderTwo } from '../../cmps/headers/headertwo';
import { CtaBar } from '../../cmps/cta/cta-bar';
import PlayerGameStats from '../../cmps/player-game-stats';
import { fetchTeams } from '../../fetchFunctions/fetchFunctionsCoach';
import { fetchPlayerTeams, fetchWinsLosses, joinTeam,leaveTeam } from '../../fetchFunctions/fetchFunctionsPlayer';


interface ProfileProps {
  token: string;
  setToken: (token: string) => void;
  firstName: string;
  club: string;
}

function Profile({ token, setToken, firstName, club }: ProfileProps) {
  const [showJoinTeamModal, setShowJoinTeamModal] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [teamName, setTeamName] = useState('');
  const [availableTeams, setAvailableTeams] = useState<string[]>([]);
  const [teamWins, setTeamWins] = useState(0);
  const [teamLosses, setTeamLosses] = useState(0);

  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const storedToken = localStorage.getItem('authToken') || token;
        const playerTeams = await fetchPlayerTeams(storedToken);
        if (playerTeams.length > 0) {
          setTeamName(playerTeams[0].teamName);
          const { wins, losses } = await fetchWinsLosses(playerTeams[0].teamName, token);
          setTeamWins(wins);
          setTeamLosses(losses);
        }
      } catch (error) {
        console.error('Failed to fetch teams', error);
      }
    };
    setToken(localStorage.getItem('authToken'))
    fetchTeamsData();
  }, [token]);

  useEffect(() => {
    const loadAvailableTeams = async () => {
      try {
        const storedToken = localStorage.getItem('authToken') || token;
        const teams = await fetchTeams(club, storedToken, true);
        console.log(teams);
        setAvailableTeams(teams.map((team: { teamName: string }) => team.teamName));
      } catch (error) {
        console.error('Error fetching available teams:', error);
      }
    };
    setToken(localStorage.getItem('authToken'))
    loadAvailableTeams();
  }, [club, token]);

  const handleJoinTeam = async () => {
    try {
      const storedToken = localStorage.getItem('authToken') || token;
      await joinTeam(newTeamName, club, storedToken);
      alert('Successfully joined the team!');
      setTeamName(newTeamName);
      setNewTeamName('');
      setShowJoinTeamModal(false);
    } catch (error) {
      alert('Failed to join the team');
    }
  };

  const handleLeaveTeam = async () => {
    if (window.confirm('Are you sure you want to leave the team?')) {
      try {
        const storedToken = localStorage.getItem('authToken') || token;
        await leaveTeam(teamName, storedToken);
        alert('You have left the team successfully.');
        setTeamName('');
      } catch (error) {
        alert('Failed to leave the team.');
      }
    }
  };

  return (
    <div className="profile-page">
      <HeaderTwo />
      <div className='content-container'>
        <h3>שלום, {firstName}</h3>
        {teamName ? (
          <>
            <h2>
              משחק בקבוצת: {teamName}{' '}
              <MdExitToApp className="leave-icon" onClick={handleLeaveTeam} />
            </h2>
            <div className="team-stats">
              <div className="stat-container">
                <div className="rectangle wins">{teamWins}</div>
                <div className="label">נצחונות</div>
              </div>
              <div className="slash">/</div>
              <div className="stat-container">
                <div className="rectangle losses">{teamLosses}</div>
                <div className="label">הפסדים</div>
              </div>
            </div>
            <PlayerGameStats playerName={firstName} teamName={teamName} isPlayer={true} />
          </>
        ) : (
          <button className='joinTeamButton' onClick={() => setShowJoinTeamModal(true)}>הצטרף לקבוצה חדשה</button>
        )}
        {showJoinTeamModal && (
          <div className="modal">
            <button className='modal-close-button' onClick={() => setShowJoinTeamModal(false)}>
              <MdClose />
            </button>
            <h4>הצטרף לקבוצה חדשה</h4>
            <select
              value={newTeamName}
              onChange={(e) => setNewTeamName(e.target.value)}
            >
              <option value="">בחר קבוצה</option>
              {availableTeams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <button onClick={handleJoinTeam}>הצטרף</button>
          </div>
        )}
      </div>
      <CtaBar />
    </div>
  );
}

export default Profile;

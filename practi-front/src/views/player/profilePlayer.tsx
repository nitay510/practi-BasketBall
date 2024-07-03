import React, { useState, useEffect } from 'react';
import { MdClose, MdExitToApp } from 'react-icons/md'; // Importing the exit icon
import { HeaderTwo } from '../../cmps/headers/headertwo';
import { CtaBar } from '../../cmps/cta/cta-bar';
import PlayerGameStats from '../../cmps/player-game-stats';

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
  // Fetch the teams the player is already a member of
  useEffect(() => {
    const fetchPlayerTeams = async () => {
      const storedToken = localStorage.getItem('authToken');
      const authToken = `Bearer ${storedToken || token}`;
      setToken(storedToken || token);
      try {
        const response = await fetch('https://practi-web.onrender.com/api/teams/player', {
          headers: { Authorization: authToken }
        });
        const data = await response.json();
        if (data.length > 0) {
          setTeamName(data[0].teamName);
          const winLossResponse = await fetch(`https://practi-web.onrender.com/api/games/team/${data[0].teamName}/wins-losses`, {
            headers: { Authorization: authToken }
          });
          const { wins, losses } = await winLossResponse.json();
          setTeamWins(wins);
          setTeamLosses(losses);
        }
      } catch (error) {
        console.error('Failed to fetch teams', error);
      }
    };
    fetchPlayerTeams();
  }, [setToken, token]);

  // Fetch all teams in the club
  useEffect(() => {
    const fetchTeamsInClub = async () => {
      const storedToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(`https://practi-web.onrender.com/api/teams/club?clubName=${encodeURIComponent(club)}`, {
          headers: { Authorization: `Bearer ${storedToken || token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setAvailableTeams(data.map((team: { teamName: string }) => team.teamName));
        } else {
          console.error('Failed to fetch teams in the club');
        }
      } catch (error) {
        console.error('Error fetching teams in club:', error);
      }
    };
    fetchTeamsInClub();
  }, [club, token]);

  const joinTeam = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await fetch('https://practi-web.onrender.com/api/teams/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken || token}`
        },
        body: JSON.stringify({ teamName: newTeamName, club:club })
      });
      if (response.ok) {
        alert('Successfully joined the team!');
        setTeamName(newTeamName);
        setNewTeamName('');
        setShowJoinTeamModal(false);
      } else {
        alert('Failed to join the team');
      }
    } catch (error) {
      console.error('Error joining team', error);
    }
  };

  const leaveTeam = async () => {
    if (window.confirm('אתה בטוח שברצונך לעזוב את הקבוצה?')) {
      try {
        const storedToken = localStorage.getItem('authToken');
        const response = await fetch('https://practi-web.onrender.com/api/teams/removePlayerByPlayer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken || token}`
          },
          body: JSON.stringify({ teamName })
        });
        if (response.ok) {
          alert('You have left the team successfully.');
          setTeamName('');
        } else {
          alert('Failed to leave the team.');
        }
      } catch (error) {
        console.error('Error leaving team', error);
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
            <h2>משחק בקבוצת: {teamName} <MdExitToApp className="leave-icon" onClick={leaveTeam} /></h2>
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
            <PlayerGameStats playerName={firstName} teamName={teamName} />
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
              placeholder="בחר קבוצה"
            >
              <option value="">בחר קבוצה</option>
              {availableTeams.map((team, index) => (
                <option key={index} value={team}>
                  {team}
                </option>
              ))}
            </select>
            <button onClick={joinTeam}>הצטרף</button>
          </div>
        )}
      </div>
      <CtaBar />
    </div>
  );
}

export default Profile;

import React, { useState, useEffect } from 'react';
import { MdOutlineExpandMore, MdDelete , MdClose, MdAdd,MdArrowBack,MdPeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface TeamListProps {
    token: string;
  setToken: (token: string) => void;
  club:string;
  master:boolean;
}

interface Player {
  fullName: string;
  username: string;
}

const TeamList = ({ token,setToken,club,master }: TeamListProps) => {
  const [teams, setTeams] = useState<any[]>([]);
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  useEffect(() => {
    fetchTeams();
  }, []);
  const fetchTeams = async () => {
    const storedToken = localStorage.getItem('authToken');
    const authToken = `Bearer ${storedToken || token}`;
    let response;
  
    if (master) {
      response = await fetch(`http://localhost:5000/api/teams/club?clubName=${encodeURIComponent(club)}`, {
        headers: { Authorization: authToken }
      });
    } else {
      response = await fetch('http://localhost:5000/api/teams', {
        headers: { Authorization: authToken }
      });
    }
  
    const teamsData = await response.json();
  
    const teamsWithPlayersAndResults = await Promise.all(
      teamsData.map(async (team: { teamName: any; }) => {
        // Fetch players data for each team
        const playersResponse = await fetch('http://localhost:5000/api/teams/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
          },
          body: JSON.stringify({ teamName: team.teamName })
        });
  
        const playersData = await playersResponse.json();
  
        // Fetch win-loss data for each team
        const winLossResponse = await fetch(`http://localhost:5000/api/games/team/${team.teamName}/wins-losses`, {
          headers: { Authorization: authToken }
        });
  
        const { wins, losses } = await winLossResponse.json();
  
        // Combine team data with players and win-loss results
        return {
          ...team,
          players: playersData.players || [],
          wins,
          losses,
          expanded: false
        };
      })
    );
  
    setTeams(teamsWithPlayersAndResults);
  };
  
  const handleAddTeam = async () => {
    if (teamName.trim()) {
      try {
      const storedToken = localStorage.getItem('authToken')
      setToken(storedToken);
        const response = await fetch(`http://localhost:5000/api/teams/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`
          },
          body: JSON.stringify({ teamName,club }),
        });
        if (response.ok) {
          alert('Team added successfully');
          setTeamName('');
          setShowAddTeamModal(false);
        } else {
          alert('Failed to add team');
        }
      } catch (error) {
        alert(`Error: ${error}`);
      }
    } else {
      alert('Please enter a team name');
    }
    fetchTeams();
  };

  const toggleTeamExpansion = (index: number) => {
    const newTeams = teams.map((team, idx) => idx === index ? { ...team, expanded: !team.expanded } : team);
    setTeams(newTeams);
  };

  const handlePlayerClickTraining = (username: string) => {
    navigate('/historyByCoach', { state: { player: username } });
  };
  const handlePlayerClickGames = (teamName:string,playerName:string,username:string) => {
    navigate(`/coach-player-stats/${encodeURIComponent(teamName)}/${encodeURIComponent(playerName)}`);
  };
  const handleDeletePlayer = (username: string, teamName: string) => {
    if (window.confirm('אתה בטוח שברצונך למחוק את השחקו?')) {
      deletePlayer(username, teamName);
    }
  };

  const deletePlayer = async (username: string, teamName: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/teams/removePlayerByCoach`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ username, teamName })
      });
      if (response.ok) {
        alert('Player removed successfully');
        fetchTeams(); // Reload the teams data
      } else {
        alert('Failed to remove player');
      }
    } catch (error) {
      console.error('Failed to delete player:', error);
      alert('Failed to remove player due to an error');
    }
  };

  return (
    <div className="team-list">
    {teams.map((team, index) => (
      <div key={index} className="team-item">
       <h3 onClick={() => toggleTeamExpansion(index)} style={{ cursor: 'pointer' }}>
      {team.teamName} 
      </h3>
      <div className="player-info" onClick={() => toggleTeamExpansion(index)}>
        <MdPeople /> {team.players.length}
        <span className='expend-more' onClick={() => toggleTeamExpansion(index)}>
        <MdOutlineExpandMore />
      </span>
      </div>
          {team.expanded && (
            <div className="player-list">
       <p className="wins-loses" style={{ marginBottom: '30px' }}>
        נצחונות: {team.wins} / הפסדים: {team.losses}
      </p>
      <p className="player-list" style={{ fontWeight: 'bold',marginBottom: '20px' }}>
        רשימת שחקנים
      </p>
              {team.players.map((player: Player, playerIndex: React.Key) => (
                <div key={playerIndex} className="player-row">
                 <button className="delete-player-button" onClick={() => handleDeletePlayer(player.username, team.teamName)}><MdDelete /></button>
                  <p className="player-name" onClick={() => handlePlayerClickGames(team.teamName,player.fullName,player.username)}>{player.fullName}</p>
                  <p className="go-to-player" onClick={() => handlePlayerClickGames(team.teamName,player.fullName,player.username)}>לפרטי השחקן</p>
                  <p className='go-to-player-arrow'  onClick={() => handlePlayerClickGames(team.teamName,player.fullName,player.username)} ><MdArrowBack/></p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
         <button className="add-team-button" onClick={() => setShowAddTeamModal(true)}>
  <MdAdd className="md-icon" />
  הוסף קבוצה חדשה
</button>
        {showAddTeamModal && (
        <div className="add-team-popup-container">
        <div className="add-team-popup">
              <button className="close" onClick={() => setShowAddTeamModal(false)}>
                <MdClose size={24} />
              </button>
              <h2>הוסף קבוצה חדשה</h2>
              <input
                type="text"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="שם הקבוצה"
              />
              <button onClick={handleAddTeam}>אישור</button>
            </div>
          </div>
        )}
    </div>
  );
};

export default TeamList;

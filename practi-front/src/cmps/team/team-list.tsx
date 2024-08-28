import React, { useState, useEffect } from 'react';
import { MdOutlineExpandMore, MdClose, MdAdd, MdPeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { fetchTeamsWithPlayersAndResults, addTeam, deletePlayerFromTeam } from '../../fetchFunctions/fetchFunctionsCoach'; // Import functions

interface TeamListProps {
  token: string;
  setToken: (token: string) => void;
  club: string;
  master: boolean;
}

interface Player {
  fullName: string;
  username: string;
}

const TeamList = ({ token, setToken, club, master }: TeamListProps) => {
  const [teams, setTeams] = useState<any[]>([]);
  const [teamName, setTeamName] = useState('');
  const navigate = useNavigate();
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);

  useEffect(() => {
    fetchTeamsData();
  }, []);

  const fetchTeamsData = async () => {
    try {
      const storedToken = localStorage.getItem('authToken') || token;
      setToken(storedToken);
      const teamsData = await fetchTeamsWithPlayersAndResults(club, storedToken, master);
      setTeams(teamsData);
    } catch (error) {
      console.error('Failed to fetch teams', error);
    }
  };

  const handleAddTeam = async () => {
    if (teamName.trim()) {
      try {
        const storedToken = localStorage.getItem('authToken') || token;
        setToken(storedToken);
        const response = await addTeam(teamName, club, storedToken); // Use addTeam function

        if (response.ok) {
          alert('Team added successfully');
          setTeamName('');
          setShowAddTeamModal(false);
          fetchTeamsData(); // Reload teams after adding
        } else {
          alert('Failed to add team');
        }
      } catch (error) {
        alert(`Error: ${error}`);
      }
    } else {
      alert('Please enter a team name');
    }
  };

  const toggleTeamExpansion = (index: number) => {
    const newTeams = teams.map((team, idx) =>
      idx === index ? { ...team, expanded: !team.expanded } : team
    );
    setTeams(newTeams);
  };

  const handlePlayerClickGames = (teamName: string, playerName: string, username: string) => {
    navigate(`/coach-player-stats/${encodeURIComponent(teamName)}/${encodeURIComponent(playerName)}`);
  };

  const handleDeletePlayer = (username: string, teamName: string) => {
    if (window.confirm('אתה בטוח שברצונך למחוק את השחקן?')) {
      deletePlayer(username, teamName);
    }
  };

  const deletePlayer = async (username: string, teamName: string) => {
    try {
      const storedToken = localStorage.getItem('authToken') || token;
      setToken(storedToken);
      const response = await deletePlayerFromTeam(username, teamName, storedToken); // Use deletePlayerFromTeam function

      if (response.ok) {
        alert('Player removed successfully');
        fetchTeamsData(); // Reload the teams data
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
            <span className="expend-more" onClick={() => toggleTeamExpansion(index)}>
              <MdOutlineExpandMore />
            </span>
          </div>
          {team.expanded && (
            <div className="player-list">
              <p className="wins-loses">
                נצחונות: {team.wins} / הפסדים: {team.losses}
              </p>
              <p className="player-list" style={{ fontSize: '24px', marginBottom: '25px', fontWeight: '700', letterSpacing: '0.75' }}>
                רשימת שחקנים
              </p>
              {team.players.map((player: Player, playerIndex: React.Key) => (
                <div key={playerIndex} className="player-row">
                  <p className="player-name" onClick={() => handlePlayerClickGames(team.teamName, player.fullName, player.username)}>
                    {player.fullName}
                  </p>
                  <p className="go-to-player" onClick={() => handlePlayerClickGames(team.teamName, player.fullName, player.username)}>
                    <FiUser />
                  </p>
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

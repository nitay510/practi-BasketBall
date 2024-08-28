import React, { useState, useEffect } from 'react';
import { MdOutlineExpandMore, MdClose, MdAdd, MdPeople } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { fetchTeams, fetchPlayersForTeam,  addTeam } from '../../fetchFunctions/fetchFunctionsCoach'; // Adjust the import path accordingly
import { fetchWinsLosses } from '../../fetchFunctions/fetchFunctionsPlayer';
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
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadTeams = async () => {
      const storedToken = localStorage.getItem('authToken') || token;
      const teamsData = await fetchTeams(club, storedToken, master);
      const teamsWithDetails = await Promise.all(
        teamsData.map(async (team) => {
          const players = await fetchPlayersForTeam(team.teamName, storedToken);
          const { wins, losses } = await fetchWinsLosses(team.teamName, storedToken);

          return {
            ...team,
            players,
            wins,
            losses,
            expanded: false,
          };
        })
      );

      setTeams(teamsWithDetails);
    };

    loadTeams();
  }, [token, club, master]);

  const handleAddTeam = async () => {
    if (teamName.trim()) {
      try {
        const storedToken = localStorage.getItem('authToken') || token;
        const response = await addTeam(teamName, club, storedToken);

        if (response.ok) {
          alert('Team added successfully');
          setTeamName('');
          setShowAddTeamModal(false);
          // Reload teams after adding a new one
          const teamsData = await fetchTeams(club, storedToken, master);
          setTeams(teamsData);
        } else {
          alert('Failed to add team');
        }
      } catch (error) {
        console.error('Error adding team:', error);
        alert('An error occurred while adding the team.');
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

  return (
    <div className="team-list">
      {teams.map((team, index) => (
        <div key={index} className="team-card">
          <h3 className="team-name" onClick={() => toggleTeamExpansion(index)}>
            {team.teamName}
          </h3>
          <div className="player-info" onClick={() => toggleTeamExpansion(index)}>
            <MdPeople /> {team.players.length}
            <span className="expand-more">
              <MdOutlineExpandMore />
            </span>
          </div>

          {team.expanded && (
            <div className="team-details">
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

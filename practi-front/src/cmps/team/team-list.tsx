import React, { useState, useEffect } from 'react';
import { MdOutlineExpandMore, MdDelete, MdClose, MdAdd, MdArrowBack, MdPeople, MdHistory } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import { fetchTeams, fetchPlayersForTeamList, addTeam, deletePlayerFromTeam, deleteTeam } from '../../fetchFunctions/fetchFunctionsCoach'; // Import the functions
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
  const navigate = useNavigate();
  const [showAddTeamModal, setShowAddTeamModal] = useState(false);

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    try {
      const storedToken = localStorage.getItem('authToken') || token;
      const teamsData = await fetchTeams(club, storedToken, master);

      const teamsWithPlayersAndResults = await Promise.all(
        teamsData.map(async (team) => {
          const playersData = await fetchPlayersForTeamList(team.teamName, storedToken);
          const { wins, losses } = await fetchWinsLosses(team.teamName, storedToken);

          return {
            ...team,
            players: playersData,
            wins,
            losses,
            expanded: false,
          };
        })
      );

      setTeams(teamsWithPlayersAndResults);
    } catch (error) {
      console.error('נכשל בטעינת הקבוצות:', error);
    }
  };

  const handleAddTeam = async () => {
    if (teamName.trim()) {
      try {
        const storedToken = localStorage.getItem('authToken') || token;
        setToken(storedToken);
        const response = await addTeam(teamName, club, storedToken);
        if (response.ok) {
          alert('הקבוצה נוספה בהצלחה');
          setTeamName('');
          setShowAddTeamModal(false);
          loadTeams(); // Reload teams after adding a new one
        } else {
          console.log(response);
          alert('נכשל בהוספת קבוצה');
        }
      } catch (error) {
        alert(`שגיאה: ${error}`);
      }
    } else {
      alert('אנא הזן שם קבוצה');
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
  const handlePlayerClickHistory = (playerName: string, username: string) => {
    navigate('/historyByCoach', { state: { player: { fullName: playerName, username } } });
  };

  const handleDeletePlayer = async (username: string, teamName: string) => {
    if (window.confirm('אתה בטוח שברצונך למחוק את השחקן?')) {
      try {
        await deletePlayerFromTeam(username, teamName, token);
        loadTeams(); // Reload the teams data
        alert('השחקן נמחק בהצלחה');
      } catch (error) {
        console.error('נכשל במחיקת השחקן:', error);
        alert('נכשל במחיקת השחקן');
      }
    }
  };

  const handleDeleteTeam = async (teamName: string) => {
    if (window.confirm('אתה בטוח שברצונך למחוק את הקבוצה?')) {
      try {
        const storedToken = localStorage.getItem('authToken') || token;
        await deleteTeam(teamName, storedToken);
        loadTeams(); // Reload teams after deletion
        alert('הקבוצה נמחקה בהצלחה');
      } catch (error) {
        console.error('נכשל במחיקת הקבוצה:', error);
        alert('נכשל במחיקת הקבוצה עקב שגיאה');
      }
    }
  };

  return (
    <div className="team-list">
      {teams.map((team, index) => (
        <div key={index} className="team-item">
          <div className="team-header">
            <h3 onClick={() => toggleTeamExpansion(index)} style={{ cursor: 'pointer', flexGrow: 1 }}>
              {team.teamName}
            </h3>
            <MdDelete
              className="delete-team-icon"
              onClick={() => handleDeleteTeam(team.teamName)}
            />
          </div>
          <div className="player-info" onClick={() => toggleTeamExpansion(index)}>
            <MdPeople /> {team.players.length}
            <span className='expend-more' onClick={() => toggleTeamExpansion(index)}>
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
                  <p className="go-to-player" onClick={() => handlePlayerClickHistory(player.fullName, player.username)}>
                    <MdHistory />
                  </p>
                  <p className="go-to-player" onClick={() => handlePlayerClickGames(team.teamName, player.fullName, player.username)}>
                    <FiUser />
                  </p>
                  <MdDelete
                    className="delete-player-icon"
                    onClick={() => handleDeletePlayer(player.username, team.teamName)}
                  />
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

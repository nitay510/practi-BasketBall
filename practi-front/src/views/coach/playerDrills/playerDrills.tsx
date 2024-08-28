import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { drillsData } from './drillsData';
import { CtaBarManager } from '../../../cmps/cta/cta-bar-manager';
import { HeaderThree } from '../../../cmps/headers/headerThree';
import { fetchTeamsWithPlayers, sendDrillAssignments } from '../../../fetchFunctions/fetchFunctionsCoach'; // Import the fetch functions

interface Player {
  fullName: string;
  username: string;
}

interface Drill {
  _id: string;
  title: string;
  topic: string;
}

interface Team {
  teamName: string;
  players: Player[];
}

interface PlayerDrillsProps {
  token: string;
  club: string;
  master: boolean;
}

const allDrills = Object.values(drillsData).flat();

const PlayerDrills: React.FC<PlayerDrillsProps> = ({ token, club, master }) => {
  const navigate = useNavigate();
  const { drillName } = useParams<{ drillName: string }>();
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedDrill, setSelectedDrill] = useState<Drill | null>(null);
  const [selectedPlayers, setSelectedPlayers] = useState<{ [key: string]: boolean }>({});
  const [assignAllClicked, setAssignAllClicked] = useState(false);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const teamsWithPlayers = await fetchTeamsWithPlayers(token, club, master);
        setTeams(teamsWithPlayers);
        if (teamsWithPlayers.length > 0) {
          setSelectedTeam(teamsWithPlayers[0].teamName); // Set default team
        }
      } catch (error) {
        console.error('Error loading teams:', error);
      }
    };
    loadTeams();
  }, [token, club, master]);

  useEffect(() => {
    if (selectedTeam) {
      const team = teams.find(t => t.teamName === selectedTeam);
      setPlayers(team?.players || []);
    }
  }, [selectedTeam, teams]);

  useEffect(() => {
    const drill = allDrills.find(d => d.title === drillName);
    setSelectedDrill(drill || null);
  }, [drillName]);

  const handlePlayerSelectChange = (username: string, isSelected: boolean) => {
    setSelectedPlayers(prevSelectedPlayers => ({
      ...prevSelectedPlayers,
      [username]: isSelected,
    }));
  };

  const handleAssignToTeam = () => {
    if (assignAllClicked) {
      // If already clicked, unselect all players
      setSelectedPlayers({});
      setAssignAllClicked(false);
    } else {
      // If not clicked, select all players
      const allSelected = players.reduce((acc, player) => {
        acc[player.username] = true;
        return acc;
      }, {} as { [key: string]: boolean });

      setSelectedPlayers(allSelected);
      setAssignAllClicked(true);
    }
  };

  const handleSubmit = async () => {
    if (!selectedDrill) {
      alert('האימון הנבחר לא נמצא');
      return;
    }

    const selectedPlayersList = Object.keys(selectedPlayers).filter(username => selectedPlayers[username]);
    const drillAssignments = selectedPlayersList.map(username => ({
      drillId: selectedDrill._id,
      date: new Date(),
      user: username,
      drillName: selectedDrill.title,
      topic: selectedDrill.topic,
    }));

    try {
      await sendDrillAssignments(token, drillAssignments);
      alert('האימונים נשלחו בהצלחה');
      navigate(`/coach-video`);
    } catch (error) {
      alert('הקצאת האימונים נכשלה');
    }
  };

  return (
    <div className='playerDrills'>
      <HeaderThree />
      <div className='content-container'>
        <h1>{drillName}</h1>
        <hr className="underline" />
        <div className='team-selection'>
          <h2>בחר קבוצה</h2>
          <select value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
            {teams.map((team) => (
              <option key={team.teamName} value={team.teamName}>
                {team.teamName}
              </option>
            ))}
          </select>
        </div>
        <button
          className={`assign-team-button ${assignAllClicked ? 'clicked' : ''}`}
          onClick={handleAssignToTeam}
        >
          הקצה לכל הקבוצה
        </button>
        <table className='players-table'>
          <thead>
            <tr>
              <th>שם השחקן</th>
              <th>הקצאה</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.username}>
                <td>{player.fullName}</td>
                <td>
                  <input
                    type='checkbox'
                    checked={selectedPlayers[player.username] || false}
                    onChange={(e) => handlePlayerSelectChange(player.username, e.target.checked)}
                    style={{ marginRight: "40%" }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className='submit-button' onClick={handleSubmit}>שלח</button>
      </div>
      <div className="cta-bar-container">
        <CtaBarManager />
      </div>
    </div>
  );
};

export default PlayerDrills;

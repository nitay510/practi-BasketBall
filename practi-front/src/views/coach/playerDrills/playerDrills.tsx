import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { drillsData } from './drillsData';
import { CtaBarManager } from '../../../cmps/cta/cta-bar-manager';
import { HeaderThree } from '../../../cmps/headers/headerThree';

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
    fetchTeams();
  }, []);

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

  const fetchTeams = async () => {
    const storedToken = localStorage.getItem('authToken');
    const authToken = `Bearer ${storedToken || token}`;
    let response;

    if (master) {
      response = await fetch(`https://practi-web.onrender.com/api/teams/club?clubName=${encodeURIComponent(club)}`, {
        headers: { Authorization: authToken }
      });
    } else {
      response = await fetch('https://practi-web.onrender.com/api/teams', {
        headers: { Authorization: authToken }
      });
    }

    const teamsData = await response.json();

    const teamsWithPlayers = await Promise.all(
      teamsData.map(async (team: { teamName: string }) => {
        const playersResponse = await fetch('https://practi-web.onrender.com/api/teams/players', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': authToken
          },
          body: JSON.stringify({ teamName: team.teamName })
        });

        const playersData = await playersResponse.json();
        return {
          teamName: team.teamName,
          players: playersData.players || [],
        };
      })
    );

    setTeams(teamsWithPlayers);
    if (teamsWithPlayers.length > 0) {
      setSelectedTeam(teamsWithPlayers[0].teamName); // Set default team
    }
  };

  const handlePlayerSelectChange = (username: string, isSelected: boolean) => {
    setSelectedPlayers((prevSelectedPlayers) => ({
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

    const storedToken = localStorage.getItem('authToken');
    const selectedPlayersList = Object.keys(selectedPlayers).filter(username => selectedPlayers[username]);

    const drillAssignments = selectedPlayersList.map(username => ({
      drillId: selectedDrill._id,
      date: new Date(),
      user: username,
      drillName: selectedDrill.title,
      topic: selectedDrill.topic
    }));

    try {
      for (const assignment of drillAssignments) {
        await fetch(`https://practi-web.onrender.com/api/SendDrills/${assignment.drillId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`
          },
          body: JSON.stringify({
            user: assignment.user,
            drillName: assignment.drillName,
            topic: assignment.topic
          })
        });
      }
      alert('האימונים נשלחו בהצלחה');
      navigate(`/coach-video`);
    } catch (error) {
      console.error('שגיאה בהקצאת האימונים:', error);
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
import React, { useEffect, useState } from 'react';
import { fetchPlayerTeams, getDrillsLastMonth } from '../../fetchFunctions/fetchFunctionsPlayer';
import { fetchPlayersForTeamList } from '../../fetchFunctions/fetchFunctionsCoach';
import './TeamTable.scss';

interface Player {
  username: string;
  drillsThisMonth: number;
}

const TeamTable: React.FC<{ token: string }> = ({ token }) => {
  const [teamName, setTeamName] = useState<string | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentUsername, setCurrentUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamAndPlayers = async () => {
      try {
        setLoading(true);

        // Fetch the player's team
        const teams = await fetchPlayerTeams(token);
        if (teams.length > 0) {
          const team = teams[0]; // Assuming there's only one team
          setTeamName(team.name);

          // Fetch players for the team
          const playersList = await fetchPlayersForTeamList(team.name, token);

          // Fetch drills count for each player
          const playersWithDrills = await Promise.all(
            playersList.map(async (player: { username: string }) => {
              const drillsThisMonth = await getDrillsLastMonth(token);
              return { username: player.username, drillsThisMonth };
            })
          );

          // Sort players by the number of drills this month
          playersWithDrills.sort((a, b) => b.drillsThisMonth - a.drillsThisMonth);
          setPlayers(playersWithDrills);

          // Set current user
          const currentUser = team.currentUsername;
          setCurrentUsername(currentUser);
        } else {
          setError('לא נמצאה קבוצה עבור השחקן.');
        }
      } catch (err) {
        setError('אירעה שגיאה בטעינת נתוני הקבוצה או השחקנים.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamAndPlayers();
  }, [token]);

  if (loading) return <div>טוען...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="team-table-container">
      <h2>טבלת הקבוצה: {teamName}</h2>
      <table className="team-table">
        <thead>
          <tr>
            <th>מיקום</th>
            <th>שחקן</th>
            <th>כמות תרגולים בחודש הנוכחי</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.username} className={player.username === currentUsername ? 'highlight' : ''}>
              <td>{index + 1}</td>
              <td>{player.username}</td>
              <td>{player.drillsThisMonth}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamTable;

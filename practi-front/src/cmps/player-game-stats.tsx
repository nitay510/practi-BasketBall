// PlayerGameStats.tsx
import React, { useState, useEffect } from 'react';
import { GameForPlayer } from '../views/InGameStats/gameForPlayer';

interface PlayerGameStatsProps {
  playerName: string;
  teamName: string;
}

const PlayerGameStats: React.FC<PlayerGameStatsProps> = ({ playerName, teamName }) => {

    const [games, setGames] = useState<GameForPlayer[]>([]);
    const [averageStats, setAverageStats] = useState({ score: "0.0", rebounds: "0.0", assists: "0.0" });

    useEffect(() => {
        const fetchGames = async () => {
            const storedToken = localStorage.getItem('authToken');
            if (!storedToken) return;

            try {
                // Fetch games data for a specific player and team
                const response = await fetch(`http://localhost:5000/api/games/team/${encodeURIComponent(teamName)}/player/${encodeURIComponent(playerName)}`, {
                    headers: {
                        'Authorization': `Bearer ${storedToken}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) throw new Error('Failed to fetch games');
                const data: GameForPlayer[] = await response.json();
                setGames(data);

                // Calculate averages
                const totalGames = data.length;
                const totalScores = data.reduce((acc, game) => acc + game.playerStats.score, 0);
                const totalRebounds = data.reduce((acc, game) => acc + game.playerStats.rebounds, 0);
                const totalAssists = data.reduce((acc, game) => acc + game.playerStats.assists, 0);

                // Calculate the averages and store them as strings with one decimal point
                const avgScore = totalGames > 0 ? (totalScores / totalGames).toFixed(1) : "0.0";
                const avgRebounds = totalGames > 0 ? (totalRebounds / totalGames).toFixed(1) : "0.0";
                const avgAssists = totalGames > 0 ? (totalAssists / totalGames).toFixed(1) : "0.0";

                setAverageStats({
                    score: avgScore,
                    rebounds: avgRebounds,
                    assists: avgAssists
                });

            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, [playerName, teamName]);
    return (
        <div>
        
            {/* Average Stats Table */}
            <div className="game-stats">
      <div className="stat-container">
        <div className="rectangle">{averageStats.score}</div>
        <div className="label">נקודות</div>
      </div>
      <div className="stat-container">
        <div className="rectangle">{averageStats.rebounds}</div>
        <div className="label">ריבאונדים</div>
      </div>
      <div className="stat-container">
        <div className="rectangle">{averageStats.assists}</div>
        <div className="label">אסיסטים</div>
      </div>
    </div>
    <div className="header-container">
        <h1> לוח משחקים </h1>
        </div>
            {/* Individual Games Stats Table */}
            <table className="game-stats-table">
                <thead>
                    <tr>
                        <th>שם היריב</th>
                        <th>תוצאה</th>
                        <th>נקודות</th>
                        <th>ריבאונדים</th>
                        <th>אסיסטים</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game, index) => (
                        <tr key={index} className={game.myTeamScore > game.otherTeamScore ? 'win' : 'loss'}>
                            <td>{game.rivalTeamName}</td>
                            <td>{`${game.myTeamScore} - ${game.otherTeamScore}`}</td>
                            <td>{game.playerStats.score}</td>
                            <td>{game.playerStats.rebounds}</td>
                            <td>{game.playerStats.assists}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default PlayerGameStats;

import React, { useState, useEffect} from 'react';

import { GameForPlayer } from '../InGameStats/gameForPlayer';
import { useParams } from 'react-router-dom';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { HeaderThree } from '../../cmps/headers/headerThree';
  const CoachPlayerStats: React.FC = () => {
    const [games, setGames] = useState<GameForPlayer[]>([]);
    const params = useParams();

    const { teamName, playerName} = params;
    const [averageStats, setAverageStats] = useState({ score: "0.0", rebounds: "0.0", assists: "0.0" });
   
    useEffect(() => {
        const fetchGames = async () => {
            if(teamName && playerName){
            const storedToken = localStorage.getItem('authToken'); // Assume the token is stored in localStorage
            try {
                const response = await fetch(`https://practi-web.onrender.com/api/games/team/${encodeURIComponent(teamName)}/player/${encodeURIComponent(playerName)}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${storedToken}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch games');
                }
                const data = await response.json();
                setGames(data);
                 // Calculate averages
                 const totalGames = data.length;
                 const totalScores = data.reduce((acc: any, game: { playerStats: { score: any; }; }) => acc + game.playerStats.score, 0);
                 const totalRebounds = data.reduce((acc: any, game: { playerStats: { rebounds: any; }; }) => acc + game.playerStats.rebounds, 0);
                 const totalAssists = data.reduce((acc: any, game: { playerStats: { assists: any; }; }) => acc + game.playerStats.assists, 0);
 
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
                alert('Error fetching games. Please try again.');
            }
        }
    };
        fetchGames();
    }, [playerName, teamName]);

    return (
        <div className="profile-page">
        <HeaderThree/>
        <div className='content-container'>
        <div>
            <h2> נתוני שחקן עבור {playerName}</h2>
            <table className="game-stats-table">
                <thead>
                    <tr>
                        <th>ממוצע נקודות</th>
                        <th>ממוצע ריבאונדים</th>
                        <th>ממוצע אסיסטים</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{averageStats.score}</td>
                        <td>{averageStats.rebounds}</td>
                        <td>{averageStats.assists}</td>
                    </tr>
                </tbody>
            </table>
        <h3> לוח משחקים </h3>
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
        </div>
      <CtaBarManager />
    </div>
    );
};

export default CoachPlayerStats;
import React, { useState, useEffect} from 'react';
import PlayerGameStats from '../../cmps/player-game-stats';
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
                const response = await fetch(`http://localhost:5000/api/games/team/${encodeURIComponent(teamName)}/player/${encodeURIComponent(playerName)}`, {
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
            <div className='playerName'> נתוני שחקן עבור {playerName}</div>
            <PlayerGameStats playerName={playerName} teamName={teamName} />
       
        </div>
        </div>
        <div className="cta-bar-container">
        <CtaBarManager />
      </div>
    </div>
    );
};

export default CoachPlayerStats;
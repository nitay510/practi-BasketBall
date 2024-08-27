import React, { useState, useEffect } from 'react';
import PlayerGameStats from '../../cmps/player-game-stats';
import { GameForPlayer } from '../InGameStats/gameForPlayer';
import { useParams } from 'react-router-dom';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { HeaderThree } from '../../cmps/headers/headerThree';
import { fetchPlayerGames } from '../../fetchFunctionsCoach'; // Import the fetch function

const CoachPlayerStats: React.FC = () => {
  const [games, setGames] = useState<GameForPlayer[]>([]);
  const { teamName, playerName } = useParams<{ teamName: string; playerName: string }>();
  const [averageStats, setAverageStats] = useState({ score: "0.0", rebounds: "0.0", assists: "0.0" });

  useEffect(() => {
    const loadPlayerGames = async () => {
      if (teamName && playerName) {
        const storedToken = localStorage.getItem('authToken'); // Assume the token is stored in localStorage
        try {
          const gamesData = await fetchPlayerGames(teamName, playerName, storedToken!);
          setGames(gamesData);

          // Calculate averages
          const totalGames = gamesData.length;
          const totalScores = gamesData.reduce((acc, game) => acc + game.playerStats.score, 0);
          const totalRebounds = gamesData.reduce((acc, game) => acc + game.playerStats.rebounds, 0);
          const totalAssists = gamesData.reduce((acc, game) => acc + game.playerStats.assists, 0);

          // Calculate the averages and store them as strings with one decimal point
          const avgScore = totalGames > 0 ? (totalScores / totalGames).toFixed(1) : "0.0";
          const avgRebounds = totalGames > 0 ? (totalRebounds / totalGames).toFixed(1) : "0.0";
          const avgAssists = totalGames > 0 ? (totalAssists / totalGames).toFixed(1) : "0.0";

          setAverageStats({
            score: avgScore,
            rebounds: avgRebounds,
            assists: avgAssists,
          });
        } catch (error) {
          console.error('Error fetching games:', error);
          alert('Error fetching games. Please try again.');
        }
      }
    };

    loadPlayerGames();
  }, [playerName, teamName]);

  return (
    <div className="profile-page">
      <HeaderThree />
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

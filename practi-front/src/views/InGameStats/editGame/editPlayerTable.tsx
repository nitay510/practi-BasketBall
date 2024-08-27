import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditPlayerRow } from './editPlayerRow';
import { Player } from '../Player';
import { Game } from '../game';
import { saveGameDetails, deletePreviousGame } from '../../../fetchFunctionsCoach'; // Import the fetch functions

interface PlayerTableProps {
  myTeamName: string;
  myTeamScore: number;
  setMyTeamScore: (score: number) => void;
  rivalTeamName: string;
  rivalTeamScore: number;
  game: Game;
}

export const EditPlayerTable: React.FC<PlayerTableProps> = ({ myTeamName, myTeamScore, setMyTeamScore, rivalTeamName, rivalTeamScore, game }) => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<Player[]>(game.playerStats);

  const handleFieldChange = (index: number, field: keyof Player, value: string) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: Number(value),
    };
    setPlayers(updatedPlayers);
  };

  const handleIncrement = (index: number, field: keyof Player, cur: number) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = {
      ...updatedPlayers[index],
      [field]: cur + 1,
    };
    setPlayers(updatedPlayers);

    if (field === 'score') {
      const newTotalScore = updatedPlayers.reduce((acc, cur) => acc + cur.score, 0);
      setMyTeamScore(newTotalScore);
    }
  };

  const handleDecrement = (index: number, field: keyof Player, cur: number) => {
    if (cur > 0) {
      const updatedPlayers = [...players];
      updatedPlayers[index] = {
        ...updatedPlayers[index],
        [field]: cur - 1,
      };
      setPlayers(updatedPlayers);

      if (field === 'score') {
        const newTotalScore = updatedPlayers.reduce((acc, cur) => acc + cur.score, 0);
        setMyTeamScore(newTotalScore);
      }
    }
  };

  // Function to save the game details and create a corresponding event
  const saveGame = async () => {
    if (myTeamScore === 0 || rivalTeamScore === 0) {
      alert('הכנס תוצאת סיום');
      return;
    }

    const storedToken = localStorage.getItem('authToken');
    const gameDetails = {
      gameDate: game.gameDate,
      teamName: myTeamName,
      rivalTeamName: rivalTeamName,
      myTeamScore: myTeamScore,
      otherTeamScore: rivalTeamScore,
      playersStats: players,
    };

    try {
      // Delete the previous game if it exists
      await deletePreviousGame(game.gameDate, game.teamName, game.rivalTeamName, storedToken!);

      // Save the new game details
      await saveGameDetails(gameDetails, storedToken!);

      // Navigate to the coach-games page after saving
      navigate('/coach-games');
    } catch (error) {
      console.error('Failed to connect to the server:', error);
      alert('Failed to save game due to an error.');
    }
  };

  return (
    <div className="player-table">
      <table>
        <thead>
          <tr>
            <th>ריבאונד</th>
            <th>אסיסט</th>
            <th>נק</th>
            <th className='name-column'>שם</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <EditPlayerRow
              key={index}
              player={player}
              index={index}
              onFieldChange={handleFieldChange}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          ))}
        </tbody>
      </table>
      <div className='buttom-buttons' style={{ textAlign: 'center', marginTop: '2vw' }}>
        <button className='save-button' onClick={saveGame} style={{ marginLeft: '10px' }}>שמור</button>
      </div>
    </div>
  );
};

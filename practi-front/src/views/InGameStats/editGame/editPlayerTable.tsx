import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EditPlayerRow } from './editPlayerRow';
import { Player } from '../Player';
import { Game } from '../game';
interface PlayerTableProps {
    myTeamName: string; // Your team
    myTeamScore: number; // Your team
    setMyTeamScore: (score: number) => void;
    rivalTeamName: string; // Rival team
    rivalTeamScore: number;
    game:Game;
}

export const EditPlayerTable: React.FC<PlayerTableProps> = ({ myTeamName, myTeamScore, setMyTeamScore, rivalTeamName, rivalTeamScore,game }) => {
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
            console.log(newTotalScore);
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
    if(myTeamScore == 0 || rivalTeamScore == 0) {
        alert('הכנס תוצאת סיום')
    }
    else {
    const storedToken = localStorage.getItem('authToken');
    const gameDetails = {
      gameDate: game.gameDate, // Current date and time for the game
      teamName: myTeamName, // Name of the coach's team
      rivalTeamName: rivalTeamName, // Opponent team's name
      myTeamScore: myTeamScore, // Coach's team score
      otherTeamScore: rivalTeamScore, // Opponent team's score
      playersStats: players // Players' statistics
    };
  
    try {
        const response2 = await fetch(`https://practi-web.onrender.com/api/games/date/${game.gameDate}/team/${game.teamName}/rivalTeam/${game.rivalTeamName}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'application/json'
            }
          });
      // Post the game information to the server
      const response = await fetch('https://practi-web.onrender.com/api/games', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${storedToken}`, // Use the stored token for authorization
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameDetails)
      });

      navigate('/coach-games');
    } catch (error) {
      // General error handling
      console.error('Failed to connect to the server:', error);
      alert('Failed to save game due to an error.');
    }
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
                <div className='buttom-buttons' style={{ textAlign: 'center', marginTop: '2vw' }}>
                <button className='save-button' onClick={saveGame} style={{ marginLeft: '10px' }}>שמור</button>
            </div>
            </table>
            <div className="player-table-modal">
            </div>

        </div>
    );
};
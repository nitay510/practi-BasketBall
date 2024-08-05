import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlayerRow } from './PlayerRow';
import { Player } from '../Player';
import { MdAdd, MdClose } from 'react-icons/md';

interface PlayerTableProps {
    myTeamName: string; // Your team
    myTeamScore: number; // Your team
    setMyTeamScore: (score: number) => void;
    rivalTeamName: string; // Rival team
    rivalTeamScore: number;
}

export const PlayerTable: React.FC<PlayerTableProps> = ({ myTeamName, myTeamScore, setMyTeamScore, rivalTeamName, rivalTeamScore }) => {
    const navigate = useNavigate();

    const [players, setPlayers] = useState<Player[]>([]);
    const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
    const [newPlayerName, setNewPlayerName] = useState('');
    useEffect(() => {
        async function fetchPlayers() {
            const storedToken = localStorage.getItem('authToken');
            const response = await fetch(`https://practi-web.onrender.com/api/teams/players`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${storedToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ teamName: myTeamName })
            });
            if (response.ok) {

                const data = await response.json();
                const initialPlayers = data.players.map((player: { fullName: string; }) => ({
                    name: player.fullName,
                    score: 0,
                    assists: 0,
                    rebounds: 0
                }));
                console.log(initialPlayers);
                setPlayers(initialPlayers);
            } else {
                console.error('Failed to fetch players:', await response.text());
            }
        }

        fetchPlayers();
    }, [myTeamName]);

    const addPlayer = () => {
        if (newPlayerName.trim()) {
            const newPlayer = {
                name: newPlayerName,
                score: 0,
                assists: 0,
                rebounds: 0
            };
            setPlayers([...players, newPlayer]);
            setNewPlayerName('');
            setShowAddPlayerModal(false);
        } else {
            alert('Please enter a player name');
        }
    };

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
    const getCurrentHourString = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0'); // Pads the hour to 2 digits if necessary
        const minutes = now.getMinutes().toString().padStart(2, '0'); // Pads the minute to 2 digits if necessary
        return `${hours}:${minutes}`; // Returns the time in "HH:MM" format
      };

// Function to save the game details and create a corresponding event
const saveGame = async () => {
    if(myTeamScore == 0 || rivalTeamScore == 0) {
        alert('הכנס תוצאת סיום')
    }
    else {
    const storedToken = localStorage.getItem('authToken');
    const gameDetails = {
      gameDate: new Date(), // Current date and time for the game
      teamName: myTeamName, // Name of the coach's team
      rivalTeamName: rivalTeamName, // Opponent team's name
      myTeamScore: myTeamScore, // Coach's team score
      otherTeamScore: rivalTeamScore, // Opponent team's score
      playersStats: players // Players' statistics
    };
  
    try {
      // Post the game information to the server
      const response = await fetch('https://practi-web.onrender.com/api/games', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${storedToken}`, // Use the stored token for authorization
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameDetails)
      });
  
      // Check if the game was saved successfully
      if (response.ok) {
        // Create an event with the game details
        const newEvent = {
          teamName: myTeamName, // Coach's team name
          type: 'game', // Type of event
          eventName: rivalTeamName, // Opponent team's name
          date: new Date(), // Current date and time
          startTime: getCurrentHourString(), // Current time in "HH:MM" format
          duration: 90 // Event duration in minutes
        };
  
        // Post the new event information
        const eventResponse = await fetch('https://practi-web.onrender.com/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}` // Use the stored token for authorization
          },
          body: JSON.stringify(newEvent)
        });
  
        if (!eventResponse.ok) {
          // Handle the case where event creation failed
          console.error('Failed to create event.');
          alert('Failed to create event. Please try again.');
          return;
        }
  
        // Navigate to the coach games page after successfully saving the game and event
        navigate('/coach-games');
      } else {
        // Handle the case where game saving failed
        console.error('Failed to save game.');
        alert('Failed to save game. Please try again.');
      }
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
                        <th className='num-column'>מס</th>
                    </tr>
                </thead>
                <tbody>
                    {players.map((player, index) => (
                        <PlayerRow
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
                <button className="add-player" onClick={() => setShowAddPlayerModal(true)}>הוסף שחקן</button>
                <button className='save-button' onClick={saveGame} style={{ marginLeft: '10px' }}>שמור</button>
            </div>
            </table>
            <div className="player-table-modal">
                {showAddPlayerModal && (
                    <div className="modal">
                        <button className="modal-close-button" onClick={() => setShowAddPlayerModal(false)}>
                            <MdClose size={24} />
                        </button>
                        <h2>הוסף שחקן</h2>
                        <input
                            type="text"
                            value={newPlayerName}
                            onChange={(e) => setNewPlayerName(e.target.value)}
                            placeholder="שם השחקן"
                        />
                        <button onClick={addPlayer}>אישור</button>
                    </div>
                )}
            </div>

        </div>
    );
};
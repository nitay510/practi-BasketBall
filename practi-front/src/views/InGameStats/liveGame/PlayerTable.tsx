import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayerRow } from './PlayerRow';
import { Player } from '../Player';
import { MdAdd, MdClose } from 'react-icons/md';
import { fetchPlayersForTeam, saveGameDetails, createNewEvent } from '../../../fetchFunctions'; // Import the fetch functions

interface PlayerTableProps {
  myTeamName: string;
  myTeamScore: number;
  setMyTeamScore: (score: number) => void;
  rivalTeamName: string;
  rivalTeamScore: number;
}

export const PlayerTable: React.FC<PlayerTableProps> = ({ myTeamName, myTeamScore, setMyTeamScore, rivalTeamName, rivalTeamScore }) => {
  const navigate = useNavigate();

  const [players, setPlayers] = useState<Player[]>([]);
  const [showAddPlayerModal, setShowAddPlayerModal] = useState(false);
  const [newPlayerName, setNewPlayerName] = useState('');

  useEffect(() => {
    const loadPlayers = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const playersData = await fetchPlayersForTeam(myTeamName, storedToken!);
        setPlayers(playersData);
      } catch (error) {
        console.error('Error loading players:', error);
      }
    };

    loadPlayers();
  }, [myTeamName]);

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = {
        name: newPlayerName,
        score: 0,
        assists: 0,
        rebounds: 0,
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
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  // Function to save the game details and create a corresponding event
  const saveGame = async () => {
    if (myTeamScore === 0 || rivalTeamScore === 0) {
      alert('הכנס תוצאת סיום');
      return;
    }

    const storedToken = localStorage.getItem('authToken');
    const gameDetails = {
      gameDate: new Date(), // Current date and time for the game
      teamName: myTeamName,
      rivalTeamName: rivalTeamName,
      myTeamScore: myTeamScore,
      otherTeamScore: rivalTeamScore,
      playersStats: players,
    };

    try {
      // Save the game details
      await saveGameDetails(gameDetails, storedToken!);

      // Create a new event with the game details
      const newEvent = {
        teamName: myTeamName,
        type: 'game',
        eventName: rivalTeamName,
        date: new Date(),
        startTime: getCurrentHourString(),
        duration: 90,
      };

      await createNewEvent( storedToken!,newEvent);

      // Navigate to the coach games page after successfully saving the game and event
      navigate('/coach-games');
    } catch (error) {
      console.error('Failed to save game:', error);
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

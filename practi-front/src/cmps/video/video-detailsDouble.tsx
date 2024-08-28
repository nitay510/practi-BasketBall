import React, { useState } from 'react';
import { submitDoubleDrillResult } from '../../fetchFunctions/fetchFunctionsPlayer'; // Import the new function

interface VideoDetailsDoubleProps {
  drillId: string;
  mission1: string;
  title: string;
  token: string;
  drillName: string;
  topic: string;
  setIsSubmit: (isSubmit: boolean) => void;
}

export const VideoDetailsDouble = ({
  drillId,
  mission1,
  title,
  token,
  drillName,
  topic,
  setIsSubmit,
}: VideoDetailsDoubleProps) => {
  const [opponent, setOpponent] = useState('');
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  const handleSubmit = async () => {
    setIsSubmit(true);

    // Data to send
    const dataToSend = {
      missionName: title,
      successes: myScore,
      drillName,
      topic,
      opponentScore,
      opponentName: opponent,
    };

    try {
      await submitDoubleDrillResult(drillId, dataToSend, token); // Use submitDoubleDrillResult
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="video-details" style={{ direction: 'rtl' }}>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            id="opponent"
            name="opponent"
            value={opponent}
            onChange={(e) => setOpponent(e.target.value)}
            placeholder="שם היריב"
          />
        </div>

        <div>
          <input
            type="number"
            id="myScore"
            name="myScore"
            value={myScore || ''}
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
              setMyScore(isNaN(newValue) ? 0 : newValue);
            }}
            placeholder="הניקוד שלי"
          />
        </div>

        <div>
          <input
            type="number"
            id="opponentScore"
            name="opponentScore"
            value={opponentScore || ''}
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
              setOpponentScore(isNaN(newValue) ? 0 : newValue);
            }}
            placeholder={`הניקוד של ${opponent}`}
          />
        </div>

        <button type="button" onClick={handleSubmit}>
          שלח
        </button>
      </form>
    </div>
  );
};

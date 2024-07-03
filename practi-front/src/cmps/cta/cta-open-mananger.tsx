import React, { useState, useEffect } from 'react';
import { Game } from '../../views/InGameStats/game';
import { useNavigate } from 'react-router-dom';


/* 
  This component is the first info about the user in the opening screen.
*/

interface CtaOpenProps {
  token: String;
}


export function CtaOpenManager({ token }: CtaOpenProps) {
  const [lastGame, setLastGame] = useState<Game | null>(null);
  const navigate = useNavigate();

  // Function to fetch the last game result
  const fetchLastGame = async () => {
    try {
      const response = await fetch('https://practi-web.onrender.com/api/games/coachLastGame', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        const game: Game = await response.json(); // Using the new Game interface
        setLastGame(game);
      } else {
        console.error('Failed to fetch the last game.');
      }
    } catch (error) {
      console.error('Error fetching the last game:', error);
    }
  };

  // Trigger fetching the last game once the component loads
  useEffect(() => {
    fetchLastGame();
  }, [token]);

  // Navigate to a specific game detail page when clicking the last game button
  const onLastGameClick = () => {
    if (lastGame) {
      navigate('/after-game-boxScore', { state: { game: lastGame } });
    }
  };

  return (
    <section className="cta-container">
      <div className="cta-btns-manager">
        <div className="start-cta-open-manager">
          <div className='bigPracti'>Practi</div>
          <div className='PractiDisc'>
            <p style={{ marginBottom: '3px' }}>העוזר האישי שלך</p>
          </div>
        </div>
        <p> המשחק האחרון שלך :</p>
        {lastGame ? (
          <button className="last-drill-btn" onClick={onLastGameClick}>
            {/* Display the last game score and teams */}
      {lastGame.teamName} vs {lastGame.rivalTeamName} - {lastGame.myTeamScore} - {lastGame.otherTeamScore}
          </button>
        ) : (
          <p> עוד לא שיחקת העונה </p>
        )}
        <p></p>
      </div>
    </section>
  );
}
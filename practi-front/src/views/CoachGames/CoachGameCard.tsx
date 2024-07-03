import React from 'react';
import { Game } from '../InGameStats/game';
import { MdAssessment, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import teamALogo from '../../assets/images/teamA.png'; // Import team A logo image
import teamBLogo from '../../assets/images/teamB.png'; // Import team B logo image
interface CoachGameCardProps {
  game: Game; // Receive a single game object
  token: string;
}

const CoachGameCard: React.FC<CoachGameCardProps> = ({ game, token }) => {
  const navigate = useNavigate();

  // Function to navigate to the after-game-boxScore page with the selected game
  const goToBoxScore = () => {
    navigate('/after-game-boxScore', { state: { game } });
  };

  // Function to delete a game with confirmation
  const deleteGame = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the game: ${game.teamName} vs ${game.rivalTeamName}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/games/date/${game.gameDate}/team/${game.teamName}/rivalTeam/${game.rivalTeamName}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Update games state or perform any necessary actions
        alert('Game deleted successfully!');
      } else {
        alert('Failed to delete game.');
      }
    } catch (error) {
      console.error('Error deleting game:', error);
      alert('Error deleting game. Please try again.');
    }
  };

  return (
      <a className={`card ${game.myTeamScore > game.otherTeamScore ? 'win' : 'loss'}`} onClick={goToBoxScore}>
        <div className="card-content">
          <div className='card-title'>
            <h2>{new Date(game.gameDate).toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })}</h2>
          </div>
          <div className='team-info right'>
            <img src={teamALogo} alt="Team A Logo" />
            <h2>{game.teamName}</h2>
          </div>
          <div className="scoreboard">
            <span>{game.myTeamScore} : {game.otherTeamScore}</span>
          </div>
          <div className='team-info left'>
            <img src={teamBLogo} alt="Team B Logo" />
            <h2>{game.rivalTeamName}</h2>
          </div>
          <div className="card-actions">
            <button onClick={deleteGame} title='Delete Game'>
              <MdDelete className='row-button' />
            </button>
          </div>
        </div>
      </a>
    );
  };

export default CoachGameCard;

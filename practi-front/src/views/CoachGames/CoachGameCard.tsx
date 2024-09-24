import React from 'react';
import { Game } from '../InGameStats/game';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import teamALogo from '../../assets/images/teamA.png'; // Default team A logo image
import teamBLogo from '../../assets/images/teamB.png'; // Default team B logo image
import misgavLogo from '../../assets/images/misgav.png'; // Specific club logo
import { deleteGameByDetails } from '../../fetchFunctions/fetchFunctionsCoach'; // Import the delete function

interface CoachGameCardProps {
  game: Game; // Receive a single game object
  token: string;
  club: string;
}

// Map club names to image imports
const clubLogoMap: { [key: string]: string } = {
  "הפועל משגב": misgavLogo,
};

// Function to dynamically load a club image if it exists
const loadClubLogo = (club: string) => {
  const clubImageFileName = clubLogoMap[club]; // Check if the club exists in the map
  if (clubImageFileName) {
    return clubImageFileName; // Load the specific club image directly from the map
  }
  return teamALogo; // Fallback to the default team A logo
};

const CoachGameCard: React.FC<CoachGameCardProps> = ({ game, token, club }) => {
  const navigate = useNavigate();

  // Function to navigate to the after-game-boxScore page with the selected game
  const goToBoxScore = () => {
    navigate('/after-game-boxScore', { state: { game } });
  };

  // Function to delete a game with confirmation
  const deleteGame = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the game?`);
    if (!confirmDelete) return;

    try {
      await deleteGameByDetails(game.gameDate, game.teamName, game.rivalTeamName, token);
      alert('Game deleted successfully!');
    } catch (error) {
      alert('Failed to delete game. Please try again.');
    }
  };

  return (
    <a className={`card ${game.myTeamScore > game.otherTeamScore ? 'win' : 'loss'}`}>
      <div className="card-content">
        <div className="card-title">
          <h2>{new Date(game.gameDate).toLocaleDateString('en-US', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}</h2>
        </div>
        <div className="team-info right" onClick={goToBoxScore}>
          <img src={loadClubLogo(club)} alt="Team A Logo" />
          <h2>{club}</h2>
        </div>
        <div className="scoreboard" onClick={goToBoxScore}>
          <span>{game.myTeamScore} : {game.otherTeamScore}</span>
        </div>
        <div className="team-info left" onClick={goToBoxScore}>
          <img src={teamBLogo} alt="Team B Logo" />
          <h2>{game.rivalTeamName}</h2>
        </div>
        <div className="card-actions">
          <button onClick={deleteGame} title="Delete Game">
            <MdDelete className="row-button" />
          </button>
        </div>
      </div>
    </a>
  );
};

export default CoachGameCard;

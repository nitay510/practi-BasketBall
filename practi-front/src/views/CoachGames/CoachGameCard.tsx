import React from 'react';
import { Game } from '../InGameStats/game';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import teamALogo from '../../assets/images/teamA.png'; // Default team A logo image
import teamBLogo from '../../assets/images/teamB.png'; // Default team B logo image
import { deleteGameByDetails } from '../../fetchFunctions/fetchFunctionsCoach'; // Import the delete function
import { clubLogoMap } from '../../assets/clubLogoMap'; // Import the club logo map

interface CoachGameCardProps {
  game: Game; // Receive a single game object
  token: string;
  club: string;
}

// Function to dynamically load a club image if it exists
const loadClubLogo = (club: string) => {
  console.log(club);
  const clubImageFileName = clubLogoMap[club]; // Check if club exists in the map
  console.log(clubImageFileName);
  if (clubImageFileName) {
    try {
      return require(`../../assets/images/${clubImageFileName}`); // Load the specific club image
    } catch (error) {
      console.error("Club image not found:", clubImageFileName, error);
      return teamALogo; // Fallback to default team A logo
    }
  }
  return teamALogo; // Fallback if club is not in the map
};

const CoachGameCard: React.FC<CoachGameCardProps> = ({ game, token, club }) => {
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
      await deleteGameByDetails(game.gameDate, game.teamName, game.rivalTeamName, token);
      alert('Game deleted successfully!');
      // Perform additional state updates or fetch the updated list of games if needed
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
          <img src={loadClubLogo(game.teamName)} alt="Team A Logo" />
          <h2>{game.teamName}</h2>
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

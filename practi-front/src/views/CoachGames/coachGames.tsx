import React, { useState, useEffect } from 'react';
import { MdFilterAlt, MdAdd } from 'react-icons/md';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import CoachGameCard from './CoachGameCard';
import { useNavigate } from 'react-router-dom';
import { Game } from '../InGameStats/game';
import { HeaderThree } from '../../cmps/headers/headerThree';
import FilterModal from './FilterModal';
import { fetchTeams, fetchGames } from '../../fetchFunctions'; // Import fetch functions
import AddGameModal from './AddGameModal'; // Import the new AddGameModal component

interface CoachGameProps {
  token: string;
  master: boolean;
  club: string;
}

const CoachGames: React.FC<CoachGameProps> = ({ token, master, club }) => {
  const [startNewGameModal, setStartNewGameModal] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState<Game[]>([]);
  const [myTeamName, setMyTeamName] = useState('');
  const [rivalTeamName, setRivalTeamName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch and set teams based on the user’s role (master or regular)
    const storedToken = localStorage.getItem('authToken') || token;
    fetchTeams(club, storedToken, master).then((teamsData) => {
      setTeams(teamsData);
      setSelectedTeams(teamsData.map((team: { teamName: string }) => team.teamName)); // Select all teams by default
    });
  }, [token, master, club]);

  useEffect(() => {
    // Fetch and set games based on the user’s role (master or regular)
    const storedToken = localStorage.getItem('authToken') || token;
    fetchGames(storedToken, master,club).then((gamesData) => setGames(gamesData));
  }, [token, master]);

  useEffect(() => {
    // Convert start and end dates to Date objects
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;

    // Filter games based on selected teams and dates
    const newSelectedGames = games.filter(game => {
      return selectedTeams.includes(game.teamName) && isDateInRange(new Date(game.gameDate), startDateObj, endDateObj);
    });

    // Update selectedGames state
    setSelectedGames(newSelectedGames);
  }, [selectedTeams, startDate, endDate, games]);

  const addGame = () => {
    // Validate if the required fields are filled before navigating
    let missingFields = [];
    if (!myTeamName) missingFields.push('הקבוצה שלך');
    if (!rivalTeamName) missingFields.push('קבוצת היריב');

    if (missingFields.length > 0) {
      setErrorMessage(`לא מילאת את: ${missingFields.join(', ')}`);
      return;
    }

    navigate(`/gameScores/${encodeURIComponent(myTeamName)}/${encodeURIComponent(rivalTeamName)}`);
  };

  // Function to check if a date is within the selected range
  const isDateInRange = (gameDate: Date, startDate: Date | null, endDate: Date | null) => {
    const getDateOnly = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
    const gameDateOnly = getDateOnly(gameDate);
    const startDateOnly = startDate ? getDateOnly(startDate) : null;
    const endDateOnly = endDate ? getDateOnly(endDate) : null;
  
    if (!startDateOnly && !endDateOnly) return true;
    if (!startDateOnly) return gameDateOnly <= endDateOnly;
    if (!endDateOnly) return gameDateOnly >= startDateOnly;
    return gameDateOnly >= startDateOnly && gameDateOnly <= endDateOnly;
  };

  // Function to apply filters and close the filter modal
  const handleApplyFilters = (start: string, end: string, selectedTeams: string[]) => {
    setStartDate(start);
    setEndDate(end);
    setSelectedTeams(selectedTeams);
    setFilterModalOpen(false);
  };

  return (
    <div className='coach-games'>
      <div className='content-container'>
        <HeaderThree />
        <div className='title-container'>
          <h2>לוח משחקים</h2>
          <div className='filter-buttons'>
            <button onClick={() => setFilterModalOpen(true)}>
              <MdFilterAlt className='filter-button' />
            </button>
            <button onClick={() => {
              setErrorMessage('');
              setStartNewGameModal(true);
            }}>
              <MdAdd className='add-button' />
            </button>
          </div>
        </div>
        <div className="game-cards-container">
          {selectedGames.map((game, index) => (
            <CoachGameCard key={index} game={game} token={token} />
          ))}
        </div>

        <button className='add-new-game' onClick={() => {
          setErrorMessage('');
          setStartNewGameModal(true);
        }}>
          הוסף משחק חדש
        </button>
        {startNewGameModal && (
          <AddGameModal
            teams={teams}
            myTeamName={myTeamName}
            setMyTeamName={setMyTeamName}
            rivalTeamName={rivalTeamName}
            setRivalTeamName={setRivalTeamName}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            onClose={() => setStartNewGameModal(false)}
            onAddGame={addGame}
          />
        )}
        {/* Filter Modal */}
        <FilterModal
          teams={teams}
          selectedTeams={selectedTeams}
          setSelectedTeams={setSelectedTeams}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          isOpen={filterModalOpen}
          onClose={() => setFilterModalOpen(false)}
          onApplyFilters={handleApplyFilters}
        />
      </div>
      <div className='cta-bar-container'>
        <CtaBarManager />
      </div>
    </div>
  );
};

export default CoachGames;

import React, { useState, useEffect } from 'react';
import { MdClose, MdFilterAlt, MdSort, MdAdd } from 'react-icons/md';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import CoachGameCard from './CoachGameCard';
import { useNavigate } from 'react-router-dom';
import { Game } from '../InGameStats/game';
import { HeaderThree } from '../../cmps/headers/headerThree';
import DropdownMenu from './DropdownMenu';
import FilterModal from './FilterModal';

interface CoachGameProps {
  token: string;
  master: boolean;
  club: string;
}

const CoachGames: React.FC<CoachGameProps> = ({ token, master, club }) => {
  const [startNewGameModal, setStartNewGameModal] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortingOptionsOpen, setSortingOptionsOpen] = useState(false);
  const [sortingOption, setSortingOption] = useState<string>('alphabetical');

  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState<Game[]>([]);
  const [myTeamName, setMyTeamName] = useState('');
  const [rivalTeamName, setRivalTeamName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [selectedGames, setSelectedGames] = useState<Game[]>([]); // New state for selected games
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

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


  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const storedToken = localStorage.getItem('authToken') || token;
        let response;
        if (master) {
          response = await fetch(`https://practi-web.onrender.com/api/teams/club?clubName=${encodeURIComponent(club)}`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
        } else {
          response = await fetch('https://practi-web.onrender.com/api/teams', {
            headers: { 'Authorization': `Bearer ${storedToken}` }
          });
        }
        if (response.ok) {
          const teamsData = await response.json();
          setTeams(teamsData);
          setSelectedTeams(teamsData.map((team: { teamName: any; }) => team.teamName)); // Select all teams by default
        } else {
          console.error('Failed to fetch teams');
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };
    fetchTeams();
  }, [token, master, club]);

  useEffect(() => {
    const fetchGames = async () => {
      let storedToken = localStorage.getItem('authToken');
      if (!storedToken) {
        storedToken = token;
      }

      try {
        const response = await fetch('https://practi-web.onrender.com/api/games/coach', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) throw new Error('Failed to fetch games');
        const data = await response.json();
        setGames(data.sort((a: { gameDate: Date; }, b: { gameDate: Date; }) => new Date(b.gameDate).getTime() - new Date(a.gameDate).getTime())); // Sort by date initially
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };
    fetchGames();
  }, []);
  const addGame = () => {
    let missingFields = [];
    if (!myTeamName) {
      missingFields.push('הקבוצה שלך');
    }
    if (!rivalTeamName) {
      missingFields.push('קבוצת היריב');
    }
    if (missingFields.length > 0) {
      setErrorMessage(`לא מילאת את: ${missingFields.join(', ')}`);
      return;
    }
    navigate(`/gameScores/${encodeURIComponent(myTeamName)}/${encodeURIComponent(rivalTeamName)}`);
  };


  const isDateInRange = (gameDate: Date, startDate: Date | null, endDate: Date | null) => {
    if (!startDate && !endDate) {
      return true;
    } else if (!startDate && endDate) {
      return gameDate <= endDate;
    } else if (startDate && !endDate) {
      return gameDate >= startDate;
    } else {
      return gameDate >= startDate && gameDate <= endDate;
    }
  };

  // Function to sort games alphabetically by team's name
  const sortGamesByName = () => {
    setGames(prevGames => {
      const sortedGames = [...prevGames].sort((a, b) => {
        if (a.teamName < b.teamName) {
          return -1;
        }
        if (a.teamName > b.teamName) {
          return 1;
        }
        // If team names are equal, continue comparing by other properties
        return 0;
      });
      return sortedGames;
    });
  };

  const sortGamesByDate = () => {
    setGames(prevGames => {
      const sortedGames = [...prevGames].sort((a, b) => {
        return new Date(b.gameDate).getTime() - new Date(a.gameDate).getTime();
      });
      return sortedGames;
    });
  }

  const handleSortingOptionChange = (option: string) => {
    setSortingOption(option);
    setSortingOptionsOpen(false);
    if (option === 'לפי שם') {
      console.log("Sorting by name");
      sortGamesByName(); // Call the sort function if sorting by name is selected
    }
    else if (option === 'לפי זמן') {
      sortGamesByDate();
    }
  };

  // Function to apply filters
  const handleApplyFilters = (start: string, end: string, selectedTeams: string[]) => {
    // Close the modal and keep the selected filters local until they are applied
    setStartDate(start);
    setEndDate(end);
    setSelectedTeams(selectedTeams);
    setFilterModalOpen(false); // Close the modal after applying filters
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
            <button onClick={() => setSortingOptionsOpen(!sortingOptionsOpen)}>
              <MdSort className='sort-button' />
            </button>
            <button onClick={() => {
              setErrorMessage('');
              setStartNewGameModal(true);
            }}>
              <MdAdd className='add-button' />
            </button>
            {sortingOptionsOpen && (
              <DropdownMenu
                options={['לפי שם', 'לפי זמן']}
                onSelectOption={(option) => handleSortingOptionChange(option)}
                selectedOption={sortingOption} // Pass selectedOption prop
              />
            )}
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
          <div className='new-game-modal'>
            <button className='modal-close-button' onClick={() => {
              setStartNewGameModal(false);
              setErrorMessage('');
            }}>
              <MdClose />
            </button>
            <h4>הוסף משחק חדש</h4>
            <select
              value={myTeamName}
              onChange={(e) => setMyTeamName(e.target.value)}
              placeholder='הקבוצה שלך'
              style={{ borderColor: !myTeamName && errorMessage ? 'red' : '' }}
            >
              <option value=''>בחר קבוצה</option>
              {teams.map((team, index) => (
                <option key={index} value={team.teamName}>
                  {team.teamName}
                </option>
              ))}
            </select>
            <input
              type='text'
              value={rivalTeamName}
              onChange={(e) => setRivalTeamName(e.target.value)}
              placeholder='שם הקבוצה היריבה'
              style={{ borderColor: !rivalTeamName && errorMessage ? 'red' : '' }}
            />
            <button onClick={addGame}>הוסף משחק</button>
            {errorMessage && (
              <p style={{
                color: 'red',
                fontSize: '1.25em',
                marginTop: '10px',
               // backgroundColor: '#ffe6e6',
                //padding: '10px',
                //borderRadius: '5em',
                textAlign: 'center'
              }}>
                {errorMessage}
              </p>
            )}

          </div>
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

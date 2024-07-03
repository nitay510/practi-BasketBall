import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { HeaderThree } from '../../cmps/headers/headerThree';
import { Game } from '../InGameStats/game';
import { EventModal } from './EventModal'; // Import the EventModal component
import { EventCard } from '../EventList/EventCard'; // Import the EventCard component
import { MdAdd, MdClose, MdFilterAlt, MdSort } from 'react-icons/md';
import DropdownMenu from '../CoachGames/DropdownMenu';
import EventFilterModal from '../EventList/EventFilterModal';

interface WeeklyCalendarProps {
  token: string,
  setLoginStatus: (isLogin: boolean) => void;
}

interface Event {
  _id: string,
  username: string,
  teamName: string,
  type: string, // 'meeting', 'task', 'event'
  eventName: string, // name of the event
  date: string, // date of the event
  startTime: string, // start time of the event
  duration: number, // duration of the event in hours
  tasks: string[]; // list of tasks
}

const getWeekDates = (weekOffset: number) => {
  const currentDate = new Date();
  const dayOfWeek = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - dayOfWeek + (weekOffset * 7));

  const weekDates = Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(startOfWeek);
    day.setDate(day.getDate() + index);
    return day;
  });

  return weekDates;
};

export function WeeklyCalendar({ token, setLoginStatus }: WeeklyCalendarProps): JSX.Element {
  const [teams, setTeams] = useState<{ teamName: string }[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [events, setEvents] = useState<Event[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [sortingOptionsOpen, setSortingOptionsOpen] = useState(false);
  const [sortingOption, setSortingOption] = useState<string>('alphabetical');
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const storedToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(
          `http://localhost:5000/api/events`,
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const events: Event[] = await response.json();
        const now = new Date();
        const remainingEvents = [];
        const completedGames = [];

        for (const event of events) {
          const eventDate = new Date(event.date);

          if (event.type === 'game' && eventDate < now) {
            const gameResponse = await fetch(
              `http://localhost:5000/api/games/date/${event.date}/team/${event.teamName}/rivalTeam/${event.eventName}`,
              {
                headers: {
                  Authorization: `Bearer ${storedToken}`,
                },
              }
            );

            if (gameResponse.ok) {
              const game = await gameResponse.json();
              if (game[0]) {
                completedGames.push(game[0]);
              }
            } else {
              console.warn(`Game not found for event: ${event._id}`);
            }
          } else {
            remainingEvents.push(event);
          }
        }

        setEvents(remainingEvents);
        setGames(completedGames);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchTeams = async () => {
      try {
        const storedToken = localStorage.getItem('authToken') || token;
        let response;
          response = await fetch('http://localhost:5000/api/teams', {
            headers: { 'Authorization': `Bearer ${storedToken}` }
          });
        
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

    fetchEvents();
    setSelected();
  }, [token]);

  const handleGameClick = (game: Game) => {
    navigate('/after-game-boxScore', { state: { game } });
  }

  const setSelected = () => {
    if(startDate === '' && endDate === '') {
      setSelectedEvents(events.filter(event => selectedTeams.includes(event.teamName)));
    } else if(startDate === '') {
      setSelectedEvents(events.filter(event => selectedTeams.includes(event.teamName) && new Date(event.date) <= new Date(endDate)));
    }
    else if(endDate === '') {
      setSelectedEvents(events.filter(event => selectedTeams.includes(event.teamName) && new Date(event.date) >= new Date(startDate)));
    }
    else
    {
      setSelectedEvents(events.filter(event => selectedTeams.includes(event.teamName) && new Date(event.date) >= new Date(startDate) && new Date(event.date) <= new Date(endDate)));
    }
  }

  const handleApplyFilters = (start: string, end: string, selectedTeams: string[]) => {
    // Close the modal and keep the selected filters local until they are applied
    setStartDate(start);
    setEndDate(end);
    setSelectedTeams(selectedTeams);
    setSelected();
    setFilterModalOpen(false); // Close the modal after applying filters
  };

  const handleNewEventClick = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    let nextHour = now.getHours();

    if (minutes > 0) {
      nextHour += 1;
    }

    const date = now.toISOString().split('T')[0];
    const startTime = `${nextHour.toString().padStart(2, '0')}:00`;
    navigate(`/newEvent?date=${encodeURIComponent(date)}&startTime=${encodeURIComponent(startTime)}`);
  };

  const handleNewGameClick = () => {
    const now = new Date();
    const minutes = now.getMinutes();
    let nextHour = now.getHours();

    if (minutes > 0) {
      nextHour += 1;
    }

    const date = now.toISOString().split('T')[0];
    const startTime = `${nextHour.toString().padStart(2, '0')}:00`;
    navigate(`/newGameEvent?date=${encodeURIComponent(date)}&startTime=${encodeURIComponent(startTime)}`);
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

  return (
    <div className='coach-games'>
      <div className='content-container'>
        <HeaderThree />
        <div className='title-container'>
          <h2>אירועים</h2>
          <div className='filter-buttons'>
            <button onClick={() => setFilterModalOpen(true)}>
              <MdFilterAlt className='filter-button' />
            </button>
            <button onClick={() => setSortingOptionsOpen(!sortingOptionsOpen)}>
              <MdSort className='sort-button' />
            </button>
            {sortingOptionsOpen && (
              <DropdownMenu
                options={['לפי שם', 'לפי זמן']}
                onSelectOption={(option) => handleSortingOptionChange(option)}
                selectedOption={sortingOption} // Pass selectedOption prop
              />
            )}
          </div>
          <button className="add-new-game" onClick={() => setModalOpen(true)}>
            הוסף אירוע חדש
          </button>
          {modalOpen && (
            <div className="new-game-modal">
              <div className="add-team-popup">
                <button className="modal-close-button" onClick={() => setModalOpen(false)}>
                  <MdClose size={24} />
                </button>
                <h2>בחר סוג אירוע</h2>
                <button onClick={handleNewEventClick}>אימון חדש</button> <br />
                <button onClick={handleNewGameClick}>משחק חדש</button>
              </div>
            </div>)}
         
        </div>
        <div className="game-cards-container">
          {selectedEvents.map((event, index) => (
            <EventCard key={index} event={event} token={token} />
          ))}
        </div>
        <EventFilterModal
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
}

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { HeaderThree } from '../../cmps/headers/headerThree';
import { Game } from '../InGameStats/game';
import { EventCard } from '../EventList/EventCard';
import { MdAdd, MdClose, MdFilterAlt } from 'react-icons/md';
import EventFilterModal from '../EventList/EventFilterModal';
import { fetchTeams, fetchEvents, fetchGameDetails } from '../../fetchFunctions/fetchFunctionsCoach'; // Import the fetch functions

interface WeeklyCalendarProps {
  token: string;
  setLoginStatus: (isLogin: boolean) => void;
}

interface Event {
  _id: string;
  username: string;
  teamName: string;
  type: string;
  eventName: string;
  date: string;
  startTime: string;
  duration: number;
  tasks: string[];
}

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
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);

  const nearestFutureEventRef = useRef<HTMLDivElement>(null);

  const getDateOnly = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const storedToken = localStorage.getItem('authToken') || token;

      try {
        const teamsData = await fetchTeams('no relevant',storedToken,false);
        setTeams(teamsData);
        setSelectedTeams(teamsData.map((team: { teamName: string }) => team.teamName)); // Select all teams by default

        const eventsData = await fetchEvents(storedToken);
        const now = getDateOnly(new Date());
        const remainingEvents = [];
        const completedGames = [];

        for (const event of eventsData) {
          const eventDate = getDateOnly(new Date(event.date));

          if (event.type === 'game' && eventDate < now) {
            const gameDetails = await fetchGameDetails(
              storedToken,
              event.date,
              event.teamName,
              event.eventName
            );
            if (gameDetails) {
              completedGames.push(gameDetails);
            }
          } else {
            remainingEvents.push(event);
          }
        }

        setEvents(remainingEvents);
        setGames(completedGames);
        setSelectedEvents(remainingEvents); // Set initial selected events to all events
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };

    fetchInitialData();
  }, [token]);

  useEffect(() => {
    setSelected();
  }, [startDate, endDate, selectedTeams]);

  useEffect(() => {
    setSelected();
  }, [events, startDate, endDate, selectedTeams]);

  const setSelected = () => {
    const start = startDate ? getDateOnly(new Date(startDate)) : null;
    const end = endDate ? getDateOnly(new Date(endDate)) : null;

    let filteredEvents = events.filter((event) => selectedTeams.includes(event.teamName));

    if (start) {
      filteredEvents = filteredEvents.filter((event) => getDateOnly(new Date(event.date)) >= start);
    } else {
      // Filter events that start after yesterday if no start date is specified
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      filteredEvents = filteredEvents.filter((event) => getDateOnly(new Date(event.date)) > yesterday);
    }

    if (end) {
      filteredEvents = filteredEvents.filter((event) => getDateOnly(new Date(event.date)) <= end);
    }

    setSelectedEvents(filteredEvents);
  };

  useEffect(() => {
    if (nearestFutureEventRef.current) {
      nearestFutureEventRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedEvents]);

  const handleApplyFilters = (start: string, end: string, selectedTeams: string[]) => {
    setStartDate(start);
    setEndDate(end);
    setSelectedTeams(selectedTeams);
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

  const groupEventsByDate = (events: Event[]) => {
    return events.reduce((acc, event) => {
      if (!acc[event.date]) {
        acc[event.date] = [];
      }
      acc[event.date].push(event);
      return acc;
    }, {} as Record<string, Event[]>);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dayNames = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
    const dayName = dayNames[date.getDay()];
    return `${dayName} ${date.toLocaleDateString('he-IL', { day: '2-digit', month: '2-digit' })} `;
  };

  const sortedEvents = selectedEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastEvents = sortedEvents.filter((event) => getDateOnly(new Date(event.date)) < getDateOnly(new Date()));
  const futureEvents = sortedEvents.filter((event) => getDateOnly(new Date(event.date)) >= getDateOnly(new Date()));

  const renderEvents = (events: Event[]) => {
    const groupedEvents = groupEventsByDate(events);

    return Object.entries(groupedEvents).map(([date, eventsForDate]) => (
      <div key={date}>
        <h3 style={{ margin: '1vh 2vw' }}>{formatDate(date)}</h3>
        {eventsForDate.map((event) => (
          <EventCard key={event._id} event={event} token={token} />
        ))}
      </div>
    ));
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
            <button onClick={() => setModalOpen(true)}>
              <MdAdd className='sort-button' />
            </button>
          </div>
          {modalOpen && (
            <div className='new-game-modal'>
              <div className='add-team-popup'>
                <button className='modal-close-button' onClick={() => setModalOpen(false)}>
                  <MdClose size={24} />
                </button>
                <h2>בחר סוג אירוע</h2>
                <button onClick={handleNewEventClick} style={{ marginRight: '7vh' }}>
                  אימון חדש
                </button>
                <br />
                <button onClick={handleNewGameClick}>משחק חדש</button>
              </div>
            </div>
          )}
        </div>
        <div className='event-cards-container'>
          {renderEvents(pastEvents.reverse())}
          {renderEvents(futureEvents)}
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
        <button className='add-new-game' onClick={() => setModalOpen(true)}>
          הוסף אירוע חדש
        </button>
      </div>
      <div className='cta-bar-container'>
        <CtaBarManager />
      </div>
    </div>
  );
}

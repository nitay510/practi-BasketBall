import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { HeaderThree } from '../../cmps/headers/headerThree';
import { Game } from '../InGameStats/game';
import { EventModal } from './EventModal'; // Import the EventModal component

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

function getWeekNumber(d: Date): [number, number] {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return [d.getUTCFullYear(), weekNo];
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

const getWeekStartAndEnd = (weekOffset: number) => {
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (weekOffset * 7));

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  return {
    startDate: startOfWeek,
    endDate: endOfWeek
  };
};

export function WeeklyCalendar({ token, setLoginStatus }: WeeklyCalendarProps): JSX.Element {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [games, setGames] = useState<Game[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async (startDate: Date, endDate: Date) => {
      const storedToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(
          `https://practi-web.onrender.com/api/events/date-range?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`,
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
              `https://practi-web.onrender.com/api/games/date/${event.date}/team/${event.teamName}/rivalTeam/${event.eventName}`,
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

    const { startDate, endDate } = getWeekStartAndEnd(currentWeek);
    fetchEvents(startDate, endDate);
  }, [currentWeek, token]);

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const hours = Array.from({ length: 10 }, (_, i) => 14 + i);
  const weekDates = getWeekDates(currentWeek);
  const now = new Date();
  const today = now.getDay();
  const currentHour = now.getHours();

  const isCurrentTime = (dayIndex: number, hour: number) => {
    return dayIndex === today && hour === currentHour;
  };

  const changeWeek = (direction: number) => {
    setCurrentWeek(prevWeek => prevWeek + direction);
  };

  const isThereEvent = (dayIndex: number, hour: number) => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === weekDates[dayIndex].getDate() && isHourInsideEvent(dayIndex, hour);
    });
  }

  const getColor = (dayIndex: number, hour: number) => {
    if (isHourInsideEvent(dayIndex, hour)) return 'red';
    if (isCurrentTime(dayIndex, hour)) return 'yellow';
    return 'transparent';
  }

  const getName = (dayIndex: number, hour: number) => {
    let result = '';
    const checkHour = `${hour}:00`;
    events.forEach(event => {
      const eventDate = new Date(event.date);
      if (eventDate.getDate() === weekDates[dayIndex].getDate() && event.startTime === checkHour) {
        result = event.eventName;
      }
    });
    return result;
  }

  const calculateEndTime = (startTime: string, duration: number) => {
    const startTimeArray = startTime.split(':');
    const startHour = parseInt(startTimeArray[0]);
    const startMinute = parseInt(startTimeArray[1]);

    const endMinute = (startMinute + duration) % 60;
    const endHour = startHour + Math.floor((startMinute + duration) / 60);

    return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  };

  const isHourInsideEvent = (dayIndex: number, hour: number) => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === weekDates[dayIndex].getDate() && parseInt(event.startTime) <= hour && parseInt(event.startTime) + event.duration / 60 > hour;
    });
  }

  const handleEmptyCellClick = (date: string, startTime: string) => {
    setSelectedDate(date);
    setSelectedTime(startTime);
    setModalOpen(true);
  };

  const handleCellClick = (dayIndex: number, hour: number) => {
    const date = weekDates[dayIndex].toISOString().split('T')[0];
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const event = events.find(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === weekDates[dayIndex].getDate() && event.startTime === startTime;
    });

    if (event) {
      if (event.type === 'game') {
        navigate(`/gameEvent/${event._id}`);
      } else {
        navigate(`/event/${event._id}`);
      }
    } else {
      handleEmptyCellClick(date, startTime);
    }
  }

  const handleGameClick = (game: Game) => {
    navigate('/after-game-boxScore', { state: { game } });
  }

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

  const handleModalNewEvent = () => {
    navigate(`/newEvent?date=${encodeURIComponent(selectedDate)}&startTime=${encodeURIComponent(selectedTime)}`);
  };

  const handleModalNewGame = () => {
    navigate(`/newGameEvent?date=${encodeURIComponent(selectedDate)}&startTime=${encodeURIComponent(selectedTime)}`);
  };

  return (
    <div className='calendarPage'>
      <HeaderThree />
    
        <div className='calendar'>
          <div className='calendarHeader'>
            לוז שבועי
          </div>
          <div>
          <button onClick={() => changeWeek(-1)}>שבוע קודם</button>
          <button onClick={() => changeWeek(1)}>שבוע הבא</button>
          </div>
          <div>
          <button onClick={handleNewEventClick}>הוסף אימון</button>
          <button onClick={handleNewGameClick}>הוסף משחק</button>
          </div>
          {modalOpen && (
        <div className="add-team-popup-container">
          <div className="add-team-popup">
            <EventModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              onNewEvent={handleModalNewEvent}
              onNewGame={handleModalNewGame}
            />
          </div>
        </div>
      )}
          <table>
            <thead>
              <tr>
                <th>Time</th>
                {weekDates.map((date, index) => (
                  <th key={index}>
                    {daysOfWeek[index]}<br />
                    {date.toLocaleDateString()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) =>
                <tr key={hour}>
                  <th>{hour}:00</th>
                  {weekDates.map((date, index) => {
                    const eventsForThisHour = events.filter((event) => {
                      const eventDate = new Date(event.date);
                      return eventDate.getDate() === date.getDate() && parseInt(event.startTime) === hour;
                    });

                    console.log(games)
                    const gamesForThisHour = games.filter((game) => {
                      const gameDate = new Date(game.gameDate);
                      const gameHour = gameDate.getHours(); // Get the hour portion from the game date
                      return gameDate.getDate() === date.getDate() && gameHour === hour;
                    });

                    const cellColor = getColor(index, hour);
                    const cellName = getName(index, hour);

                    return (
                      <td key={`${index}-${hour}`} style={{ backgroundColor: cellColor }} onClick={() => handleCellClick(index, hour)}>
                        {eventsForThisHour.map((event) => (
                          <div key={event._id} style={{ color: 'white' }}>
                            {cellName} <br />
                            {event.startTime} - {calculateEndTime(event.startTime, event.duration)} <br />
                          </div>
                        ))}
                        {gamesForThisHour.map((game) => (
                          <div key={game.gameDate.toString()} style={{ color: 'white' }} onClick={() => handleGameClick(game)}>
                            {game.teamName} - {game.rivalTeamName} <br />
                            {game.myTeamScore} - {game.otherTeamScore} <br />
                          </div>
                        ))}
                      </td>
                    );
                  })}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      <div className='cta-bar-container'>
        <CtaBarManager />
      </div>

    </div>
  );
}

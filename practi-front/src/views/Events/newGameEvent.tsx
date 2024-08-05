import React, { useState, useEffect } from 'react';
import { HeaderThree } from '../../cmps/headers/headerThree';
import { useNavigate, useLocation } from 'react-router-dom';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';

interface NewEventGameProps {
  token: string; // Function to set the authentication token
}

interface Team {
  teamName: string;
}

export function NewGameEvent({ token }: NewEventGameProps): JSX.Element {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration] = useState('120'); // Fixed duration set to 120
  const [tasks, setTasks] = useState<string[]>([]);
  const [isEventNameFocused, setIsEventNameFocused] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchTeams();
    // Parse URL query parameters
    const params = new URLSearchParams(location.search);
    const urlDate = params.get('date');
    const urlStartTime = params.get('startTime');
    if (urlDate) setDate(urlDate);
    if (urlStartTime) setStartTime(urlStartTime);
  }, []);

  const fetchTeams = async () => {
    const storedToken = localStorage.getItem('authToken') || token;
    try {
      const response = await fetch('https://practi-web.onrender.com/api/teams', {
        headers: { Authorization: `Bearer ${storedToken}` },
      });
      if (response.ok) {
        const teamsData = await response.json();
        setTeams(teamsData);
      } else {
        console.error('Failed to fetch teams.');
      }
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'eventName':
        setEventName(value);
        break;
      case 'date':
        setDate(value);
        break;
      case 'startTime':
        setStartTime(value);
        break;
      default:
        break;
    }
  };

  const handleNewEvent = async () => {
    if (!selectedTeam || !eventName || !date || !startTime || !duration) {
      alert('Please fill in all required fields.');
      return;
    }

    const newEvent = {
      teamName: selectedTeam,
      type: 'game',
      eventName,
      date,
      startTime,
      duration,
      tasks,
    };
    const storedToken = localStorage.getItem('authToken');
    try {
      const response = await fetch('https://practi-web.onrender.com/api/events', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify(newEvent),
      });

      if (response.ok) {
        navigate('/week-calendar');
      } else {
        const result = await response.json();
        throw result.error || 'Error creating event';
      }
    } catch (err) {
      throw 'Failed to connect to the server.';
    }
  };

  return (
    <div className="newEventPage">
      <HeaderThree />
      <div className="signup-form">
        <h2>משחק חדש</h2>
        <div className="custom-input-container">
          <select
            id="teamSelect"
            name="teamSelect"
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            required
          >
            <option value="">בחר קבוצה</option>
            {teams.map((team, index) => (
              <option key={index} value={team.teamName}>
                {team.teamName}
              </option>
            ))}
          </select>
          <label htmlFor="teamSelect">שם הקבוצה</label>
        </div>
        <div className="custom-input-container">
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventName}
            onChange={handleInputChange}
            onFocus={() => setIsEventNameFocused(true)}
            onBlur={() => setIsEventNameFocused(false)}
            placeholder={!isEventNameFocused && !eventName ? 'שם היריבה' : ''}
            required
          />
          {(isEventNameFocused || eventName) && (
            <label htmlFor="eventName">שם היריבה</label>
          )}
        </div>
        <div className="custom-input-container">
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            placeholder="Start Date"
            style={{ backgroundColor: '#f8f8f8', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', color: 'black' }}
            required
          />
          <label htmlFor="date">תאריך</label>
        </div>
        <div className="custom-input-container">
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={startTime}
            onChange={handleInputChange}
            placeholder={!startTime ? 'שעת התחלה' : ''}
            style={{ backgroundColor: '#f8f8f8', border: '1px solid #ccc', padding: '10px', borderRadius: '4px', color: 'black' }}
            required
            step="60" // Optional: set step to 60 for minute intervals, or 1 for second intervals
          />
          <label htmlFor="startTime">שעת התחלה</label>
        </div>

        <input type="hidden" id="duration" name="duration" value={duration} />
        <button className="signup-button" onClick={handleNewEvent}>
          צור אירוע
        </button>
      </div>
      <div className="cta-bar-container">
        <CtaBarManager />
      </div>
    </div>
  );
}

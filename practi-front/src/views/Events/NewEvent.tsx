import React, { useState, useEffect } from 'react';
import { HeaderThree } from '../../cmps/headers/headerThree';
import { useNavigate, useLocation } from 'react-router-dom';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { MdClose } from 'react-icons/md'; // Importing the close icon
import { FaPlus } from 'react-icons/fa'; // Importing the plus icon

interface NewEventProps {
  token: string; // Function to set the authentication token
}

interface Team {
  teamName: string;
}

export function NewEvent({ token }: NewEventProps): JSX.Element {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [type, setType] = useState('practice');
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [startHour, setStartHour] = useState('10');
  const [startMinute, setStartMinute] = useState('00');
  const [tasks, setTasks] = useState<string[]>(['', '', '']); // Initialize with three blank spaces
  const [isEventNameFocused, setIsEventNameFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchTeams();
    // Parse URL query parameters
    const params = new URLSearchParams(location.search);
    const urlDate = params.get('date');
    const urlStartTime = params.get('startTime');
    if (urlDate) setDate(urlDate);
    if (urlStartTime) {
      const [hour, minute] = urlStartTime.split(':');
      setStartHour(hour);
      setStartMinute(minute);
    }
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
      default:
        break;
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = e.target.value;
    setType(selectedType);

    // Update event name placeholder based on the type
    if (selectedType === 'game') {
      setEventName(''); // Clear the event name for games
    }

    if (selectedType === 'practice') {
      setEventName('אימון'); // Set default event name for practices
    }
  };

  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = e.target.value;
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, '']);
  };

  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleNewEvent = async () => {
    const startTime = `${startHour}:${startMinute}`;
    if (!selectedTeam || !eventName || !date || !startTime) {
      setErrorMessage('.יש למלא את כל השדות הנדרשים');
      return;
    }

    const updatedTasks = tasks.map(task => (task.trim() === '' ? null : task));

    const newEvent = {
      teamName: selectedTeam,
      type,
      eventName,
      date,
      startTime,
      tasks: updatedTasks,
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
      setErrorMessage('נכשל בחיבור לשרת.');
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const hourOptions = Array.from({ length: 11 }, (_, i) => (i + 10).toString());
  const minuteOptions = ['00', '15', '30', '45'];

  return (
    <div className="newEventPage">
      <div className="signup-form">
        <HeaderThree />
        <div className="form-content">
          <h2>אירוע חדש</h2>
          <div className="custom-input-container">
            <p className="input-label">שם הקבוצה</p>
            <div className="select-container">
              <select
                id="teamSelect"
                name="teamSelect"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                required
              >
                <option value="" disabled hidden>
                  בחר קבוצה
                </option>
                {teams.map((team, index) => (
                  <option key={index} value={team.teamName}>
                    {team.teamName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="custom-input-container">
            <p className="input-label">שם האימון</p>
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
          </div>
          <div className="custom-input-container">
            <p className="input-label">תאריך</p>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={getCurrentDate()} // Set the minimum date to today
              required
            />
          </div>
          <div className="custom-input-container">
            <p className="input-label hour">שעת התחלה</p>
            <div className="time-selector">
              <select
                id="startHour"
                name="startHour"
                value={startHour}
                onChange={(e) => setStartHour(e.target.value)}
                required
              >
                {hourOptions.map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}
                  </option>
                ))}
              </select>
              <span> : </span>
              <select
                id="startMinute"
                name="startMinute"
                value={startMinute}
                onChange={(e) => setStartMinute(e.target.value)}
                required
              >
                {minuteOptions.map((minute) => (
                  <option key={minute} value={minute}>
                    {minute}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {type === 'practice' && (
            <div className="custom-input-container">
              <p className="input-label">מערך אימון</p>
              <ul className="task-list">
                {tasks.map((task, index) => (
                  <li key={index} className="task-item">
                    <span>{index + 1}</span>
                    <input
                      type="text"
                      value={task}
                      onChange={(e) => handleTaskInputChange(e, index)}
                      placeholder="משימה חדשה"
                      required
                    />
                    <MdClose className="delete-icon" onClick={() => handleRemoveTask(index)} />
                  </li>
                ))}
              </ul>
              <div className="task-input-container">
                <FaPlus className="add-icon" onClick={handleAddTask} />
              </div>
            </div>
          )}
        </div>
        <button className="new-event-button" onClick={handleNewEvent}>
          צור אימון
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      <div className="cta-bar-container">
        <CtaBarManager />
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { HeaderThree } from '../../cmps/headers/headerThree';
import { useNavigate, useLocation } from 'react-router-dom';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';


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
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('90');
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState('');
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
      const response = await fetch('http://localhost:5000/api/teams', {
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
      case 'duration':
        setDuration(value);
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
      setDuration('120'); // Set default duration for games
    }

    if (selectedType === 'practice') {
      setEventName('אימון'); // Set default event name for practices
      setDuration('90'); // Set default duration for practices
    }
  };

  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  const handleAddTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleNewEvent = async () => {
    if (!selectedTeam || !eventName || !date || !startTime || !duration) {
      alert('Please fill in all required fields.');
      return;
    }

    const newEvent = {
      teamName: selectedTeam,
      type,
      eventName,
      date,
      startTime,
      duration,
      tasks,
    };
    const storedToken = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:5000/api/events', {
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
        <h2>אירוע חדש</h2>
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
          
        </div>
        <div className="custom-input-container">
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventName}
            onChange={handleInputChange}
            placeholder={'שם האימון'}
            required
          />
        </div>
        <div className="custom-input-container">
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={handleInputChange}
            placeholder={!date ? 'תאריך' : ''}
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
            required
          />
          <label htmlFor="startTime">שעת התחלה</label>
        </div>
        <div className="custom-input-container">
          <input
            type="number"
            id="duration"
            name="duration"
            value={duration}
            onChange={handleInputChange}
            placeholder={!duration ? 'משך זמן' : ''}
            required
          />
          <label htmlFor="duration">משך זמן</label>
        </div>
        {type === 'practice' && (
          <div className="custom-input-container">
            {tasks.map((task, index) => (
              <div key={index} style={{ color: 'white', marginBottom: '10px' }}>
                {task} <button onClick={() => handleRemoveTask(index)}>מחק</button>
              </div>
            ))}
            <input
              type="text"
              value={taskInput}
              onChange={handleTaskInputChange}
              placeholder="משימה חדשה"
              required
            />
            <button className="signup-button" onClick={handleAddTask}>
              משימה חדשה
            </button>
          </div>
        )}
        <button className="signup-button" onClick={handleNewEvent}>
          צור אימון
        </button>
      </div>
      <div className="cta-bar-container">
        <CtaBarManager />
      </div>
    </div>
  );
}

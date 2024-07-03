import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { HeaderThree } from '../../cmps/headers/headerThree';
interface Event {
  _id: string;
  teamName: string;
  type: string;
  eventName: string;
  date: string;
  startTime: string;
  duration: string;
  tasks: string[];
}

export function GameEventEdit({ token }: { token: string }): JSX.Element {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [teamName, setTeamName] = useState('');
  const [type, setType] = useState('practice');
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [taskInput, setTaskInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const storedToken = localStorage.getItem('authToken') || token;
      try {
        const response = await fetch(`http://localhost:5000/api/events/id/${eventId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch event with ID ${eventId}`);
        }
        const eventData = await response.json();
        setEvent(eventData);
        setTeamName(eventData.teamName);
        setType(eventData.type);
        setEventName(eventData.eventName);
        setDate(eventData.date.split('T')[0]);
        setStartTime(eventData.startTime);
        setDuration(eventData.duration);
        setTasks(eventData.tasks || []);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId, token]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case 'teamName':
        setTeamName(value);
        break;
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

  const handleDeleteEvent = async () => {
    const storedToken = localStorage.getItem('authToken') || token;
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${storedToken}`
        }
      });

      if (response.ok) {
        navigate('/week-calendar');
      } else {
        const result = await response.json();
        throw result.error || 'Error deleting event';
      }
    } catch (err) {
      console.error('Failed to delete event:', err);
      alert('Failed to delete event.');
    }
  }

  const handleUpdateEvent = async () => {
    if (!teamName || !eventName || !date || !startTime || !duration) {
      alert('Please fill in all required fields.');
      return;
    }

    const updatedEvent = {
      teamName,
      type,
      eventName,
      date,
      startTime,
      duration,
      tasks
    };

    const storedToken = localStorage.getItem('authToken') || token;
    try {
      const response = await fetch(`http://localhost:5000/api/events/${eventId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`
        },
        body: JSON.stringify(updatedEvent)
      });

      if (response.ok) {
        navigate('/week-calendar');
      } else {
        const result = await response.json();
        throw result.error || 'Error updating event';
      }
    } catch (err) {
      console.error('Failed to update event:', err);
      alert('Failed to update event.');
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="eventEditPage">
          <HeaderThree/>
      <h2>ערוך משחק</h2>
      <div className="custom-input-container">
        <input
          type="text"
          id="eventName"
          name="eventName"
          value={eventName}
          onChange={handleInputChange}
          required
        />
        <label htmlFor="eventName">קבוצה יריבה</label>
      </div>
      <div className="custom-input-container">
        <input
          type="date"
          id="date"
          name="date"
          value={date}
          onChange={handleInputChange}
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
          required
        />
        <label htmlFor="duration">זמן המשחק</label>
      </div>
      
      <br />
      <div className="button-container">
        <button className="signup-button" onClick={handleUpdateEvent}>
          עדכן משחק
        </button>
        <button className="signup-button" onClick={handleDeleteEvent}>
          מחק משחק
        </button>
        <button className="signup-button" onClick={() => navigate('/week-calendar')}>
          חזור ללוח שנה
        </button>
      </div>
      <div className="cta-bar-container">
        <CtaBarManager />
      </div>
    </div>
  );
}

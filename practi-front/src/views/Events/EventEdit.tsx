import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { HeaderThree } from '../../cmps/headers/headerThree';
import { MdClose } from 'react-icons/md'; // Importing the close icon
import { FaPlus } from 'react-icons/fa'; // Importing the plus icon
import { fetchEventById, updateEventById } from '../../fetchFunctions/fetchFunctionsCoach'; // Importing the fetch functions

interface Event {
  _id: string;
  teamName: string;
  type: string;
  eventName: string;
  date: string;
  startTime: string;
  tasks: string[];
}

export function EventEdit({ token }: { token: string }): JSX.Element {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [teamName, setTeamName] = useState('');
  const [type, setType] = useState('practice');
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [tasks, setTasks] = useState<string[]>(['', '', '']); // Initialize with three blank spaces
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the event details using the event ID and token
    const fetchEventDetails = async () => {
      const storedToken = localStorage.getItem('authToken') || token;
      try {
        const eventData = await fetchEventById(eventId!, storedToken);
        setEvent(eventData);
        setTeamName(eventData.teamName);
        setType(eventData.type);
        setEventName(eventData.eventName);
        setDate(eventData.date.split('T')[0]); // Extract only the date portion
        setStartTime(eventData.startTime);
        setTasks(eventData.tasks || []);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEventDetails();
  }, [eventId, token]);

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

  const handleTaskInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newTasks = [...tasks];
    newTasks[index] = e.target.value;
    setTasks(newTasks);
  };

  const handleAddTask = () => {
    setTasks([...tasks, '']); // Add a new empty task
  };

  const handleRemoveTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index)); // Remove task by index
  };

  const handleUpdateEvent = async () => {
    if (!teamName || !eventName || !date || !startTime) {
      setErrorMessage('.יש למלא את כל השדות הנדרשים');
      return;
    }

    // Ensure empty tasks are set to null
    const updatedTasks = tasks.map(task => (task.trim() === '' ? null : task));

    const updatedEvent = {
      teamName,
      type,
      eventName,
      date,
      startTime,
      tasks: updatedTasks,
    };

    const storedToken = localStorage.getItem('authToken') || token;
    try {
      await updateEventById(eventId!, storedToken, updatedEvent);
      navigate('/week-calendar'); // Navigate back to the calendar view on successful update
    } catch (error) {
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

  if (!event) {
    return <div>Loading...</div>; // Display a loading state while the event data is being fetched
  }

  return (
    <div className="eventEditPage">
      <div className="signup-form">
        <HeaderThree />
        <h2>Edit Event</h2>
        {/* Event Name Input */}
        <div className="custom-input-container">
          <input
            type="text"
            id="eventName"
            name="eventName"
            value={eventName}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="eventName">שם האימון</label>
        </div>
        {/* Date Input */}
        <div className="custom-input-container">
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={handleInputChange}
            min={getCurrentDate()} // Set the minimum date to today
            required
          />
          <label htmlFor="date">תאריך</label>
        </div>
        {/* Start Time Input */}
        <div className="custom-input-container">
          <input
            type="time"
            id="startTime"
            name="startTime"
            value={startTime}
            onChange={handleInputChange}
            required
            step="900" // Step to 900 seconds (15 minutes)
          />
          <label htmlFor="startTime">שעת התחלה</label>
        </div>
        {/* Task List (Visible only for 'practice' type events) */}
        {type === 'practice' && (
          <div className="custom-input-container">
            <p className="input-label" style={{ marginRight: '35%' }}>מערך אימון</p>
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
        <br />
        {/* Update Event Button */}
        <button className="new-event-button" onClick={handleUpdateEvent}>
          עדכן אימון
        </button>
      </div>
      <div className="cta-bar-container">
        <CtaBarManager />
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

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

export function GameEventView({ token }: { token: string }): JSX.Element {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const storedToken = localStorage.getItem('authToken');
      try {
        const response = await fetch(`https://practi-web.onrender.com/api/events/id/${eventId}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`
          }
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch event with ID ${eventId}`);
        }
        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [eventId, token]);

  if (!event) {
    return <div>Loading...</div>;
  }

  // Format the date string
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Calculate end time based on start time and duration
  const calculateEndTime = () => {
    const startTimeArray = event.startTime.split(':');
    const startHour = parseInt(startTimeArray[0]);
    const startMinute = parseInt(startTimeArray[1]);
    const duration = parseInt(event.duration);

    const endMinute = (startMinute + duration) % 60;
    const endHour = startHour + Math.floor((startMinute + duration) / 60);

    return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  };

  const endTime = calculateEndTime();
  console.log(eventId)

  return (
    <div className="eventView">
      <HeaderThree/>
      <div className="button-container">
        <button className="signup-button" onClick={() => navigate(`/gameEvent/${eventId}/edit`)}>עריכה</button>
      </div>
      <h2>משחק</h2>
      <div className="custom-input-container">
        <input type="text" id="teamName" name="teamName" value={event.teamName} readOnly />
      </div>
      <div className="custom-input-container">
        <input type="text" id="eventName" name="eventName" value={event.eventName} readOnly />
      </div>
      <label htmlFor="eventName">שם היריבה</label>
      <div className="custom-input-container">
        <input type="text" id="date" name="date" value={formattedDate} readOnly />
      </div>
      <label htmlFor="date">תאריך</label>
      <div className="custom-input-container">
        <input type="time" id="startTime" name="startTime" value={event.startTime} readOnly />
      </div>
      <label htmlFor="startTime">שעת התחלה</label>
      <div className="custom-input-container">
        <input type="text" id="endTime" name="endTime" value={endTime} readOnly />
      </div>
      <label htmlFor="endTime">משך המשחק</label>
      <br />
      <div className="button-container">
        <button className="signup-button" onClick={() => navigate('/week-calendar')}>Back to Calendar</button>
      </div>
      <div className='cta-bar-container'>
        <CtaBarManager />
      </div>
    </div>
  );
}

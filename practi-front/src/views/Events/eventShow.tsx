import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { HeaderThree } from '../../cmps/headers/headerThree';
import { MdOutlineSportsBasketball } from 'react-icons/md';

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

export function EventView({ token }: { token: string }): JSX.Element {
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
    return <div>עוד לא הוספת אימונים חדשים</div>;
  }

  return (
    <>
      <div className="eventView">
        <HeaderThree />
        <div className='content'>
          <div className="bigTitle">
            <input type="text" id="eventName" name="eventName" value={event.eventName} readOnly />
          </div>
          <div className="taskList">
            <ul>
              {event.tasks.map((task, index) => (
                <li key={index}>
                 
                  {task}
                  <MdOutlineSportsBasketball style={{ marginLeft: '8px', color:'rgba(255, 162, 74, 1)'
 }} />
                </li>
              ))}
            </ul>
          </div>
          <div className="cta-bar-container">
            <CtaBarManager />
          </div>
        </div>
        <div className="button-container">
          <button className="new-event-button" onClick={() => navigate('/week-calendar')}>חזרה</button>
          <button className="reverse-button" onClick={() => navigate(`/event/${eventId}/edit`)}>עריכה</button>
        </div>
      </div>
    </>
  );
}

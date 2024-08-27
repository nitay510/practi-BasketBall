import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { HeaderThree } from '../../cmps/headers/headerThree';
import { MdOutlineSportsBasketball } from 'react-icons/md';
import { fetchEventById } from '../../fetchFunctionsCoach'; // Import the fetch function

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
    // Fetch the event details using the event ID and token
    const fetchEventDetails = async () => {
      const storedToken = localStorage.getItem('authToken') || token;
      try {
        const eventData = await fetchEventById(eventId!, storedToken);
        setEvent(eventData);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEventDetails();
  }, [eventId, token]);

  if (!event) {
    return <div>עוד לא הוספת אימונים חדשים</div>; // Display a message if no event is found
  }

  return (
    <>
      <div className="eventView">
        <HeaderThree />
        <div className='content'>
          {/* Display the event name */}
          <div className="bigTitle">
            <input type="text" id="eventName" name="eventName" value={event.eventName} readOnly />
          </div>
          {/* Display the list of tasks */}
          <div className="taskList">
            <ul>
              {event.tasks.map((task, index) => (
                <li key={index}>
                  {task}
                  <MdOutlineSportsBasketball
                    style={{ marginLeft: '8px', color: 'rgba(255, 162, 74, 1)' }}
                  />
                </li>
              ))}
            </ul>
          </div>
          {/* CTA Bar */}
          <div className="cta-bar-container">
            <CtaBarManager />
          </div>
        </div>
        {/* Navigation Buttons */}
        <div className="button-container">
          <button className="new-event-button" onClick={() => navigate('/week-calendar')}>חזרה</button>
          <button className="reverse-button" onClick={() => navigate(`/event/${eventId}/edit`)}>עריכה</button>
        </div>
      </div>
    </>
  );
}

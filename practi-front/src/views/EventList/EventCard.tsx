import React, { useEffect } from 'react';
import { Event } from './Event'; // Adjust the import path according to your project structure
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';
import { deleteEventById } from '../../fetchFunctionsCoach'; // Import the delete function

interface EventCardProps {
  event: Event;
  token: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, token }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/event/${event._id}`);
  };

  const deleteEvent = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the event: ${event.eventName}?`);
    if (!confirmDelete) return;

    try {
      await deleteEventById(event._id, token);
      alert('Event deleted successfully!');
      // Perform additional state updates or fetch the updated list of events if needed
    } catch (error) {
      alert('Failed to delete event. Please try again.');
    }
  };

  // Log event type here
  useEffect(() => {
    console.log(event.type, event._id, event.date);
  }, [event.type, event._id, event.date]);

  return (
    <a className={`event-card ${event.type}`} onClick={handleCardClick}>
      <div className="card-content">
        <div className="event-card-title">
          <h1>{event.type === 'game' ? `משחק נגד ${event.eventName}` : event.eventName}</h1>
        </div>
        <div className="event-team">
          <h2>{event.teamName}</h2>
        </div>
        <div className="start-time-right">
          <h2>{event.startTime}</h2>
        </div>
        <div className="card-actions">
          <button onClick={deleteEvent} title="Delete Event" style={{ color: 'black' }}>
            <MdDelete className="row-button" />
          </button>
        </div>
      </div>
    </a>
  );
};

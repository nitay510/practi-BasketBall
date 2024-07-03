// /mnt/data/EventCard.tsx

import React from 'react';
import { Event } from './Event'; // Adjust the import path according to your project structure
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

interface EventCardProps {
  event: Event;
  token: string;
}


export const EventCard: React.FC<EventCardProps> = ({ event, token }) => {
  const isPractice = event.type === 'practice';
  const cardStyle = {
    backgroundColor: isPractice ? 'yellow' : 'red',
  };
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/event/${event._id}`);
  };

  const calculateEndTime = () => {
    const startTimeArray = event.startTime.split(':');
    const startHour = parseInt(startTimeArray[0]);
    const startMinute = parseInt(startTimeArray[1]);
    const duration = event.duration;

    const endMinute = (startMinute + duration) % 60;
    const endHour = startHour + Math.floor((startMinute + duration) / 60);

    return `${endHour.toString().padStart(2, '0')}:${endMinute.toString().padStart(2, '0')}`;
  };

  const deleteEvent = async () => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the event: ${event.eventName}?`);
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://practi-web.onrender.com/api/events/${event._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Update events state or perform any necessary actions
        alert('Event deleted successfully!');
      } else {
        alert('Failed to delete event.');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event. Please try again.');
    }
  }

  return (
    <a className={`card ${event.type === 'practice' ? 'win' : 'loss'}`} onClick={handleCardClick}>
    <div className="card-content">
      <div className='card-title'>
        <h2>{new Date(event.date).toLocaleDateString('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })} {calculateEndTime()} - {event.startTime}</h2>
      </div>
      <div className='team-info right'>
        <h2>{event.teamName}</h2>
      </div>
      <div className='team-info left'>
        <h2>{event.eventName}</h2>
      </div>
      <div className="card-actions">
        <button onClick={deleteEvent} title='Delete Game'>
          <MdDelete className='row-button' />
        </button>
      </div>
    </div>
  </a>
  );
};

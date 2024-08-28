import React, { useState, useEffect } from 'react';
import { CtaBar } from '../../cmps/cta/cta-bar';
import { useNavigate } from 'react-router-dom';
import { HeaderTwo } from '../../cmps/headers/headertwo';
import { BsPlayFill, BsCheck } from 'react-icons/bs';
import { fetchUserDrills, fetchCompletedDrills, Drill } from '../../fetchFunctions/fetchFunctionsPlayer'; // Import fetch functions

interface UserTrainingsProps {
  setLoginStatus: (isLogin: boolean) => void;
  setTopic: (topic: string) => void;
}

const Notifications: React.FC<UserTrainingsProps> = ({ setLoginStatus, setTopic }) => {
  const [drills, setDrills] = useState<Drill[]>([]);
  const [completedDrills, setCompletedDrills] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadDrills();
  }, []);

  // Load all drills and check for completed ones
  const loadDrills = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      if (!storedToken) throw new Error('No authentication token found');

      // Fetch user drills
      const fetchedDrills = await fetchUserDrills(storedToken);
      setDrills(fetchedDrills);

      // Check which drills are completed
      const completedDrillNames = await fetchCompletedDrills(fetchedDrills, storedToken);
      setCompletedDrills(completedDrillNames);
    } catch (error) {
      console.error('Error loading drills:', error);
      setError('Failed to fetch drills');
    }
  };

  const handleDrillClick = (drillName: string, topic: string) => {
    setLoginStatus(true);
    setTopic(topic);
    navigate('/app', { state: { drillToDo: drillName } });
  };

  return (
    <div className='userTrainings'>
      <div className='content-container'>
        <HeaderTwo />
        <h1>התראות</h1>
        <h2>יש לך {drills.length} אימונים לביצוע</h2>
        <hr className="underline" />
        {error && <p>{error}</p>}
        <div className="notifications">
          {drills.map((drill) => (
            <div className="notification" key={drill.drillId} onClick={() => handleDrillClick(drill.drillName, drill.topic)}>
              <BsPlayFill className="notification-icon" onClick={() => handleDrillClick(drill.drillName, drill.topic)} />
              <p>
                {completedDrills.includes(drill.drillName) && <BsCheck className="completed-icon" />} {/* Show check icon if completed */}
              </p>
              <div className="notification-date">{new Date(drill.date).toLocaleDateString()}</div>
              <div className="notification-text">
                <p>המאמן שלח לך אימון חדש</p>
                <p className="drillDetails">
                  - {drill.drillName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="cta-bar-container">
        <CtaBar />
      </div>
    </div>
  );
};

export default Notifications;

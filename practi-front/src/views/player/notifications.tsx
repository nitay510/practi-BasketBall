import React, { useState, useEffect } from 'react';
import { CtaBar } from '../../cmps/cta/cta-bar';
import { useNavigate } from 'react-router-dom';
import { HeaderTwo } from '../../cmps/headers/headertwo';
import { BsPlayFill, BsCheck } from 'react-icons/bs'; // Import check icon

interface Drill {
  drillId: string;
  date: string;
  userPlayer: string;
  userCoach: string;
  drillName: string;
  topic: string;
}

interface UserTrainingsProps {
  setLoginStatus: (isLogin: boolean) => void;
  setTopic: (topic: string) => void;
}

const Notifications: React.FC<UserTrainingsProps> = ({ setLoginStatus, setTopic }) => {
  const [drills, setDrills] = useState<Drill[]>([]);
  const [completedDrills, setCompletedDrills] = useState<string[]>([]); // Track completed drills
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrills();
  }, []);

  const fetchDrills = async () => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const response = await fetch('https://practi-web.onrender.com/api/SendDrills/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${storedToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch drills');
      }

      const data = await response.json();
      setDrills(data);
      checkCompletedDrills(data); // Check which drills are completed
    } catch (error) {
      console.error('Error fetching drills:', error);
      setError('Failed to fetch drills');
    }
  };

  const checkCompletedDrills = async (drills: Drill[]) => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const responses = await Promise.all(drills.map(drill => 
        fetch(`https://practi-web.onrender.com/api/checkUserDrill?drillName=${drill.drillName}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${storedToken}`
          }
        })
      ));

      const results = await Promise.all(responses.map(res => res.json()));
      const completedDrillNames = drills.filter((_, index) => results[index].hasDoneDrill).map(drill => drill.drillName);
      setCompletedDrills(completedDrillNames);
    } catch (error) {
      console.error('Error checking completed drills:', error);
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

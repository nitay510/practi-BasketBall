import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getVideos } from '../../cmps/video/functions';
import VideoModel from '../../Models/VideoModel';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { NavBarHistory } from '../../cmps/nav-bar-history';
import DrillListForCoach from '../../cmps/drill/drill-list-for-coach';
import { DrillModel } from '../../Models/DrillModel';
import { HeaderThree } from '../../cmps/headers/headerThree';

// Props for the HistoryPage component
interface HistoryPageCoachProps {
  token: string;
  setToken: (token: string) => void;
}

/* 
  This view is the history of the single drills for the user
*/
function HistoryPageForCoach({ token,setToken }: HistoryPageCoachProps) {
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [drills, setDrills] = useState<DrillModel[]>([]);
  const [category, setCategory] = useState('קליעה');;
  const location = useLocation();
  const { player } = location.state || {};  // Default to an empty object if state is undefined


  useEffect(() => {
    loadVideos();
    getDrills();
  }, [category]);

  const loadVideos = async () => {
    const fetchedVideos = await getVideos(category, token);
    setVideos(fetchedVideos);
  };

  const getDrills = async () => {
    const storedToken = localStorage.getItem('authToken')
    const res = await fetch(`http://localhost:5000/api/DrillsByCoach/${category}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${storedToken}`,
      },
      body: JSON.stringify({ currentUser: player })  // Changed key from 'player' to 'currentUser'
    });

    if (res.ok) {
        const drillsData = await res.json();
        setDrills(drillsData);
    } else {
        console.error('Unable to fetch drills');
        alert('Unable to fetch drills');
    }
};
  // Extract unique drill names
  const uniqueDrills = Array.from(new Set(videos.map(video => video.title)))
    .filter(title => !title.includes('בונוס'));

  return (
    <div className="history-page">
      <div className='content-container-practice'>
        <HeaderThree />
        <NavBarHistory
          category={category}
          setCategory={setCategory}
        />
        <DrillListForCoach
          token={token}
          category={category}
          drillList={drills}
          uniqueDrills={uniqueDrills}
        />
      </div>
      <div className="cta-bar-container">
        <CtaBarManager/>
      </div>
    </div>
  );
}
export default HistoryPageForCoach;

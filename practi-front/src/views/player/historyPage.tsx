import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVideos } from '../../cmps/video/functions';
import VideoModel from '../../Models/VideoModel';
import { CtaBar } from '../../cmps/cta/cta-bar';
import { NavBarHistory } from '../../cmps/nav-bar-history';
import DrillListSingle from '../../cmps/drill/drill-list-single';
import { DrillModel } from '../../Models/DrillModel';
import { HeaderTwo } from '../../cmps/headers/headertwo';
import { fetchDrills } from '../../fetchFunctions/fetchFunctionsPlayer';

// Props for the HistoryPage component
interface HistoryPageProps {
  token: string;
  setToken: (token: string) => void;
  setTopic: (topic: string) => void;
}

/* 
  This view is the history of the single drills for the user
*/
function HistoryPage({ token, setToken, setTopic }: HistoryPageProps) {
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [drills, setDrills] = useState<DrillModel[]>([]);
  const [category, setCategory] = useState('קליעה');
  useEffect(() => {
    loadVideos();
    loadDrills();
  }, [category]);

  const loadVideos = async () => {
    const fetchedVideos = await getVideos(category, token);
    setVideos(fetchedVideos);
  };

  // Load drills using the fetchDrills function from fetchFunctionsPlayer.tsx
  const loadDrills = async () => {
    try {
      const storedToken = localStorage.getItem('authToken') || token;
      const fetchedDrills = await fetchDrills(category, storedToken);
      setDrills(fetchedDrills);
    } catch (error) {
      alert('Unable to fetch drills');
    }
  };

  // Extract unique drill names
  const uniqueDrills = Array.from(new Set(videos.map(video => video.title)))
    .filter(title => !title.includes('בונוס'));

  return (
    <div className="history-page">
      <div className='content-container-practice'>
        <HeaderTwo />
        <NavBarHistory
          category={category}
          setCategory={setCategory}
        />
        <DrillListSingle
          token={token}
          category={category}
          setTopic={setTopic}
          drillList={drills}
          uniqueDrills={uniqueDrills}
        />
      </div>
      <div className="cta-bar-container">
        <CtaBar />
      </div>
    </div>
  );
}

export default HistoryPage;

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getVideos } from '../../cmps/video/functions';
import VideoModel from '../../Models/VideoModel';
import { CtaBarManager } from '../../cmps/cta/cta-bar-manager';
import { NavBarHistory } from '../../cmps/nav-bar-history';
import DrillListForCoach from '../../cmps/drill/drill-list-for-coach';
import { DrillModel } from '../../Models/DrillModel';
import { HeaderThree } from '../../cmps/headers/headerThree';
import { fetchDrillsByCoach } from '../../fetchFunctions/fetchFunctionsCoach'; // Import the fetch function

interface HistoryPageCoachProps {
  token: string;
  setToken: (token: string) => void;
}

function HistoryPageForCoach({ token, setToken }: HistoryPageCoachProps) {
  const [videos, setVideos] = useState<VideoModel[]>([]);
  const [drills, setDrills] = useState<DrillModel[]>([]);
  const [category, setCategory] = useState('קליעה'); // Default category is "Shooting"
  const location = useLocation();
  const { player } = location.state || {};  // Extract the player from the state, if available

  useEffect(() => {
    loadVideos();
    loadDrills(); // Call the updated fetch function
  }, [category]);

  // Function to load videos based on the selected category
  const loadVideos = async () => {
    const fetchedVideos = await getVideos(category, token);
    setVideos(fetchedVideos);
  };

  // Function to load drills assigned by the coach to the player
  const loadDrills = async () => {
    try {
      const fetchedDrills = await fetchDrillsByCoach(category, token, player.username); // Use the fetch function from fetchFunctionsCoach.tsx
      setDrills(fetchedDrills);
    } catch (error) {
      console.error('Unable to fetch drills:', error);
      alert('Unable to fetch drills');
    }
  };

  // Extract unique drill names
  const uniqueDrills = Array.from(new Set(videos.map(video => video.title)))
    .filter(title => !title.includes('בונוס'));

  return (
    <div className="history-page">
      <div className="content-container-practice">
        <h2>היסטוריית אימונים של {player.fullName}</h2> {/* Displaying the player's full name */}
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
        <CtaBarManager />
      </div>
    </div>
  );
}

export default HistoryPageForCoach;

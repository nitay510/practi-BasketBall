import React, { useEffect, useState } from 'react';
import { getSubVideos } from '../video/functions';
import { MdOutlineExpandMore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { SuccessRate } from './success-rate';
import { DrillSituation } from './drillSituation';
import { DrillModel } from '../../Models/DrillModel';

// Define the interface for drill preview component props
interface drillPreviewProps {
  drillName: string; // The name of the drill
  token: string; // Auth token for API requests
  category: string; // Category of the drill
  setTopic: (topic: string) => void; // Function to set the topic
  drillList: DrillModel[]; // List of drills
}

function DrillPreview({ drillName, token, category, setTopic, drillList }: drillPreviewProps) {
  const navigate = useNavigate(); // Use navigate hook to navigate to different routes
  const [expandeddrill, setExpandeddrill] = useState<string | null>(null); // State to manage expanded drill
  const [totalDrills, setTotalDrills] = useState(0); // State to track the total number of drills
  const [doneDrills, setDoneDrills] = useState(0); // State to track the number of completed drills
  const [uniqueDrills, setUniqueDrills] = useState<string[]>([]); // State for unique drills
  const [specificDrillList, setSpecificDrillList] = useState<DrillModel[] | undefined>([]); // State for filtered drill list

  // Function to calculate how many unique drills have been done
  const howManyDrillsDone = (): number => {
    const allDrills = drillList.filter((drill) => drill.drillName === drillName); // Filter drills by name
    const uniqueDrillsArray = Array.from(new Set(allDrills.map(drill => drill.missionName))); // Get unique mission names
    setUniqueDrills(uniqueDrillsArray); // Set unique drills to state
   
    return uniqueDrillsArray.length; // Return the count of unique drills
  };

  // Function to load sub videos related to the drill
  const loadSub = async () => {
    try {
      const subVideos = await getSubVideos(drillName, token); // Fetch sub videos from API
      if(drillName=='זריקת עונשין') // Special case for specific drill
      setTotalDrills(subVideos.length - 2); // Adjust total drills for this case
      else
      setTotalDrills(subVideos.length - 1); // Otherwise set normally
    } catch (error) {
      console.error('Error loading sub videos:', error); // Log error if sub video fetching fails
    }
  };

  // Function to get the list of drills matching the current drill name
  const getDrillList = () => {
    const allDrills = drillList.filter((drill) => drill.drillName === drillName); // Filter drills by drillName
    if (allDrills.length === 0) {
      setSpecificDrillList(undefined); // If no drills, set to undefined
    } else {
      setSpecificDrillList(allDrills); // Otherwise, set the filtered list
    }
  };

  // Toggle drill expansion for viewing more details
  const toggleDrill = (drillName: string) => {
    setExpandeddrill(expandeddrill === drillName ? null : drillName); // Toggle the expanded state for the drill
  };

  // Navigate to the training page for a specific drill
  const handleReturnToTraining = (drillName: string) => {
    setTopic(category); // Set the category as the topic
    navigate(`/PracticeView/${drillName}`); // Navigate to the practice view page
  };

  // Effect to update done drills, load sub videos, and fetch drill list when drillList or drillName changes
  useEffect(() => {
    setDoneDrills(howManyDrillsDone()); // Set the number of done drills
    loadSub(); // Load sub videos
    getDrillList(); // Get the list of specific drills
  }, [drillList, drillName]);

  return (
    <div key={drillName} className="opponent-item">
      <div className="opponent-header">
        <div onClick={() => toggleDrill(drillName)} className="opponent-name">
          {drillName}
          <div className="opponent-latest">
             {doneDrills} / {totalDrills} 
          </div>
        </div>
        <div className="latest-drill">
          <div className="opponent-latest">
            {specificDrillList != undefined ? (
              <DrillSituation drillList={specificDrillList} uniqueDrills={uniqueDrills} />
            ) : (
              ''
            )}
          </div>
        </div>
        <button className="expendMore" onClick={() => toggleDrill(drillName)}  style={{marginLeft: '0' , fontSize:'18px' }}>
          <MdOutlineExpandMore />
        </button>
      </div>

      {expandeddrill === drillName && (
        <div className="opponent-drills">
          {drillList
            .filter((drill) => drill.drillName === drillName)
            .map((drill) => (
              <div key={drill.drillId} className="drill-item">
                <div className="drill-date">{new Date(drill.date).toLocaleDateString()}</div>
                <div className="drill-name">{drill.missionName}</div>
                {drill.tries != null && drill.target ? (
                  <SuccessRate success={drill.successes} tries={drill.tries} target={drill.target} />
                ) : (
                  ''
                )}
                <button
                  className="back-to-training"
                  onClick={() => handleReturnToTraining(drillName)}
                >
                  לאימון
                </button>
              </div>
            ))}
          {drillList.filter((drill) => drill.drillName === drillName).length === 0 && (
            <div className="drill-item">
              <p>לא עשית עדיין אימון בנושא</p>
              <button
                className="back-to-training"
                onClick={() => handleReturnToTraining(drillName)}
              >
                לאימון
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DrillPreview;

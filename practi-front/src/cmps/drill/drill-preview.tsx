import React, { useEffect, useState } from 'react';
import { getSubVideos } from '../video/functions';
import { MdOutlineExpandMore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { SuccessRate } from './success-rate';
import { DrillSituation } from './drillSituation';
import { DrillModel } from '../../Models/DrillModel';
import SubVideoModel from '../../Models/subVideoModel';

interface drillPreviewProps {
  drillName: string;
  token: string;
  category: string;
  setTopic: (topic: string) => void;
  drillList: DrillModel[];
}

function DrillPreview({ drillName, token, category, setTopic, drillList }: drillPreviewProps) {
  const navigate = useNavigate();
  const [expandeddrill, setExpandeddrill] = useState<string | null>(null);
  const [totalDrills, setTotalDrills] = useState(0);
  const [doneDrills, setDoneDrills] = useState(0);
  const [uniqueDrills, setUniqueDrills] = useState<string[]>([]);
  const [specificDrillList, setSpecificDrillList] = useState<DrillModel[] | undefined>([]);

  const howManyDrillsDone = (): number => {
    const allDrills = drillList.filter((drill) => drill.drillName === drillName);
    const uniqueDrillsArray = Array.from(new Set(allDrills.map(drill => drill.missionName)));
    setUniqueDrills(uniqueDrillsArray);
   
    return uniqueDrillsArray.length;
  };

  const loadSub = async () => {
    try {
      const subVideos = await getSubVideos(drillName, token);
  
      setTotalDrills(subVideos.length - 1);
    } catch (error) {
      console.error('Error loading sub videos:', error);
    }
  };

  const getDrillList = () => {
    const allDrills = drillList.filter((drill) => drill.drillName === drillName);
    if (allDrills.length === 0) {
      setSpecificDrillList(undefined);
    } else {
      setSpecificDrillList(allDrills);
    }
  };

  const toggleDrill = (drillName: string) => {
    setExpandeddrill(expandeddrill === drillName ? null : drillName);
  };

  const handleReturnToTraining = (drillName: string) => {
    setTopic(category);
    navigate(`/PracticeView/${drillName}`);
  };

  useEffect(() => {
    setDoneDrills(howManyDrillsDone());
    loadSub();
    getDrillList();
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
        <button className="expendMore" onClick={() => toggleDrill(drillName)}>
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

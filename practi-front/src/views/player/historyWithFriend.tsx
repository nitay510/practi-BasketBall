import React, { useEffect, useState } from 'react';
import { CtaBar } from '../../cmps/cta/cta-bar';
import { HeaderTwo } from '../../cmps/headers/headertwo';
import { MdOutlineExpandMore } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { DrillModel } from '../../Models/DrillModel';
import { fetchAllDoubleDrills, fetchWins, fetchLosses } from '../../fetchFunctions/fetchFunctionsPlayer'; // Import the fetch functions

// Props for the HistoryPageDouble component
interface HistoryPageDoubleProps {
  token: string;
  setToken: (token: string) => void;
  setTopic: (topic: string) => void;
}

function HistoryPageDouble({ token, setToken, setTopic }: HistoryPageDoubleProps) {
  const [drills, setDrills] = useState<DrillModel[]>([]);
  const [opponentStats, setOpponentStats] = useState<{ [opponent: string]: { wins: number, loses: number } }>({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await getAllDrills();
      await updateOpponentStats();
    };
    setToken(localStorage.getItem('authToken'))
    fetchData();
  }, []);

  useEffect(() => {
    if (drills.length > 0) {
      updateOpponentStats();
    }
  }, [drills]);

  // Fetch all double drills using the fetch function from fetchFunctionsPlayer.tsx
  const getAllDrills = async () => {
    try {
      const fetchedDrills = await fetchAllDoubleDrills(token);
      setDrills(fetchedDrills);
    } catch (error) {
      alert('Unable to fetch drills');
    }
  };

  // Extract unique opponents
  const uniqueOpponents = Array.from(new Set(drills.map((drill) => drill.opponentName)));
  const [expandedOpponent, setExpandedOpponent] = useState<string | null>(null);

  // Toggle expanded state for an opponent
  const toggleOpponent = (opponent: string) => {
    setExpandedOpponent(expandedOpponent === opponent ? null : opponent);
  };

  // Handle the click to return to training
  const handleReturnToTraining = (drillName: string, topic: string) => {
    setTopic(topic);
    navigate(`/PracticeView/${drillName}`);
  };

  // Update opponent statistics using the fetch functions from fetchFunctionsPlayer.tsx
  const updateOpponentStats = async () => {
    const stats: { [opponent: string]: { wins: number, loses: number } } = {};

    for (const opponent of drills.map(drill => drill.opponentName)) {
      const wins = await fetchWins(token, opponent);
      const loses = await fetchLosses(token, opponent, drills);
      if (opponent) stats[opponent] = { wins, loses };
    }
    setOpponentStats(stats);
  };

  return (
    <div className="history-page">
      <div className='content-container-practice'>
        <HeaderTwo />

        {drills.length > 0 ? (
          <div className="drill-list">
            {uniqueOpponents.map((opponent) => (
              <div key={opponent} className="opponent-item">
                <div className="opponent-header">
                  <div onClick={() => toggleOpponent(opponent)} className="opponent-name">
                    {opponent}
                  </div>
                  <div className="latest-drill">
                    <div className="opponent-latest">
                      :מאזן
                    </div>
                    <div className={`opponent-latest ${opponentStats[opponent]?.wins > opponentStats[opponent]?.loses ? 'green' : opponentStats[opponent]?.loses > opponentStats[opponent]?.wins ? 'red' : ''}`}>
                      {`${opponentStats[opponent]?.wins || 0}-${opponentStats[opponent]?.loses || 0}`}
                    </div>
                  </div>
                  <button className='expendMore' onClick={() => toggleOpponent(opponent)}>
                    <MdOutlineExpandMore />
                  </button>
                </div>
                {expandedOpponent === opponent && (
                  <div className="opponent-drills">
                    {drills
                      .filter((drill) => drill.opponentName === opponent)
                      .map((drill) => (
                        <div key={drill.drillId} className="drill-item">
                          <div className="drill-date">
                            {new Date(drill.date).toLocaleDateString()}
                          </div>
                          <div className="drill-name">{drill.drillName}</div>
                          <div
                            className={`score ${
                              drill.successes === drill.opponentScore ? 'neutral' : drill.successes > drill.opponentScore ? 'green' : 'red'
                            }`}
                          >
                            {drill.opponentScore}-{drill.successes}
                          </div>
                          <button
                            className="back-to-training"
                            onClick={() => handleReturnToTraining(drill.drillName, drill.topic)}
                          >
                            חזור לאימון
                          </button>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="drill-item">
            כאן יופיעו האימונים שתבצע עם חברים
          </div>
        )}
      </div>
      <div className="cta-bar-container">
        <CtaBar />
      </div>
    </div>
  );
}

export default HistoryPageDouble;

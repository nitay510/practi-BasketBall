import React, { useEffect, useState } from 'react';
import { DrillModel } from '../../Models/DrillModel';
import { Console } from 'console';

interface DrillSituationProps {
  drillList: DrillModel[];
  uniqueDrills: string[];
}

export const DrillSituation = ({ drillList, uniqueDrills }: DrillSituationProps): JSX.Element => {
  const [avgDrills, setAvgDrills] = useState(0);
  const [greatDrills, setGreatDrills] = useState(0);
  const [badDrills, setBadDrills] = useState(0);

  const getBestDrill = (missionName: string): DrillModel | undefined => {
    const allDrills = drillList.filter((drill) => drill.missionName === missionName);

    if (allDrills.length === 0) {
      return undefined; // No drills found for the given missionName
    }

    const bestDrill = allDrills.reduce((best, current) => {
      const currentSuccess = current.successes;
      const bestSuccess = best ? best.successes : null;

      if (bestSuccess === null || currentSuccess > bestSuccess) {
        return current;
      } else {
        return best;
      }
    }, allDrills[0]);

    return bestDrill;
  };
  const calculateSuccessRate = (success:number, tries:number): number => {
    return tries !== 0 ? (success / tries) * 100 : 0; // Avoid division by zero
  };

  const determineDrills = () => {
    let greatCount = 0;
    let avgCount = 0;
    let badCount = 0;

    uniqueDrills.forEach((drillName) => {
      const bestDrill = getBestDrill(drillName);
      if (bestDrill) {
        const successRate = calculateSuccessRate(bestDrill.successes,bestDrill.tries);
        if (bestDrill.target) {
          if (successRate >= bestDrill.target) {
            greatCount++;
          } else if ( successRate >= bestDrill.target - 40) {
            avgCount++;
          } else {
            badCount++;
          }
        }
      }
    });

    setAvgDrills(avgCount);
    setBadDrills(badCount);
    setGreatDrills(greatCount);
  };

  useEffect(() => {
    determineDrills();
  }, [drillList]);

  return (
    <div className='drillSit'>
      {greatDrills > 0 && <p className="green">תרגילים מעולים: {greatDrills}</p>}
      {avgDrills > 0 && <p className="yellow">תרגילים טובים: {avgDrills}</p>}
      {badDrills > 0 && <p className="red">תרגילים לשיפור: {badDrills}</p>}
    </div>
  );
};

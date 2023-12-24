import React, { useEffect, useState } from 'react';
import { SuccessRate } from '../drill/success-rate';

interface VideoDetailsProps {
  drillId: string;
  target: number;
  title: string;
  tries: number;
  token: string;
  drillName: string;
  topic: string;
  setIsSubmit: (isSubmit: boolean) => void;
  setBrokenRecord: (isSubmit: boolean) => void;
  setSubmitMessage: (isSubmit: string) => void;
  setColor: (isSubmit: string) => void;
  setRate: (rate: number) => void;
}

/* 
  This component is the page of the form that is added to drill videos of single person drill. 
  It also manages the submit to the server.
*/
export const VideoDetails = ({
  drillId,
  target,
  title,
  tries,
  token,
  drillName,
  topic,
  setIsSubmit,
  setBrokenRecord,
  setSubmitMessage,
  setColor,
  setRate,
}: VideoDetailsProps) => {
  const [missionCount, setMissionCount] = useState<number | null>(null);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    getHighScore();
  }, [drillName]);

  //get the high score of this drill
  const getHighScore = async () => {
    const params = new URLSearchParams({
      drillName: drillName,
    });

    const res = await fetch(`https://practi-web.onrender.com/api/Drills/highScore/${title}?${params.toString()}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      const high = await res.json();
      setHighScore(high);
    } else {
      alert('Unable to fetch drills');
    }
  };

  const handleMissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMissionCount(parseInt(event.target.value, 10));
  };

  // This function submits to the server whatever is inside the form.
  const handleSubmit = async () => {
    if(missionCount>tries){
      alert("הכנסת מספר קליעות הגדול ממספר הנסיונות, הכנס שוב")
    }
    else{
    setIsSubmit(true);
    // Calculate success rate percentage
    const successRate = Math.round((missionCount! / tries) * 100);
    setRate(successRate);
    let newMessage = ``;
    if (missionCount! > highScore) {
      setHighScore(missionCount!);
      setBrokenRecord(true);
//choose the massege acording to the result and target
      if (successRate >= target) {
        newMessage = 'התוצאה שלך מעל הממוצע, כל הכבוד';
        setColor('green')
      } else if (successRate >= target - 40) {
        newMessage += 'התוצאה שלך בטווח הממוצע, עוד קצת';
        setColor('yellow')
      } else {
        newMessage += 'התוצאה שלך מתחת לממוצע, המשך להתאמן';
        setColor('red')
      }
    }

    setSubmitMessage(newMessage);

    // Data to send 
    const dataToSend1 = {
      missionName: title,
      tries: tries,
      successes: missionCount!,
      drillName: drillName,
      topic: topic,
      target: target,
    };
    try {
      const res1 = await fetch(`https://practi-web.onrender.com/api/Drills/${drillId}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend1),
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  };

  return (
    <div className="video-details">
         <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="mission1Count"> שיא אישי:
          <SuccessRate success={highScore} tries={tries} target={target} />
          </label>
          <input
            type="number"
            id="mission1Count"
            name="mission1Count"
            value={missionCount || ''}
            onChange={handleMissionChange}
            placeholder={`מספר קליעות מתוך ${tries}`}
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          שלח
        </button>
      </form>
    </div>
  );
};

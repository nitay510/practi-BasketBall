import React, {  useState } from 'react';


interface videoDetailsDoubleProps {
  drillId: string
  mission1:string
  title:string
  token:string
  drillName:string
  topic:string
  setIsSubmit: (isSubmit: boolean) => void
}
/* 
  This component is the page of the form that is added to drill videos of double person drill. 
  It also manages the submit to the server.
*/
export const VideoDetailsDouble = ({ drillId, mission1,title,token,drillName,topic,setIsSubmit}: videoDetailsDoubleProps) => {
  const [opponent, setOpponent] = useState('');
  const [myScore, setMyScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);

  const handleSubmit = async () => {
    setIsSubmit(true);
    // Data to send 
    const dataToSend1 = {
      missionName: title,
      successes: myScore,
      drillName: drillName,
      topic: topic,
      opponentScore: opponentScore,
      opponentName: opponent,
    };

    try {
      // Send the message
      const res1 = await fetch(`https://practi-web.onrender.com/api/Drills/${drillId}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json', // the data (username/password) is in the form of a JSON object
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSend1),
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="video-details" style={{ direction: 'rtl' }}>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              type="text"
              id="opponent"
              name="opponent"
              value={opponent}
              onChange={(e) => setOpponent(e.target.value)}
              placeholder="שם היריב"
            />
          </div>
        </div>

        <div>
          <input
            type="number"
            id="myScore"
            name="myScore"
            value={myScore || ''}
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
              setMyScore(isNaN(newValue) ? 0 : newValue);
            }}
            placeholder={`הניקוד שלי`}
          />
        </div>

        <div>
          <input
            type="number"
            id="opponentScore"
            name="opponentScore"
            value={opponentScore || ''}
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
              setOpponentScore(isNaN(newValue) ? 0 : newValue);
            }}
            placeholder={`הניקוד של ${opponent}`}
          />
        </div>
        <button type="button" onClick={handleSubmit}>
          שלח
        </button>
      </form>
    </div>
  );
};
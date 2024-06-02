import React, { useState } from 'react';
import teamALogo from '../../../assets/images/teamA.png'; // Import team A logo image
import teamBLogo from '../../../assets/images/teamB.png'; // Import team B logo image

interface ScoreBoardProps {
    myTeamName: string;
    rivalTeamName: string;
    myTeamScore: number;
    setMyTeamScore: (myTeamScore: number) => void;
    rivalTeamScore: number;
    setRivalTeamScore: (RivalTeamScore: number) => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ myTeamName, rivalTeamName, myTeamScore, setMyTeamScore, rivalTeamScore, setRivalTeamScore }) => {

    const handleIncrementOne = () => {
        setRivalTeamScore(rivalTeamScore + 1);
    };

    const handleIncrementTwo = () => {
        setRivalTeamScore(rivalTeamScore + 2);
    };
    const handleIncrementThree = () => {
        setRivalTeamScore(rivalTeamScore + 3);
    };

    return (
        <div className="scoreboard-container">
            <div className="scoreboard-teams">
                {/* Team A */}
                <div className="scoreboard-team team-a">
                    <img src={teamALogo} alt="Team A Logo" />
                    <h2>{rivalTeamName}</h2>
                    <input
                        type="text"
                        maxLength={3}
                        value={rivalTeamScore === 0 ? '0' : rivalTeamScore.toString()}
                        onChange={(e) => {
                            const inputValue = parseInt(e.target.value, 10); // Ensure base 10 for parsing
                            if (rivalTeamScore === 0) {
                                // If the current score is 0, directly set the score to the new number
                                setRivalTeamScore(inputValue || 0);
                            } else if (!isNaN(inputValue) && inputValue >= 0) {
                                // Otherwise, append the entered digit to the current score
                                setRivalTeamScore(inputValue);
                            } else if (e.target.value === '') {
                                // Handle empty input
                                setRivalTeamScore(0);
                            }
                        }}
                    />
                    <div className="scoreboard-buttons">
                            <button  onClick={handleIncrementThree}>+3</button>
                        <button onClick={handleIncrementTwo}>+2</button>
                        <button  onClick={handleIncrementOne}>+1</button>
                    </div>
                </div>
                {/* Scores */}
                <div className="scoreboard-scores">
                    <div>
                        <h2>{rivalTeamScore} : {myTeamScore}</h2>
                    </div>
                </div>
                {/* Team B */}
                <div className="scoreboard-team team-b">
                    <img src={teamBLogo} alt="Team B Logo" />
                    <h2>{myTeamName}</h2>
                    <input
                        type="text"
                        maxLength={3}
                        value={myTeamScore === 0 ? '0' : myTeamScore.toString()}
                        onChange={(e) => {
                            const inputValue = parseInt(e.target.value, 10); // Ensure base 10 for parsing
                            if (myTeamScore === 0) {
                                // If the current score is 0, directly set the score to the new number
                                setMyTeamScore(inputValue || 0);
                            } else if (!isNaN(inputValue) && inputValue >= 0) {
                                // Otherwise, append the entered digit to the current score
                                setMyTeamScore(inputValue);
                            } else if (e.target.value === '') {
                                // Handle empty input
                                setMyTeamScore(0);
                            }
                        }}
                    />


                </div>
            </div>
        </div>
    );
}

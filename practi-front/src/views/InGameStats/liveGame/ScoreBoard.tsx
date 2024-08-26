import React, { useState } from 'react';


interface ScoreBoardProps {
    myTeamName: string;
    rivalTeamName: string;
    myTeamScore: number;
    setMyTeamScore: (myTeamScore: number) => void;
    rivalTeamScore: number;
    setRivalTeamScore: (RivalTeamScore: number) => void;
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({ myTeamName, rivalTeamName, myTeamScore, setMyTeamScore, rivalTeamScore, setRivalTeamScore }) => {


    return (
        <div className="scoreboard-container">
            <div className="scoreboard-teams">
                {/* Team A */}
                <div className="scoreboard-team team-a">
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
                </div>
     
                {/* Team B */}
                <div className="scoreboard-team team-b">
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

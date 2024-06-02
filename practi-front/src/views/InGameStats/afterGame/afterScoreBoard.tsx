import React, { useState } from 'react';
import teamALogo from '../../../assets/images/teamA.png'; // Import team A logo image
import teamBLogo from '../../../assets/images/teamB.png'; // Import team B logo image


interface ScoreBoardProps {
    myTeamName: string;
    rivalTeamName: string;
    myTeamScore: number;
    rivalTeamScore: number;
}

export const AfterScoreBoard: React.FC<ScoreBoardProps> = ({ myTeamName, rivalTeamName, myTeamScore, rivalTeamScore }) => {


    return (
        <div className="scoreboard-container">
            <div className="scoreboard-teams">
                {/* Team A */}
                <div className="scoreboard-team team-a" style={{ width: '35%'}}>
                    <img src={teamALogo} alt="Team A Logo" />
                    <h2>{rivalTeamName}</h2>
                    </div>
                {/* Scores */}
                <div className="scoreboard-scores-after">
                    <div>
                        <h2>{rivalTeamScore} : {myTeamScore}</h2>
                    </div>
                </div>
                {/* Team B */}
                <div className="scoreboard-team team-b" style={{ width: '35%'}}>
                    <img src={teamBLogo} alt="Team B Logo" />
                    <h2>{myTeamName}</h2>

                </div>
           
        </div>
        </div>
    );
}

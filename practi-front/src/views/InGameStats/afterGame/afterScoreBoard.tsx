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
                <div className="scoreboard-team team-a" >
                    <h2>{rivalTeamName}</h2>
                    <h1> {rivalTeamScore}</h1>
                    </div>
                {/* Scores */}
                {/* Team B */}
                <div className="scoreboard-team team-b" >
                    <h2>{myTeamName}</h2>
                    <h1> {myTeamScore}</h1>
                </div>
           
        </div>
        </div>
    );
}

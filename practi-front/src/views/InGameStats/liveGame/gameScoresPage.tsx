// GameScoresPage.tsx
import React, { useState, useMemo } from 'react';
import { HeaderTwoGS } from '../../../cmps/headers/headertwoGS';
import { useParams } from 'react-router-dom';
import { ScoreBoard } from './ScoreBoard';
import { PlayerTable } from './PlayerTable'; // Import the PlayerTable component

interface GameScoresPageProps {
    token: string;
}
function formatDateTime(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month} ${hours}:${minutes}`;
}
export const GameScoresPage: React.FC<GameScoresPageProps> = ({ token }) => {
    const [myTeamScore, setMyTeamScore] = useState<number>(0);
    const [rivalTeamScore, setRivalTeamScore] = useState<number>(0);
    const params = useParams();
    const { teamName, rivalTeamName } = params;

    return (
        <div className="game-scores-page">
            <div className="top-fixed-header">
            <HeaderTwoGS  />
            </div>
            <div className="content-area">
                <div className='scoreboard-header'>
                    <ScoreBoard
                        myTeamName={teamName}
                        rivalTeamName={rivalTeamName}
                        myTeamScore={myTeamScore}
                        setMyTeamScore={setMyTeamScore}
                        rivalTeamScore={rivalTeamScore}
                        setRivalTeamScore={setRivalTeamScore}
                    /></div>
                <PlayerTable
                    myTeamName={teamName}
                    myTeamScore={myTeamScore}
                    setMyTeamScore={setMyTeamScore}
                    rivalTeamName={rivalTeamName}
                    rivalTeamScore={rivalTeamScore}
                />
            </div>
        </div>
    );
}

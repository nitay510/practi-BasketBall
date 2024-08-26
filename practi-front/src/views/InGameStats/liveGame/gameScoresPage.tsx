// GameScoresPage.tsx
import React, { useState, useMemo } from 'react';
import { HeaderTwoGS } from '../../../cmps/headers/headertwoGS';
import { useParams } from 'react-router-dom';
import { ScoreBoard } from './ScoreBoard';
import { PlayerTable } from './PlayerTable'; // Import the PlayerTable component

interface GameScoresPageProps {
    token: string;
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

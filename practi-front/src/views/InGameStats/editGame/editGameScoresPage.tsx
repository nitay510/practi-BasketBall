import React, { useState } from 'react';
import { HeaderTwo } from '../../../cmps/headers/headertwo';
import { useLocation } from 'react-router-dom';
import { Game } from '../game';
import { EditScoreBoard } from './editScoreBoard';
import { EditPlayerTable } from './editPlayerTable';
interface GameScoresPageProps {
  token: string;
}


export const EditGameScoresPage: React.FC<GameScoresPageProps> = ({ token }) => {
    const location = useLocation();
    const { game } = location.state as { game: Game };
    const [myTeamScore, setMyTeamScore] = useState<number>(game.myTeamScore);
    const [rivalTeamScore, setRivalTeamScore] = useState<number>(game.otherTeamScore);

  return (
    <div className="game-scores-page">
      <div className="top-fixed-header">
        <HeaderTwo />
      </div>
      <div className="content-area" style={{backgroundColor: 'black'}}>
      <div className='scoreboard-header'>
        <EditScoreBoard
          myTeamName={game.teamName}
          rivalTeamName={game.rivalTeamName}
          myTeamScore={myTeamScore}
          setMyTeamScore={setMyTeamScore}
          rivalTeamScore={rivalTeamScore}
          setRivalTeamScore={setRivalTeamScore}
          /></div>
        <EditPlayerTable
          myTeamName={game.teamName}
          myTeamScore={myTeamScore}
          setMyTeamScore={setMyTeamScore}
          rivalTeamName={game.rivalTeamName}
          rivalTeamScore={rivalTeamScore}
          game={game}
        />
      </div>
    </div>
  );
};

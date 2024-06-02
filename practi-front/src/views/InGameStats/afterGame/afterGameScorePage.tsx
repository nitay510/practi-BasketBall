import React, { useState } from 'react';
import { HeaderTwo } from '../../../cmps/headers/headertwo';
import { useLocation } from 'react-router-dom';
import { Game } from '../game';
import { AfterScoreBoard } from './afterScoreBoard';
import { AfterPlayerTable } from './afterPlayerTable';
interface GameScoresPageProps {
  token: string;
}


export const AfterGameScoresPage: React.FC<GameScoresPageProps> = ({ token }) => {
    const location = useLocation();
    const { game } = location.state as { game: Game };
    console.log(game);
    console.log(game.playerStats)


  return (
    <div className="game-scores-page">
      <div className="top-fixed-header">
        <HeaderTwo />
      </div>
      <div className="content-area" style={{backgroundColor: 'black'}}>
      <div className='scoreboard-header'>
        <AfterScoreBoard
          myTeamName={game.teamName}
          rivalTeamName={game.rivalTeamName}
          myTeamScore={game.myTeamScore}
          rivalTeamScore={game.otherTeamScore}
          /></div>
        <AfterPlayerTable
          myTeamName={game.teamName}
          game={game}
        />
      </div>
    </div>
  );
};

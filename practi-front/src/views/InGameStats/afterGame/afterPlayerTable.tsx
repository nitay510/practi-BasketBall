import React, { useState, useEffect } from 'react';
import { AfterPlayerRow } from './afterPlayerRow';
import { Player } from '../Player';
import { useNavigate } from 'react-router-dom';
import { Game } from '../game';
interface PlayerTableProps {
    myTeamName: string; // Your team
    game:Game;
}

export const AfterPlayerTable: React.FC<PlayerTableProps> = ({ myTeamName, game }) => {
    const navigate = useNavigate();
    const editGame= () =>{
        navigate('/editGame', { state: { game } });
    };
    return (
        <div className="player-table"  style={{ top: '38vw', height:'100%'}}>
            <h2>טבלת שחקנים</h2>
            <table>
                <thead>
                    <tr>
                        <th>ריבאונד</th>
                        <th>אסיסט</th>
                        <th>נק</th>
                        <th className='name-column'>שם</th>
                    </tr>
                </thead>
                <tbody>
                    {game.playerStats.map((player, index) => (
                        <AfterPlayerRow
                            key={index}
                            player={player}
                            index={index}
                        />

                    ))}
                </tbody>
            </table>
            <div className='buttom-buttons' style={{ textAlign: 'center', marginTop: '2vw' }}>
            <button className='save-button' onClick={editGame} style={{ marginLeft: '10px' }}>ערוך</button>
            </div>
        </div>
    );
};
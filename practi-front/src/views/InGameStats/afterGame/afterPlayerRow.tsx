// PlayerRow.tsx
import React, { useState } from 'react';
import { Player } from '../Player';

interface AfterPlayerRowProps {
    player: Player;
    index: number;

}

export const AfterPlayerRow: React.FC<AfterPlayerRowProps> = ({
    player, index
}) => {

    return (
        <tr key={index} className="player-row">
            <td>
               {player.rebounds}
            </td>

            <td>
              {player.assists}
            </td>

            <td>
               {player.score}
            </td>

            <td >{player.name}</td>

        </tr>
    );
};

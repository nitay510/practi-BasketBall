import React, { useState } from 'react';
import { Player } from '../Player';

interface EditPlayerRowProps {
    player: Player;
    index: number;
    onFieldChange: (index: number, field: keyof Player, value: string) => void;
    onIncrement: (index: number, field: keyof Player, cur: number) => void;
    onDecrement: (index: number, field: keyof Player, cur: number) => void;
}

export const EditPlayerRow: React.FC<EditPlayerRowProps> = ({
    player, index, onFieldChange, onIncrement, onDecrement
}) => {
    const handleIncrement = (field: keyof Player, cur: number) => {
        onIncrement(index, field, cur);
    };

    const handleDecrement = (field: keyof Player, cur: number) => {
        onDecrement(index, field, cur);
    };

    const [playerNum, setPlayerNum] = useState<number>(0);

    return (
        <tr key={index} className="player-row">
            <td>
                <div className="input-with-buttons">
                    <button onClick={() => handleIncrement('rebounds', player.rebounds)} className="player-table-button increment"></button>
                    <input
                        type="text"
                        value={player.rebounds}
                        onChange={(e) => onFieldChange(index, 'rebounds', e.target.value)}
                    />
                    <button onClick={() => handleDecrement('rebounds', player.rebounds)} className="player-table-button decrement"></button>
                </div>
            </td>

            <td>
                <div className="input-with-buttons">
                    <button onClick={() => handleIncrement('assists', player.assists)} className="player-table-button increment"></button>
                    <input
                        type="text"
                        value={player.assists}
                        onChange={(e) => onFieldChange(index, 'assists', e.target.value)}
                    />
                    <button onClick={() => handleDecrement('assists', player.assists)} className="player-table-button decrement"></button>
                </div>
            </td>

            <td>
                <div className="input-with-buttons">
                    <button onClick={() => handleIncrement('score', player.score)} className="player-table-button increment"></button>
                    <input
                        type="text"
                        value={player.score}
                        onChange={(e) => onFieldChange(index, 'score', e.target.value)}
                    />
                    <button onClick={() => handleDecrement('score', player.score)} className="player-table-button decrement"></button>
                </div>
            </td>


            <td className='name-column'>{player.name}</td>

        </tr>
    );
};

export default EditPlayerRow;

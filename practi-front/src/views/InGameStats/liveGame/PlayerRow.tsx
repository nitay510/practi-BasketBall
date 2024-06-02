import React, { useState } from 'react';
import { Player } from '../Player';

interface PlayerRowProps {
    player: Player;
    index: number;
    onFieldChange: (index: number, field: keyof Player, value: string) => void;
    onIncrement: (index: number, field: keyof Player, cur: number) => void;
    onDecrement: (index: number, field: keyof Player, cur: number) => void;
}

export const PlayerRow: React.FC<PlayerRowProps> = ({
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
            <td>
                <input
                    type="text"
                    maxLength={2}
                    value={playerNum}
                    onChange={(e) => {
                        const inputValue = parseInt(e.target.value, 10);
                        if (!isNaN(inputValue) && inputValue > 0) {
                            setPlayerNum(inputValue);
                        }
                    }}
                />
            </td>
        </tr>
    );
};

export default PlayerRow;

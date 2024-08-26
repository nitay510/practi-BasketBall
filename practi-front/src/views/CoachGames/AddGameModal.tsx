import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';

interface AddGameModalProps {
  teams: { teamName: string }[];
  myTeamName: string;
  setMyTeamName: (value: string) => void;
  rivalTeamName: string;
  setRivalTeamName: (value: string) => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  onClose: () => void;
  onAddGame: () => void;
}

const AddGameModal: React.FC<AddGameModalProps> = ({
  teams,
  myTeamName,
  setMyTeamName,
  rivalTeamName,
  setRivalTeamName,
  errorMessage,
  setErrorMessage,
  onClose,
  onAddGame,
}) => {
  return (
    <div className='new-game-modal'>
      <button
        className='modal-close-button'
        onClick={() => {
          onClose();
          setErrorMessage('');
        }}
      >
        <MdClose />
      </button>
      <h4>הוסף משחק חדש</h4>

      <select
        value={myTeamName}
        onChange={(e) => setMyTeamName(e.target.value)}
        placeholder='הקבוצה שלך'
        style={{ borderColor: !myTeamName && errorMessage ? 'red' : '' }}
      >
        <option value=''>בחר קבוצה</option>
        {teams.map((team, index) => (
          <option key={index} value={team.teamName}>
            {team.teamName}
          </option>
        ))}
      </select>
      <input
        type='text'
        value={rivalTeamName}
        onChange={(e) => setRivalTeamName(e.target.value)}
        placeholder='שם הקבוצה היריבה'
        style={{ borderColor: !rivalTeamName && errorMessage ? 'red' : '' }}
      />
      <button onClick={onAddGame}>הוסף משחק</button>
      {errorMessage && (
        <p
          style={{
            color: 'red',
            fontSize: '1.25em',
            marginTop: '10px',
            textAlign: 'center',
          }}
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default AddGameModal;

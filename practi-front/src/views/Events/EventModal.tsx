// /mnt/data/EventModal.tsx
import { MdOutlineExpandMore, MdDelete, MdClose, MdAdd } from 'react-icons/md';
import React from 'react';

interface EventModalProps {
    isOpen: boolean;
    onClose: () => void;
    onNewEvent: () => void;
    onNewGame: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onNewEvent, onNewGame }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="add-team-popup">
            <button className="close" onClick={() => onClose()}>
                <MdClose size={24} />
            </button>
            <button onClick={onNewEvent} >הוסף אימון</button>
            <button onClick={onNewGame} >הוסף משחק</button>
        </div>
    );
};

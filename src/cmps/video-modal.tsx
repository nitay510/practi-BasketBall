import { VideoPlayer } from './video-player'
import { FaTimes } from 'react-icons/fa'
import React from 'react';


interface VideoModalProps {
    onToggleVidModal: () => void;
    test: string

}

export const VideoModal = ({ onToggleVidModal }: VideoModalProps) => {

    return (
        <div className="video-modal-container">
            <div className="video-modal">
                <VideoPlayer videoUrl={'https://res.cloudinary.com/dqvcz6hvd/video/upload/v1673207803/%D7%94%D7%98%D7%A2%D7%99%D7%95%D7%AA/%D7%A1%D7%91%D7%A1%D7%95%D7%91_%D7%9E%D7%A2%D7%9E%D7%93%D7%AA_%D7%A4%D7%95%D7%A1%D7%98-%D7%90%D7%A4-_1_pyzr3i.mp4'} />
                <FaTimes className='back-modal-btn' onClick={onToggleVidModal} />
            </div>

        </div>
    )

}


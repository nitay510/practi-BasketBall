import React, { useState } from 'react';
import logo from '../../assets/images/logo.jpeg';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowForwardIos } from 'react-icons/md';



export const HeaderTwoGS = (): JSX.Element => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [actionConfirmed, setActionConfirmed] = useState(false);
  const [actionType, setActionType] = useState('');

  const goBack = () => {
    setActionType('goBack');
    setShowModal(true);
    setActionConfirmed(false);
  };

  const handleLogo = () => {
    setActionType('navigateToApp');
    setShowModal(true);
    setActionConfirmed(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmAction = () => {
    setActionConfirmed(true);
    setShowModal(false);
    if (actionType === 'goBack') {
      navigate(-1);
    } else if (actionType === 'navigateToApp') {
      navigate('/app-manager');
    }
  };

  const cancelAction = () => {
    setShowModal(false);
  };

  return (
    <>
      <header>
        <button className="logo-container" onClick={handleLogo}>
          <img src={logo} alt="" />
        </button>
        <button className="back-button" onClick={goBack}>
          <MdOutlineArrowForwardIos />
        </button>
      </header>
      {showModal && (
        <div className="quit-modal">
          <div className="modal-content">

            <h2>המשחק אינו שמור</h2>
            <h3>?לצאת ללא שמירה </h3>
            <div className='button-container'>
              <button onClick={cancelAction}>לא</button>
              <button onClick={confirmAction}>כן</button></div>
          </div>
        </div>
      )}
    </>
  );
};

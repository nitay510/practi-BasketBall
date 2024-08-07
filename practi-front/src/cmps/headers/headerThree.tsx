import logo from '../../assets/images/logo.jpeg';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowForwardIos} from 'react-icons/md';
import React from 'react';

/* this component is the header of pages with logo and go back arrow */
export const HeaderThree = (): JSX.Element => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Go back to the previous pag

  };
  const handleLogo = () => {
    navigate('/app-manager');
  };
    return (
        
        <header>
                 <button className='logo-container'  onClick={handleLogo}>
                <img src={logo} alt="" />
            </button>
         <button className='back-button' onClick={goBack}>
        <MdOutlineArrowForwardIos/>
      </button>
        </header>
    )
}
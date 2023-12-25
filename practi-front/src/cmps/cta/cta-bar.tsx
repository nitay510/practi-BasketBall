import { MdHistory } from 'react-icons/md';
import { MdPeople } from 'react-icons/md';
import { MdHome } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

/* this component is the down menu of the app, click on each icon move you to another place */

export const CtaBar = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState<string>(window.location.pathname);

  const handleNavigation = (path: string) => {
    setActiveLink(path);
    navigate(path);
  };

  return (
    <div className="cta-bar">
      <div
        onClick={() => handleNavigation('/app')}
        className={`ic-container ${activeLink === '/app' ? 'ic-active' : ''}`}
      >
        <MdHome />
      </div>

      <div
        onClick={() => handleNavigation('/history')}
        className={`ic-container ${activeLink === '/history' ? 'ic-active' : ''}`}
      >
        <MdHistory />
      </div>

      <div
        onClick={() => handleNavigation('/historyFriends')}
        className={`ic-container ${activeLink === '/historyFriends' ? 'ic-active' : ''}`}
      >
        <MdPeople />
      </div>
    </div>
  );
};
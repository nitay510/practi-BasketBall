import { MdHistory, MdPeople, MdHome } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export const CtaBar = (): JSX.Element => {
  const navigate = useNavigate();
  const [activeIcon, setActiveIcon] = useState<string>('');

  const handleAppNavigation = () => {
    setActiveIcon('app');
    navigate('/app');
  };

  const handleHistoryNavigation = () => {
    setActiveIcon('history');
    navigate('/history');
  };

  const handleHistoryFriendsNavigation = () => {
    setActiveIcon('historyFriends');
    navigate('/historyFriends');
  };

  return (
    <div className="cta-bar">
      <div
        onClick={handleAppNavigation}
        className={`ic-container ${activeIcon === 'app' ? 'ic-active' : ''}`}
      >
        <MdHome />
      </div>

      <div
        onClick={handleHistoryNavigation}
        className={`ic-container ${activeIcon === 'history' ? 'ic-active' : ''}`}
      >
        <MdHistory />
      </div>

      <div
        onClick={handleHistoryFriendsNavigation}
        className={`ic-container ${activeIcon === 'historyFriends' ? 'ic-active' : ''}`}
      >
        <MdPeople />
      </div>
    </div>
  );
};

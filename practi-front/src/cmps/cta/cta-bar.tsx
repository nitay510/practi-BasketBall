import { MdHistory, MdPeople, MdPerson, MdVideoLibrary, MdNotifications } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

export const CtaBar = (): JSX.Element => {
    const navigate = useNavigate();

    const handleAppClick = () => {
        navigate('/app', { state: { drillToDo: null } });
    };

    return (
        <div className="cta-bar">
            <div className='ic-container' onClick={handleAppClick}>
                <MdVideoLibrary />
                <span className="icon-label">אימונים</span>
            </div>
            <NavLink to="/history">
                <div className='ic-container'>
                    <MdHistory />
                    <span className="icon-label">היסטוריה</span>
                </div>
            </NavLink>
            <NavLink to="/historyFriends">
                <div className='ic-container'>
                    <MdPeople />
                    <span className="icon-label">חברים</span>
                </div>
            </NavLink>
            <NavLink to="/notifications">
                <div className='ic-container'>
                    <MdNotifications />
                    <span className="icon-label">התראות</span>
                </div>
            </NavLink>
            <NavLink to="/profile">
                <div className='ic-container'>
                    <MdPerson />
                    <span className="icon-label">פרופיל</span>
                </div>
            </NavLink>
        </div>
    );
}
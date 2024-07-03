import { FaHome, FaCalendarAlt, FaVideo, FaBasketballBall } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

export const CtaBarManager = (): JSX.Element => {
    return (
        <div className="cta-bar">
            <NavLink to={'/app-manager'}>
                <div className='ic-container'>
                    <FaHome />
                    <span className="icon-label">בית</span>
                </div>
            </NavLink>
             < NavLink to={'/week-calendar'}>
                <div className='ic-container'>
                    <FaCalendarAlt />
                <span className="icon-label">יומן</span>
                </div>
            </NavLink>
            <NavLink to={'/coach-video'}>
                <div className='ic-container'>
               
                    <FaVideo />
                    <span className="icon-label">אימונים</span>
                </div>
            </NavLink>
            <NavLink to={'/coach-games'}>
                <div className='ic-container'>
                    <FaBasketballBall />
                    <span className="icon-label">משחקים</span>
                </div>
            </NavLink>
        </div>
    );
};

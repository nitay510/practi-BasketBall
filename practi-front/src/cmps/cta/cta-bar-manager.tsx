import { FaHome, FaCalendarAlt, FaVideo, FaBasketballBall } from 'react-icons/fa';
import { NavLink } from "react-router-dom";

export const CtaBarManager = (): JSX.Element => {
    return (
        <div className="cta-bar">
            <NavLink to={'/app-manager'}>
                <div className='ic-container'>
                    <FaHome />
                </div>
            </NavLink>
             < NavLink to={'/week-calendar'}>
                <div className='ic-container'>
                    <FaCalendarAlt />
                </div>
            </NavLink>
            <NavLink to={'/coach-video'}>
                <div className='ic-container'>
                    <FaVideo />
                </div>
            </NavLink>
            <NavLink to={'/coach-games'}>
                <div className='ic-container'>
                    <FaBasketballBall />
                </div>
            </NavLink>
        </div>
    );
};

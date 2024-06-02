import { MdHistory } from 'react-icons/md'
import { MdPeople,MdPerson } from 'react-icons/md'
import { MdHome } from 'react-icons/md'



import { NavLink } from "react-router-dom"
/* this component is the down menu of the app, click oon each icon move you to another place */

export const CtaBar = (): JSX.Element => {
    return (
        <div className="cta-bar">
               < NavLink to={'/app'}>
            <div className='ic-container'>
              <MdHome/>
            </div>
         </NavLink>
            < NavLink to={'/history'}>
            <div className='ic-container'>
                <MdHistory />
            </div>
            </NavLink>
            < NavLink to={'/historyFriends'}>
            <div className='ic-container'>
           <MdPeople/>
            </div>
            </NavLink>
            < NavLink to={'/profile'}>
            <div className='ic-container'>
           <MdPerson/>
            </div>
            </NavLink>
        </div>

    );
};

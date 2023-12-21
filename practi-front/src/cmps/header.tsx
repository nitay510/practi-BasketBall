import logo from '../assets/images/logo.jpeg'
import { useNavigate } from 'react-router-dom';
import { MdLogout} from 'react-icons/md';
import { NavLink } from "react-router-dom"

/* this component is the header of pages with logo and go back arrow */
export const Header = (): JSX.Element => {
  const navigate = useNavigate();

  const handleLogout = () => {
  // Display a confirmation dialog
  const shouldLogout = window.confirm('האם תרצה להתנק?');

  // If the user chooses "כן", proceed with the logout
  if (shouldLogout) {
    // Clear the localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userName');

    // Navigate to the login page
    navigate('/');
  // If the user chooses "לא", do nothing (cancel logout)
    }
    // If the user chooses "לא", do nothing (cancel logout)
  };
    return (
        
        <header>
                 < NavLink to={'/app'}>
                 <div className='logo-container'>
                <img src={logo} alt="" />
            </div>
         </NavLink>
         <button className='back-button' onClick={handleLogout}>
       <MdLogout/>
      </button>
        </header>
    )
}
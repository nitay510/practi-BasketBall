import logo from '../assets/images/logo.jpeg'
import { GiHamburgerMenu } from 'react-icons/gi'

export const Header = (): JSX.Element => {
    return (
        <header>
            <div className='logo-container'>
                <img src={logo} alt="" />
            </div>
            <button className='menu-btn'>
                <GiHamburgerMenu />
            </button>
        </header>
    )
}
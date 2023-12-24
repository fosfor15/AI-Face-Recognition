import { useState, useContext } from 'react'

import Tilt from 'react-parallax-tilt';
import AuthContext from '../../context/AuthContext';

import LogoMenu from '../LogoMenu/LogoMenu';

import './Logo.css';


const Logo = () => {
    const { isAuth, setAuth, setUser } = useContext(AuthContext);

    const [ isDropdownOpen, toggleDropdown ] = useState(false);

    if (!isAuth) {
        return;
    }

    const toggleMenuDropdown = () => {
        toggleDropdown(!isDropdownOpen);
    };

    const toggleProfileModal = () => {
        console.log('toggleProfileModal');
    };

    const signOut = () => {
        setAuth(false);
        localStorage.removeItem('isAuth');
        
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <div className='logo-container'>
            <LogoMenu
                isDropdownOpen={ isDropdownOpen }
                toggleMenuDropdown={ toggleMenuDropdown }
                toggleProfileModal={ toggleProfileModal }
                signOut={ signOut }
            >
                <Tilt>
                    <div className='logo'>👾</div>
                </Tilt>
            </LogoMenu>
        </div>
    );
}

export default Logo;

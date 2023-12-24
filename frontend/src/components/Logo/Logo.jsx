import { useState, useContext } from 'react'

import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import Tilt from 'react-parallax-tilt';
import AuthContext from '../../context/AuthContext';

import './Logo.css';


const Logo = () => {
    const { isAuth, setAuth, setUser } = useContext(AuthContext);
    const [ isOpen, toggleOpen ] = useState(false);

    if (!isAuth) {
        return;
    }

    const toggleDropdown = () => {
        toggleOpen(!isOpen);
    };

    const viewProfile = () => {
        console.log('View Profile');
    };

    const signOut = () => {
        setAuth(false);
        localStorage.removeItem('isAuth');
        
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <div className='logo-container'>
            <Dropdown
                isOpen={ isOpen }
                toggle={ toggleDropdown }
            >
                <DropdownToggle
                    data-toggle="dropdown"
                    tag="div"
                >
                    <Tilt>
                        <div className='logo'>👾</div>
                    </Tilt>
                </DropdownToggle>

                <DropdownMenu>
                    <DropdownItem onClick={ viewProfile }>
                        View Profile
                    </DropdownItem>
                    <DropdownItem onClick={ signOut }>
                        Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}

export default Logo;

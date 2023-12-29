import { useState, useContext } from 'react'

import Tilt from 'react-parallax-tilt';
import AuthContext from '../../context/AuthContext';

import LogoMenu from '../LogoMenu/LogoMenu';
import ProfileModal, { petsMap } from '../ProfileModal/ProfileModal';

import axiosInstance from '../../network/axios-instance';

import './Logo.css';


const Logo = () => {
    const { isAuth, setAuth, user, setUser } = useContext(AuthContext);

    const [ isDropdownOpen, toggleDropdown ] = useState(false);
    const [ isModalOpen, toggleModal ] = useState(false);

    if (!isAuth) {
        return;
    }

    const toggleMenuDropdown = () => {
        toggleDropdown(!isDropdownOpen);
    };

    const toggleProfileModal = () => {
        toggleModal(!isModalOpen);
    };

    const signOut = async () => {
        const token = localStorage.getItem('token');

        const response = await axiosInstance.post('/signout', {}, {
            headers: { 'Authorization': token }
        });

        if (!response.data.isAuth) {
            setAuth(false);
            setUser(null);
            localStorage.removeItem('token');
        }
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
                    <div className='logo'>{ petsMap.get(user.pet ?? 'kind-monster') }</div>
                </Tilt>
            </LogoMenu>

            <ProfileModal
                isModalOpen={ isModalOpen }
                toggleProfileModal={ toggleProfileModal }
            />
        </div>
    );
}

export default Logo;

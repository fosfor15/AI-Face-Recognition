import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

import './LogoMenu.css';


const LogoMenu = ({
    children,
    isDropdownOpen,
    toggleMenuDropdown,
    toggleProfileModal,
    signOut
}) => {
    return (
        <Dropdown
            isOpen={ isDropdownOpen }
            toggle={ toggleMenuDropdown }
        >
            <DropdownToggle
                data-toggle="dropdown"
                tag="div"
            >
                { children }
            </DropdownToggle>

            <DropdownMenu>
                <DropdownItem onClick={ toggleProfileModal }>
                    View Profile
                </DropdownItem>
                <DropdownItem onClick={ signOut }>
                    Sign Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default LogoMenu;

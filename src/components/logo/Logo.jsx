import { useContext } from 'react'
import AuthContext from '../../context/AuthContext';
import Tilt from 'react-parallax-tilt';
import './Logo.css';


const Logo = () => {
    const { isAuth, setAuth, setUser } = useContext(AuthContext);

    if (!isAuth) {
        return;
    }

    const signOut = () => {
        setAuth(false);
        localStorage.removeItem('isAuth');
        
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <div className='logo-container'>
            <Tilt>
                <div className='logo'>👾</div>
            </Tilt>
            <a
                href=''
                onClick={ signOut }
            >Sign Out</a>
        </div>
    );
}

export default Logo;

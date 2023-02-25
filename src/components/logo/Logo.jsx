import Tilt from 'react-parallax-tilt';
import './Logo.css';

const Logo = () => {
    return (
        <div className='logo-container'>
            <Tilt>
                <div className='logo'>👾</div>
            </Tilt>
            <a href='#'>Sign Out</a>
        </div>
    );
}

export default Logo;

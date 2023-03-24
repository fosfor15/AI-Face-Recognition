import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

import './Rank.css';


const Rank = () => {
    const { user: { name, entries } } = useContext(AuthContext);

    return (
        <div className='rank'>
            <p>Dear { name }, your rank is #{ entries }</p>
        </div>
    );
}

export default Rank;

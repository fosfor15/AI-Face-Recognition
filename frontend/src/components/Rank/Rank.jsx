import { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

import './Rank.css';

const entriesBadges = [
    '🙂', '😉', '🫡', '🙃', '😀', '😄', '😁', '😎', '😺', '👻', '👾', '👽', '🚀', '💫', '✨'
];

const Rank = () => {
    const { user: { name, entries } } = useContext(AuthContext);
    const badge = entries < entriesBadges.length
        ? entriesBadges[entries]
        : entriesBadges.at(-1);

    return (
        <div className='rank'>
            <p>Dear { name }, your rank is #{ entries }</p>
            <p>Your badge is { badge }</p>
        </div>
    );
}

export default Rank;

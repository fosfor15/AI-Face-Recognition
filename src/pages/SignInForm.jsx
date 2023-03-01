import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

import { Link } from 'react-router-dom';

import '../styles/AuthForms.css';


const SignInForm = () => {
    const { setAuth } = useContext(AuthContext);

    const signIn = (event) => {
        event.preventDefault();
        
        setAuth(true);
        localStorage.setItem('isAuth', 'true');
    };

    return (
        <form
            className="sign-in-form"
            onSubmit={ signIn }
        >
            <h2>Sign in</h2>

            <div className="form-control-container">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                />
            </div>

            <div className="form-control-container">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                />
            </div>

            <button type="submit">Sign in</button>
            <Link to="/registration">Register</Link>
        </form>
    );
}

export default SignInForm;

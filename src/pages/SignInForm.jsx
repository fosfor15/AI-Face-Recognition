import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

import { Link } from 'react-router-dom';

import axiosInstance from '../network/axios-instance';

import '../styles/AuthForms.css';


const SignInForm = () => {
    const { setAuth } = useContext(AuthContext);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ isAuthError, setAuthError ] = useState(false);

    const signIn = async (event) => {
        event.preventDefault();

        const userCredentials = {
            email,
            password
        };

        axiosInstance.post('/signin', userCredentials)
            .then(response => {
                const { isAuth } = response.data;

                if (isAuth) {
                    setAuth(isAuth);
                    localStorage.setItem('isAuth', 'true');
                } else {
                    setAuthError(true);
                    setEmail('');
                    setPassword('');

                    setTimeout(() => {
                        setAuthError(false);
                    }, 3e3);
                }
            })
            .catch(error => {
                console.log('error :>> ', error);
            });
    };

    return (
        <form
            className="sign-in-form"
            onSubmit={ signIn }
        >
            <h2>Sign in</h2>

            { isAuthError
            && <h3>
                The Email or Password is incorrect<br />
                Please try again
            </h3> }

            <div className="form-control-container">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={ email }
                    onChange={ event => setEmail(event.target.value) }
                    required
                />
            </div>

            <div className="form-control-container">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={ password }
                    onChange={ event => setPassword(event.target.value) }
                    required
                />
            </div>

            <button type="submit">Sign in</button>
            <Link to="/registration">Register</Link>
        </form>
    );
}

export default SignInForm;

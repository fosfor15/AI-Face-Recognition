import { useState, useContext, useEffect } from 'react';
import AuthContext from '../context/AuthContext';

import { Link } from 'react-router-dom';

import axiosInstance from '../network/axios-instance';

import '../styles/AuthForms.css';


const SignInForm = () => {
    const { setAuth, setUser } = useContext(AuthContext);

    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [ isRepeatingSignIn, setRepeatingSignIn ] = useState(true);
    const [ isWrongCredentials, setWrongCredentials ] = useState(false);
    const [ isAuthError, setAuthError ] = useState(false);


    const requestSignIn = async (payload) => {
        const headers = payload.headers || null;
        const body = payload.data || {};

        try {
            const response = await axiosInstance.post('/signin', body, { headers });
            const { isAuth = false } = response.data;
    
            if (isAuth) {
                const { userId, token } = response.data;

                const { data: user } = await axiosInstance.get(`/user/${userId}`, {
                    headers: { 'Authorization': token }
                });
                
                setUser(user);
                localStorage.setItem('token', token);
                setAuth(isAuth);
            }

            return Promise.resolve({ isAuth });
        } catch (error) {
            setAuthError(true);
            console.error('Auth error :>> ', error);
        }
    };

    useEffect(() => {
        (async () => {            
            const token = localStorage.getItem('token');
        
            if (token) {
                const { isAuth } = await requestSignIn({
                    headers: { 'Authorization': token }
                });

                if (!isAuth) {
                    setAuth(false);
                    setUser(null);
                    localStorage.removeItem('token');
                }
            }

            setRepeatingSignIn(false);
        })()
    }, []);
    
    const signInUser = async (event) => {
        event.preventDefault();

        const { isAuth } = await requestSignIn({
            data: {
                email,
                password
            }
        });

        if (!isAuth) {
            setWrongCredentials(true);
            setEmail('');
            setPassword('');
        }
    };


    return (
        <>
            { isRepeatingSignIn
                ? <h4>
                    Loading
                </h4>
                : <form
                    className="sign-in-form"
                    onSubmit={ signInUser }
                >
                    <h2>Sign in</h2>

                    { isWrongCredentials &&
                        <h4>
                            The Email or Password is incorrect<br />
                            Please try again with correct ones
                        </h4>
                    }

                    { isAuthError &&
                        <h4>
                            Authentication error<br />
                            Please try again later
                        </h4>
                    }

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
            }
        </>
    );
}

export default SignInForm;

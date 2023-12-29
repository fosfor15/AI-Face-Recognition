import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axiosInstance from '../network/axios-instance';

import '../styles/AuthForms.css';


const RegistrationForm = () => {
    const navigate = useNavigate();

    const [ email, setEmail ] = useState('');
    const [ name, setName ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ repeatedPassword, setRepeatedPassword ] = useState('');
    const [ isPasswordError, setPasswordError ] = useState(false);
    const [ isRegister, setRegister ] = useState(false);

    const registerUser = (event) => {
        event.preventDefault();

        if (password != repeatedPassword) {
            setPasswordError(true);
            setPassword('');
            setRepeatedPassword('');

            setTimeout(() => {
                setPasswordError(false);
            }, 3e3);

            return;
        }

        const userCredentials = {
            name,
            email,
            password
        };

        axiosInstance.post('/register', userCredentials)
            .then(response => {
                const user = response.data;

                if (user) {
                    setRegister(true);
                    setName('');
                    setEmail('');
                    setPassword('');

                    setTimeout(() => {
                        navigate('/');
                    }, 3e3);
                }
            })
            .catch(error => {
                console.error('error :>> ', error);
            });
    };

    return (
        <form
            className="registration-form"
            onSubmit={ registerUser }
        >
            <h2>Registration</h2>

            { isRegister
            ? <p>You are registered successfully</p>
            : <>
                <div className="form-control-container">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={ name }
                        onChange={ event => setName(event.target.value) }
                        required
                    />
                </div>

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

                { isPasswordError
                && <h3>
                    Password mismatch<br />
                    Please enter your password again
                </h3> }

                <div className="form-control-container">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={ password }
                        onChange={
                            event => setPassword(event.target.value)
                        }
                        required
                    />
                </div>

                <div className="form-control-container">
                    <label htmlFor="repeated-password">Repeat password</label>
                    <input
                        type="password"
                        id="repeated-password"
                        value={ repeatedPassword }
                        onChange={
                            event => setRepeatedPassword(event.target.value)
                        }
                        required
                    />
                </div>

                <button type="submit">Register</button>
            </> }
            <Link to="/">Sign In</Link>
        </form>
    );
}

export default RegistrationForm;

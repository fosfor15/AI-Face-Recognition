import { createRef } from 'react';
import './SignInForm.css';

const SignInForm = () => {
    return (
        <form className="sign-in-form">
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

            <button
                type="submit"
            >Sign in</button>

            <a href="#">Register</a>
        </form>
    );
}

export default SignInForm;

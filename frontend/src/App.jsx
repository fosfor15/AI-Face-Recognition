import React, { useState, useEffect, useCallback } from 'react';

import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import tsParticlesOptions from './assets/particles.json';

import AuthContext from './context/AuthContext';
import Navigation from './components/Navigation/Navigation';
import AppRouter from './router/AppRouter';

import './styles/App.css';


function App() {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const [ isAuth, setAuth ] = useState(false);
    const [ user, setUser ] = useState(null);

    return (
        <div className="App">
            <Particles
                id="tsparticles"
                options={ tsParticlesOptions }
                init={ particlesInit }
            />
            <AuthContext.Provider
                value={{ isAuth, setAuth, user, setUser }}
            >
                <Navigation />
                <AppRouter />
            </AuthContext.Provider>
        </div>
    );
}

export default App;

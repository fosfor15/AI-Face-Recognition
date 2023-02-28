import React, { useState, useCallback } from 'react';

import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import tsParticlesOptions from './assets/particles.json';

import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ImageRecognitionResult from './components/ImageRecognitionResult/ImageRecognitionResult';

import './App.css';


function App() {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const [ imageUrl, setImageUrl ] = useState('');

    const inputImageUrl = _imageUrl => {
        setImageUrl(_imageUrl);
        console.log('imageUrl :>> ', imageUrl);
    };

    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    return (
        <div className="App">
            <Particles
                id="tsparticles"
                options={ tsParticlesOptions }
                init={ particlesInit }
            />
            <Navigation />
            <Rank />
            <ImageLinkForm
                inputImageUrl={ inputImageUrl }
            />
            <ImageRecognitionResult
                imageUrl={ imageUrl }
            />
        </div>
    );
}

export default App;

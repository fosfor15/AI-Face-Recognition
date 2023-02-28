import React, { useState, useCallback } from 'react';

import Particles from 'react-particles';
import { loadFull } from 'tsparticles';
import tsParticlesOptions from './assets/particles.json';

import Navigation from './components/Navigation/Navigation';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ImageRecognitionResult from './components/ImageRecognitionResult/ImageRecognitionResult';

import './App.css';


const PAT = '34fb1e287c294f418d8d93cbcd002a67';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';


function App() {
    const particlesInit = useCallback(async engine => {
        await loadFull(engine);
    }, []);

    const [ imageUrl, setImageUrl ] = useState('');

    const inputImageUrl = imageUrl => {
        setImageUrl(imageUrl);

        const body = {
            user_app_id: {
                user_id: USER_ID,
                app_id: APP_ID
            },
            inputs: [
                {
                    data: {
                        image: {
                            url: imageUrl
                        }
                    }
                }
            ]
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            },
            body: JSON.stringify(body)
        };

        fetch(
            `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`,
            requestOptions
        )
        .then(response => response.json())
        .then(response => {
            console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        })
        .catch(error => console.log('error', error));

        setTimeout(() => {
            document.getElementsByClassName('image-recognition-result')[0].scrollIntoView(true);
        }, 50);
    };

    // const imageRecognitionResult = '';

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

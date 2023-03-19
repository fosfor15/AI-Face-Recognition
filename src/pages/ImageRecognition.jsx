import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import ImageRecognitionResult from '../components/ImageRecognitionResult/ImageRecognitionResult';

import axios from 'axios';
import axiosInstance from '../network/axios-instance';


const PAT = '34fb1e287c294f418d8d93cbcd002a67';
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';

const computeBoundingBox = (rawBoundingBox) => {
    const boundingBox = {};

    for (let [ side, coord ] of Object.entries(rawBoundingBox)) {
        if (side == 'right_col' || side == 'bottom_row') {
            coord = 1 - coord;
        }

        boundingBox[ side.match(/(\w+)_/)[1] ] = (coord * 1e2).toFixed(2) + '%';
    }

    return boundingBox;
};


const ImageRecognition = () => {
    const { user, setUser } = useContext(AuthContext);

    const [ imageUrl, setImageUrl ] = useState('');
    const [ boundingBox, setBoundingBox ] = useState(null);

    const submitImageUrl = (imageUrl) => {
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

        const config = {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            }
        };

        setBoundingBox(null);

        axios.post(
            `https://api.clarifai.com/v2/models/${MODEL_ID}/outputs`,
            body,
            config
        )
        .then(response => {
            const rawBoundingBox = response.data.outputs[0].data.regions[0].region_info.bounding_box;
            const boundingBox = computeBoundingBox(rawBoundingBox);

            setImageUrl(imageUrl);
            setBoundingBox(boundingBox);

            setTimeout(() => {
                document.getElementsByClassName('image-recognition-result')[0].scrollIntoView(true);
            }, 50);

            return axiosInstance.put('/entries', { id: user.id });
        })
        .then(response => {
            const { entries } = response.data;
            const updatedUser = { ...user, entries };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        })
        .catch(error => {
            console.log('error', error)
        });
    };

    return (
        <>
            <Rank />
            <ImageLinkForm
                submitImageUrl={ submitImageUrl }
            />
            <ImageRecognitionResult
                imageUrl={ imageUrl }
                boundingBox={ boundingBox }
            />
        </>
    );
}

export default ImageRecognition;

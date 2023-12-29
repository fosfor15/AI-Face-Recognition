import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

import Rank from '../components/Rank/Rank';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import ImageRecognitionResult from '../components/ImageRecognitionResult/ImageRecognitionResult';

import axiosInstance from '../network/axios-instance';


const convertBoundingBoxes = (boundingBoxes) => {
    const convertedBoundingBoxes = boundingBoxes.map(boundingBox => {
        const convertedBoundingBox = {};

        for (let [ side, coord ] of Object.entries(boundingBox)) {
            if (side == 'right' || side == 'bottom') {
                coord = 1 - coord;
            }

            convertedBoundingBox[side] = (coord * 1e2).toFixed(2) + '%';
        }

        return convertedBoundingBox;
    });

    return convertedBoundingBoxes;
};

const ImageRecognition = () => {
    const { user, setUser, setAuth } = useContext(AuthContext);

    const [ imageUrl, setImageUrl ] = useState('');
    const [ boundingBoxes, setBoundingBoxes ] = useState([]);

    const submitImage = (imageUrl) => {
        setImageUrl('');
        setBoundingBoxes([]);

        axiosInstance.post('/image', { imageUrl }, {
            headers: { 'Authorization': localStorage.getItem('token') }
        })
            .then(response => {
                const success = response.data?.success;

                if (success) {
                    const { boundingBoxes: initialBoundingBoxes } = response.data;
                    const boundingBoxes = convertBoundingBoxes(initialBoundingBoxes);
    
                    setImageUrl(imageUrl);
                    setBoundingBoxes(boundingBoxes);
    
                    setTimeout(() => {
                        document.getElementsByClassName('image-recognition-result')[0].scrollIntoView(true);
                    }, 50);
    
                    axiosInstance.put('/entries', { id: user.id }, {
                        headers: { 'Authorization': localStorage.getItem('token') }
                    })
                    .then(response => {
                        const { entries } = response.data;
                        const updatedUser = { ...user, entries };
                        setUser(updatedUser);
                    });

                } else if (!response.data.isAuth) {
                    setAuth(false);
                    setUser(null);
                    localStorage.removeItem('token');
                }
            })
            .catch(error => {
                console.error('error', error)
            });
    };

    return (
        <>
            <Rank />
            <ImageLinkForm
                submitImage={ submitImage }
            />
            <ImageRecognitionResult
                imageUrl={ imageUrl }
                boundingBoxes={ boundingBoxes }
            />
        </>
    );
}

export default ImageRecognition;

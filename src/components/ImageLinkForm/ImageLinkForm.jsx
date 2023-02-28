import React, { createRef } from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ inputImageUrl }) => {
    const imageUrlInput = createRef();

    const handleFormSubmit = (event) => {
        event.preventDefault();
        inputImageUrl(imageUrlInput.current.value);
    };

    return (
        <form
            className='image-link-form'
            onSubmit={ handleFormSubmit }
        >
            <p>This AI will detect faces on the uploaded images</p>
            <div>
                <input
                    type='search'
                    ref={ imageUrlInput }
                />
                <button type='submit'>Detect</button>
            </div>
        </form>
    );
}

export default ImageLinkForm;

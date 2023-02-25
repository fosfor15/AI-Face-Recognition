import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = () => {
    return (
        <form className='image-link-form'>
            <p>This AI will detect faces on the uploaded images</p>
            <div>
                <input type='search' />
                <button type='button'>Detect</button>
            </div>
        </form>
    );
}

export default ImageLinkForm;

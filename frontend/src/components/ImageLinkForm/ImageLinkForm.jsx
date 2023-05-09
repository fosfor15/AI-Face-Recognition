import {  useState, createRef } from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ submitImage }) => {
    const [ isError, setError ] = useState(false);

    const imageUrlInput = createRef();

    const imageLinkSubmit = (event) => {
        event.preventDefault();

        submitImage(imageUrlInput.current.value);
        imageUrlInput.current.value = '';
    };

    const checkImageUrlExist = () => {
        if (!imageUrlInput.current.value) {
            setError(true);

            setTimeout(() => {
                setError(false);
            }, 5e3);
        }
    }

    return (
        <form
            className='image-link-form'
            onSubmit={ imageLinkSubmit }
        >
            <label htmlFor='image-url'>
                { isError
                    ? 'Process is stopped due to no image URL'
                    : 'This AI will detect faces on the uploaded images' }
            </label>

            <div>
                <input
                    type='search'
                    id='image-url'
                    ref={ imageUrlInput }
                    required
                />

                <button
                    type='submit'
                    onClick={ checkImageUrlExist }
                >Detect</button>
            </div>
        </form>
    );
}

export default ImageLinkForm;

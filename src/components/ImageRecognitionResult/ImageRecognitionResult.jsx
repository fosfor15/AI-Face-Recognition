import './ImageRecognitionResult.css';

const ImageRecognitionResult = ({ imageUrl }) => {
    return (
        <div className="image-recognition-result">
            { imageUrl &&
            <img
                src={ imageUrl }
                alt='Image recognition result'
            /> }
        </div>
    );
};

export default ImageRecognitionResult;

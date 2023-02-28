import './ImageRecognitionResult.css';

const ImageRecognitionResult = ({ imageUrl }) => {
    if (!imageUrl) {
        return;
    }

    return (
        <div className="image-recognition-result">
            <img
                src={ imageUrl }
                alt='Image recognition result'
            />
        </div>
    );
};

export default ImageRecognitionResult;

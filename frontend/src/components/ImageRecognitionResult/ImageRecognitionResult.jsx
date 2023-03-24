import './ImageRecognitionResult.css';

const ImageRecognitionResult = ({ imageUrl, boundingBox }) => {

    return (
        <div className="image-recognition-result">
            { imageUrl &&
            <div className="relative-container">
                <img
                    src={ imageUrl }
                    alt='Image recognition result'
                />
                { boundingBox &&
                <div
                    className="bounding-box"
                    style={ boundingBox }
                ></div> }
            </div> }
        </div>
    );
};

export default ImageRecognitionResult;

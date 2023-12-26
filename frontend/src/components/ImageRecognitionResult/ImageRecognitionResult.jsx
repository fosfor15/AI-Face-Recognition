import './ImageRecognitionResult.css';

const ImageRecognitionResult = ({ imageUrl, boundingBoxes }) => {
    return (
        <div className="image-recognition-result">
            { imageUrl &&
                <div className="relative-container">
                    <img
                        src={ imageUrl }
                        alt="Image recognition result"
                    />

                    { boundingBoxes?.map((boundingBox, i) => {
                        return (<div
                            className="bounding-box"
                            style={ boundingBox }
                            key={ i }
                        ></div>);
                    }) }
                </div>
            }
        </div>
    );
};

export default ImageRecognitionResult;

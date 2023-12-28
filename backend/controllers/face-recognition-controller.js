import https from 'https';

const PAT = process.env.CLARIFAI_PAT;
const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';

const config = {
    method: 'POST',
    hostname: 'api.clarifai.com',
    path: `/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`,
    headers: {
        'Accept': 'application/json',
        'Authorization': `Key ${PAT}`
    }
};


const faceRecognitionController = {
    getFacePrediction(req, res) {
        requestClarify(req.body.imageUrl)
            .then(boundingBoxes => {
                res.status(200).send({ boundingBoxes });
            });
    }
};

function requestClarify(imageUrl) {
    const postBody = JSON.stringify({
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
    });

    return new Promise((resolve, reject) => {
        const req = https.request(config, (res) => {
            res.setEncoding('utf8');

            let rawData = '';

            res.on('data', (chunk) => {
                rawData += chunk;
            });

            res.on('end', () => {
                const data = JSON.parse(rawData);

                const boundingBoxes = data.outputs[0].data.regions.map(region => {
                    const rawBoundingBox = region.region_info.bounding_box;
                    const boundingBox = {};

                    for (const side in rawBoundingBox) {
                        boundingBox[ side.replace(/^(\w+)_\w+$/, '$1') ] =
                            Number(rawBoundingBox[side].toFixed(4));
                    }

                    return boundingBox;
                });

                resolve(boundingBoxes);
            });
        });
        
        req.on('error', (error) => {
            reject(error);
        });
        
        req.write(postBody);
        req.end();
    });
}


export default faceRecognitionController;

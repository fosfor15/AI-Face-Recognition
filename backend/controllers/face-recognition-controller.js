import https from 'https';

// ai-face-recognition-app
const PAT = '990ce28ccc54416c9e15b0be0d4a978a';

const USER_ID = 'clarifai';
const APP_ID = 'main';
const MODEL_ID = 'face-detection';

const config = {
    method: 'POST',
    hostname: 'api.clarifai.com',
    path: `/v2/models/${MODEL_ID}/outputs`,
    headers: {
        'Accept': 'application/json',
        'Authorization': `Key ${PAT}`
    }
};


const faceRecognitionController = {
    getFacePrediction(req, res) {
        requestClarify(req.body.imageUrl)
            .then(rawBoundingBox => {
                res.status(200).send({ rawBoundingBox });
            })
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
            res.on('data', (chunk) => {
                const data = JSON.parse(chunk);
                resolve(data.outputs[0].data.regions[0].region_info.bounding_box);
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

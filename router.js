import { Router } from 'express';
import dbController from './controllers/db-controller.js';
import faceRecognitionController from './controllers/face-recognition-controller.js';

const router = new Router();

router.get('/users', dbController.getUsers);
router.get('/user/:id', dbController.getUser);
router.post('/register', dbController.registerUser);
router.post('/signin', dbController.signinUser);
router.post('/image', faceRecognitionController.getFacePrediction);
router.put('/entries', dbController.incrementEntries);

export default router;

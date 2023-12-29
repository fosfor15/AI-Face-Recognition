import { Router } from 'express';

import authController from './controllers/auth-controller.js';
import dbController from './controllers/db-controller.js';
import faceRecognitionController from './controllers/face-recognition-controller.js';


const router = new Router();

router.post('/register', dbController.registerUser);
router.post('/signin', dbController.signinUser);
router.post('/signout', authController.requireAuth, dbController.signoutUser);
router.get('/user/:id', authController.requireAuth, dbController.getUser);
router.post('/user/:id', authController.requireAuth, dbController.updateUser);
router.post('/image', faceRecognitionController.getFacePrediction);

// router.get('/users', dbController.getUsers);
// router.put('/entries', dbController.incrementEntries);


export default router;

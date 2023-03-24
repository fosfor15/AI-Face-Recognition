import { Router } from 'express';
import dbController from './controllers/db-controller.js';

const router = new Router();

router.get('/users', dbController.getUsers);
router.get('/user/:id', dbController.getUser);
router.post('/register', dbController.registerUser);
router.post('/signin', dbController.signinUser);
router.put('/entries', dbController.incrementEntries);

export default router;

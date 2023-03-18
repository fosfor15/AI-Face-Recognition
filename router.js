import { Router } from 'express';
import dbService from './db-service.js';

const router = new Router();


router.get('/', (req, res) => {
    res.send('We got your GET request');
});

router.get('/users', dbService.getUsers);
router.get('/user/:id', dbService.getUser);
router.post('/register', dbService.registerUser);
router.put('/entries', dbService.incrementEntries);


export default router;

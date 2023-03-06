import express from 'express';
import dbService from './database/db-service.js';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(dbService.getUsers());
});

app.post('/signin', (req, res) => {
    res.status(200).send(
        dbService.getUser(req.body)
    );
});

app.post('/register', (req, res) => {
    dbService.addUser(req.body);
    res.status(200).send(
        dbService.getUser(req.body)
    );
});

app.listen(port, () => {
    console.log('The app is running on port 3000');
});

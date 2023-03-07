import express from 'express';
import dbService from './database/db-service.js';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(dbService.users);
});

app.post('/signin', (req, res) => {
    res.status(200).send(
        dbService.checkUserEmailPassword(req.body)
    );
});

app.post('/register', (req, res) => {
    dbService.addUser(req.body);
    res.status(200).send(
        dbService.getUserByEmail(req.body.email)
    );
});

app.get('/profile/:id', (req, res) => {
    const user = dbService.getUserById(req.params.id);

    if (!user) {
        res.status(404).send('We don\'t have user with specified ID');
    } else {
        res.status(200).send(user);
    }
});

app.post('/entries', (req, res) => {
    const user = dbService.increaseUserEntries(req.body.id);

    if (!user) {
        res.status(404).send('We don\'t have user with specified ID');
    } else {
        res.status(200).send(user);
    }
})

app.listen(port, () => {
    console.log('The app is running on port 3000');
});

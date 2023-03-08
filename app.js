import express from 'express';
import dbService from './database/db-service.js';


const app = express();
const port = 3001;


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', '*');
    next();
});


app.get('/', (req, res) => {
    res.send('We got your GET request');
});

app.get('/users', (req, res) => {
    res.send(dbService.users);
});

app.get('/profile/:id', (req, res) => {
    const user = dbService.getUserById(req.params.id);

    if (!user) {
        res.status(404).send('We don\'t have user with specified ID');
    } else {
        res.status(200).send(user);
    }
});

app.post('/signin', (req, res) => {
    if (dbService.checkUserEmailPassword(req.body)) {
        res.status(200).send({
            isAuth: true,
            user: dbService.getUserByEmail(req.body.email)
        });
    } else {
        res.status(200).send({ isAuth: false });
    }
});

app.post('/register', (req, res) => {
    dbService.addUser(req.body);
    res.status(200).send({
        user: dbService.getUserByEmail(req.body.email)
    });
});

app.put('/entries', (req, res) => {
    console.log('req.body :>> ', req.body);
    const userUpdatedEntries = dbService.increaseUserEntries(req.body.id);

    if (!userUpdatedEntries) {
        res.status(404).send('We don\'t have user with specified ID');
    } else {
        res.status(200).send({
            entries: userUpdatedEntries
        });
    }
})


app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});

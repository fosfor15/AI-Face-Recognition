import express from 'express';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('We get your GET request');
});

app.post('/signin', (req, res) => {
    res.send('We get your POST request');
    console.log(req.body);
});

app.post('/register', (req, res) => {
    res.send('We get your POST request');
    console.log(req.body);
    res.send('Registration is done');
});

app.listen(port, () => {
    console.log('The app is running on port 3000');
});

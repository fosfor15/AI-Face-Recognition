import express from 'express';
import router from './router.js';

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

app.use(router);


app.get('/', (req, res) => {
    res.send('We got your GET request');
});

app.listen(port, () => {
    console.log(`The app is running on port ${port}`);
});

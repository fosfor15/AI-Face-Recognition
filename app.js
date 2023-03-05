import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('The app is working');
});

app.listen(port, () => {
    console.log('The app is running on port 3000');
});

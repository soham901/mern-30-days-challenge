import express from 'express';

import cors from 'cors';


const app = express();


// Middlewares
app.use(cors());


// Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});


// Start server
app.listen(3000, () => {
    console.log('App listening on port 3000');
});
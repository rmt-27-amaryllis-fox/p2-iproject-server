if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const router = require('./routers');

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI;

//-------------------------------------------

app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/', router);

//-------------------------------------------

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});
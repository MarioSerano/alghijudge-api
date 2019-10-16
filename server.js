const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const submitCode = require('./controllers/submitcode');
const checkSubmit = require('./controllers/checksubmit');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// GLOBAL VARIABLES
const app = express();

const PORT = process.env.PORT || 3001;

let submitRecord = {};
// --

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());
// --

// For Debugging only
if (process.env.NODE_ENV !== 'production') {
}
// --

// ROUTING
app.get('/', (req, resp) => {
	resp.send(`
Visit the frontend: <a href="https://alghijudge.herokuapp.com/">https://alghijudge.herokuapp.com/</a><br>
<br>
MIT License<br>
<br>
Copyright (c) 2019 Firdaus Al-Ghifari<br>
<br>
Github: <a href="https://github.com/darklordace/alghijudge-api">https://github.com/darklordace/alghijudge-api</a>
	`);
});

app.post('/submitcode', submitCode.handleSubmitCode(fs, submitRecord));
app.post('/checksubmit', checkSubmit.handleCheckSubmit(submitRecord));
// --

// START SERVER
app.listen(PORT, () => {
	console.log(`app is running on port ${PORT}`);
});
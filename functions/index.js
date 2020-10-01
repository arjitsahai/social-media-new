const functions = require('firebase-functions');

const app = require('express')();

const newAuth = require('./utility/newAuth');

const { getAllScreams, postScream } = require('./handler/screams');
const { signup, login } = require('./handler/users');

//scream routes
app.get('/screams', getAllScreams);
app.post('/screams', newAuth, postScream);

//user routes
app.post('/signup', signup);
app.post('/login', login);

exports.api = functions.region('asia-southeast2').https.onRequest(app);
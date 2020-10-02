const functions = require('firebase-functions');

const app = require('express')();

const newAuth = require('./utility/newAuth');

const { getAllScreams, postScream } = require('./handler/screams');
const { signup, login, addUserDetails } = require('./handler/users');

//scream routes
app.get('/screams', getAllScreams);
app.post('/scream', newAuth, postScream);
app.get('/scream')

//user routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user', newAuth, addUserDetails);

exports.api = functions.region('asia-southeast2').https.onRequest(app);
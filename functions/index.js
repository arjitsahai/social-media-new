const functions = require('firebase-functions');
const app = require('express')();
const newAuth = require('./utility/newAuth');

const cors = require('cors');
app.use(cors());

const { db } = require('./utility/admin');

const {
  getAllScreams,
  postOneScream,
  getScream,
  commentOnScream
} = require('./handler/screams');
const {
  signup,
  login,
  addUserDetails,
  getUserDetails
} = require('./handler/users');

// Scream routes
app.get('/screams', getAllScreams);
app.post('/scream', newAuth, postOneScream);
app.get('/scream/:screamId', getScream);
app.post('/scream/:screamId/comment', newAuth, commentOnScream);

// users routes
app.post('/signup', signup);
app.post('/login', login);
app.post('/user', newAuth, addUserDetails);
app.get('/user/:handle', getUserDetails);

exports.api = functions.region('asia-southeast2').https.onRequest(app);


const { db } = require('../utility/admin');
const firebaseConfig = require('../utility/config');

const firebase = require('firebase');
firebase.initializeApp(firebaseConfig);

const { validateSignup, validateLogin } = require('../utility/validators');

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        name: req.body.name
    };

    const { valid, errors } = validateSignup(newUser);
    if (!valid) return res.status(400).json(errors);


    let token, userId;

    db.doc(`/users/${newUser.name}`).get()
        .then((doc) => {
            if (doc.exists) {
                return res.status(400).json({ email: 'this email is already used!' });
            } else {
                return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
            }
        })
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((idToken) => {
            token = idToken;
            const userCredentials = {
                name: newUser.name,
                email: newUser.email,
                createdAt: new Date().toISOString(),
                userId
            };
            return db.doc(`/user/${newUser.name}`).set(userCredentials);
        })
        .then(() => {
            return res.status(201).json({ token });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/email-already-in-use') {
                return res.status(400).json({ error: 'Email already used!' });
            } else {
                return res.status(500).json({ error: err.code });
            }
        });
}

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const { valid, errors } = validateLogin(user);
    if (!valid) return res.status(400).json(errors);



    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({ token });
        })
        .catch((err) => {
            console.error(err);
            if (err.code === 'auth/wrong-password') {
                return res.status(403).json({ general: 'Wrong password!' })
            } else {
                return res.status(500).json({ error: err.code });
            }
        });
}
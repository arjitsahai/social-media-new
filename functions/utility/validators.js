const isEmpty = (string) => {
    if (string.trim() === '') return true;
    else return false;
};

const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
};

exports.validateSignup = (newUser) => {
    let errors = {};

    if (isEmpty(newUser.email)) {
        errors.email = 'email is required'
    } else if (!isEmail(newUser.email)) {
        error.email = 'Not a valid email'
    }

    if (isEmpty(newUser.password)) errors.password = 'must not be empty';
    if (newUser.password !== newUser.confirmPassword) errors.confirmPassword = 'password do not match';
    if (isEmpty(newUser.name)) errors.name = 'must not be empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}

exports.validateLogin = (user) => {
    let errors = {};

    if (isEmpty(user.email)) errors.email = 'email is empty';
    if (isEmpty(user.password)) errors.password = 'password is empty';

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}
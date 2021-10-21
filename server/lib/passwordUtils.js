const bcrypt = require('bcrypt');

const generatePasswordHash = (password) => {
    return bcrypt.hash(password, 10, (err, hash) => {
        return hash;
    })
};

const isValidPassword = (password, passwordhash) => {
    return bcrypt.compare(password, passwordhash, (err, isValid) => {
        return isValid;
    });
}

module.exports.isValidPassword = isValidPassword;
module.exports.generatePasswordHash = generatePasswordHash;
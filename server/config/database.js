const mongoose = require('mongoose');
const env = require('../env.json');

const connection = mongoose.createConnection(env.DB_STRING, {
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String
   // No need to save salt because bcrypt includes the salt in the hash itself
});

const User = connection.model('User', UserSchema);

module.exports = connection

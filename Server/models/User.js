const { Schema, model } = require('mongoose');

const schema = new Schema({
    userId: String,
    userName: String,
    userEmail: String,
    token: String
});

module.exports = model("user", schema);
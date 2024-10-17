const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    username: String,
    email: String,
    phone: String,
    password: String,
    website: String,
    webLogo: String
});

module.exports = model("admin", adminSchema);
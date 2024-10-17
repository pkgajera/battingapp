const { Schema, model } = require('mongoose');

const SuperAdminSchema = new Schema({
    sAdminEmail: { type: String, required: true},
    sAdminPass: { type: String, required: true },
});

module.exports = new model('SuperAdmin', SuperAdminSchema)
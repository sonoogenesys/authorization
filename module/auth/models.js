const app_db = require('../../config/mongoose')('app');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

const UserSchema = new Schema({
    active: {
        type: Boolean,
        default: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^\w+([\.-]?\w+[\+]?)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/
    },
    name: {
        type: String,
        index: true
    },
    password: {
        type: String
    },
    created_at: {
        type: Date,
        default: moment.utc().toDate()
    },
});
let User = app_db.model('users', UserSchema);

module.exports = User;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// using passport bcs it's easy to encrypt users passwords and login them in ...
const passportLocalMongoose = require('passport-local-mongoose');

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: String,
    gender: String,
    point: Number,
    service: Number,
    joinedAt: Date,
    image: ImageSchema
});

// adding username & password & make sure that username is unique & more functions
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
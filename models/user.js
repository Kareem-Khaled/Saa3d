const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ImageSchema = require('./image').schema;
// using passport bcs it's easy to encrypt users passwords and login them in ...
const passportLocalMongoose = require('passport-local-mongoose');

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
    image: ImageSchema,
    notifications: [
        {
            type: Schema.Types.ObjectId,
            ref: "Notification"
        }
    ]
});

// adding username & password & make sure that username is unique & more functions
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);
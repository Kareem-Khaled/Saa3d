const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    header:String,
    to:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    review: String,
    state:Number
});

module.exports = mongoose.model('Service', serviceSchema);
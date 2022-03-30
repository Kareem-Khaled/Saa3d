const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require('./comment');

const postSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    header: String,
    body: String,
    point: String,
    city: String,
    createdAt: Date,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

postSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Comment.deleteMany({ _id: { $in: doc.comments } })
    }
})

module.exports = mongoose.model('Post', postSchema);
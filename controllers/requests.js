const User = require('../models/user');
const Post = require('../models/post');
const Notification = require('../models/notification');
const Comment = require('../models/comment');

module.exports.acceptOffer = async (req, res) => {
    const {postId, commentId} = req.params;
    const post = await Post.findById(postId);
    const comment = await Comment.findById(commentId);
    const commentAuthor = await User.findById(comment.author);
    const notification = new Notification({
        user: req.user._id,
        date: Date.now(),
        body: `You have been chosen to complete '${post.header}' job`,
        link: `/post/${post._id}`
    });
    commentAuthor.notifications.push(notification);
    await notification.save();
    await commentAuthor.save();
    req.flash('success', `Your jop in procces now`);
    res.redirect(`/post/${postId}`);            
};